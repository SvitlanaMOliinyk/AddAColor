import { useState } from "react";
import { UserModel } from "../models/userModel.ts";
import { FirstStep } from "../components/FirstStep.tsx";
interface ProfileProps {
  loggedInUser: UserModel | null;
}

export const Profile = ({ loggedInUser }: ProfileProps) => {
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
              <FirstStep photo={photo} />
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
