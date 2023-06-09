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
      setPhoto(userPhoto.userPicture);
      onValuesUpdated(userPhoto.userPicture, hue, metal, resultValue, chroma);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {loggedInUser ? (
        <main className="content profile flex flex-col justify-center">
          <h2 className="font-bold tracking-wide text-xl text-center">
            Hello {loggedInUser.userName}
          </h2>
          {photo ? (
            <div className="self-center">
              <FirstStep
                photo={photo}
                onValuesUpdated={onValuesUpdated}
                resultValue={""}
                hue={""}
                metal={""}
                chroma={""}
              />
            </div>
          ) : (
            <>
              <h3 className="mt-12 text-xl">Let's start checking your color palette</h3>
              <button className="mt-8" onClick={handleClick}>
                Start examination
              </button>
            </>
          )}
        </main>
      ) : (
        <div className="mt-12 text-xl font-bold text-center">Log in please</div>
      )}
    </>
  );
};
