import { useState, useEffect, ChangeEvent, } from "react";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../models/userModel.ts";

interface HomeProps{
  loggedInUser:  UserModel | null;
}

function Home({loggedInUser}: HomeProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);
  const navigate = useNavigate();

const handleConvertToBase64 = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("File event:", event);
    const file: File = (event.target.files as FileList)[0];
    // const file = event.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result
        if (result && !isCancel) {
          console.log("Result after FileReader:", result);
          setImageUrl(result);
        }
      };
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [image]);

  useEffect(() => {
    if(imageUrl && loggedInUser){
    fetch(`${import.meta.env.VITE_BASE_URL}/api/user/update`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ userPicture: imageUrl, userName: loggedInUser.userName }),
    }).then((response) => console.log("Your picture is added:", response));
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  }
  }, [imageUrl])

  return (
    <main className="home content">
      <div className="upload-photo">
    <h1>Upload your photo</h1>
    <h3>Tips: for getting the most precise result provide photo:</h3>
    <ul>
      <li>on neutral background</li>
      <li>without make-up</li>
      <li>remove the hair from the face</li>
    </ul>
    <input
              accept="image/*"
              type="file"
              id="fileInput"
              // style={{ display: "none" }}
              onChange={handleConvertToBase64}
            />
    {/* <button className="home-page-button">Upload</button> */}
    </div>
    </main>
  )
}
export default Home