import { useState } from "react";
import { UserModel } from "../models/userModel.ts";
import { FirstStep } from "../components/FirstStep.tsx";
interface ProfileProps {
  loggedInUser: UserModel | null;
  photo: string;
  resultValue: string;
  hue: string;
  metal: string;
  chroma: string;
  onValuesUpdated: (
    updatedPhoto: string,
    updatedHue: string,
    updatedMetal: string,
    updatedResultValue: string,
    updatedChroma: string
  ) => void;
}

export const Profile = ({
  loggedInUser,
  hue,
  metal,
  resultValue,
  chroma,
  onValuesUpdated,
}: ProfileProps) => {
  const [photo, setPhoto] = useState<string | null>(null);
  async function handleClick() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/user/photo/${loggedInUser?._id}`,
        { method: "GET" }
      );
      const userPhoto = await response.json();
      console.log("userPhoto:", userPhoto);
      setPhoto(userPhoto.userPicture);
      onValuesUpdated(userPhoto.userPicture, hue, metal, resultValue, chroma);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {loggedInUser ? (
        <main className="content profile">
          <h2>Hello {loggedInUser.userName}</h2>
          {photo ? (
            <>
              <FirstStep
                photo={photo}
                onValuesUpdated={onValuesUpdated}
                resultValue={""}
                hue={""}
                metal={""}
                chroma={""}
              />
            </>
          ) : (
            <>
              <h3>Let's start checking your color palette</h3>
              <button onClick={handleClick}>Start examination</button>
            </>
          )}
        </main>
      ) : (
        <div>Log in please</div>
      )}
    </>
  );
};
