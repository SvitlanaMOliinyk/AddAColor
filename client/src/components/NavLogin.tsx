import { UserModel } from "../models/userModel.ts";
import { NavLink } from "react-router-dom";

interface NavLoginProps {
    user: UserModel,
    onLogout: () => void,
}

const NavLogin = ({ user, onLogout }: NavLoginProps) => {

    async function logout() {
        try {
            await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/logout`, { method: "POST" });
            onLogout();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
             <NavLink to="/login" onClick={logout}>Log in</NavLink>
           
        </>
    );
}

export default NavLogin;