import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../models/userModel.ts";
import pearls from "../assets/pearls.jpeg"

interface HomeProps {
  loggedInUser: UserModel | null;
}

function Home({ loggedInUser }: HomeProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);
  const navigate = useNavigate();

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const uploadFile = () => {
    hiddenFileInput.current?.click();
  };
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
        const result = event.target?.result;
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
    if (imageUrl && loggedInUser) {
      fetch(`${import.meta.env.VITE_BASE_URL}/api/user/update`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userPicture: imageUrl,
          userName: loggedInUser.userName,
        }),
      }).then((response) => console.log("Your picture is added:", response));
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    }
  }, [imageUrl]);

  return (
    <main className="home content" >
      <div className="upload-photo ">
        <h1 className="text-3xl font-bold text-blue-600">Upload your photo</h1>
        <p>To ensure you get the most accurate results from your photo, here are a few tips to keep in mind:</p>
        <ul className="list-disc leading-7 list-inside">
          <li><span className="text-blue-500 font-bold">Choose a Neutral Background:</span> Opt for a simple and non-distracting background, such as a plain wall or backdrop. This helps direct the focus solely on you, enabling more precise analysis.</li>
          <li><span className="text-blue-500 font-bold">Embrace Your Natural Look:</span> Consider going for a photo with minimal or no makeup. By showcasing your natural features, you provide a more authentic representation of yourself, leading to a more accurate analysis.</li>
          <li><span className="text-blue-500 font-bold">Clear Your Face of Hair:</span> Pull your hair back or away from your face to reveal your facial features clearly. This allows for a better assessment of your forehead, eyes, and cheeks, which are essential for accurate analysis.</li>
        </ul>
        <p>By following these tips, you'll be well on your way to obtaining the best possible results from your photo analysis. Capture that amazing picture and let the analysis work its magic!</p>
        <button onClick={uploadFile}>Upload photo</button>
        <input
          accept="image/*"
          type="file"
          id="fileInput"
          ref={hiddenFileInput}
          onChange={handleConvertToBase64}
          style={{ display: "none" }}
        />
      </div>
    </main>
  );
}
export default Home;
