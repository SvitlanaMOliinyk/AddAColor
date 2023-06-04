import { UserModel } from "../models/userModel.ts";
interface logoutProps {
    loggedInUser: UserModel | null
    onLogout: () => void;
  }
export async function logout({onLogout}: logoutProps) {
        try {
            await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/logout`, { method: "POST" });
            onLogout();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
