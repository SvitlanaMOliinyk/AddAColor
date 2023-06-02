import { UserModel } from "../components/models/userModel.ts";
interface ProfileProps {
  loggedInUser: UserModel | null;
}

export const Profile = ({ loggedInUser }: ProfileProps) => {
  return (
    <>
      {loggedInUser ? (
        <div>Hello {loggedInUser.username}</div>
      ) : (
        <div>Log in please</div>
      )}
    </>
  );
};
