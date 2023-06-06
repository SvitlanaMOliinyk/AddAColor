import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { UserModel } from "../models/userModel.ts";
import colorDrop from "../assets/colorDrop.png";

interface NavbarProps {
  loggedInUser: UserModel | null;
  onLogout: () => void;
}

function Navbar({ loggedInUser, onLogout }: NavbarProps): ReactElement {
  async function logout() {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/logout`, {
        method: "POST",
      });
      onLogout();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <nav className="shadow-navbar">
      <div className="logo-img">
        <img className="logo" src={colorDrop} alt="colorDrop" width="100" />
      </div>
      <div className="navlinks">
        <NavLink className="hover:bg-blue-500 hover:text-white" to="/">
          Home
        </NavLink>
        <NavLink className="hover:bg-blue-500 hover:text-white" to="about">
          About
        </NavLink>
        {loggedInUser ? (
          <>
            <NavLink
              className="hover:bg-blue-500 hover:text-white"
              to="/profile"
            >
              Profile
            </NavLink>
            <NavLink to="/" onClick={logout}>
              Log Out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className="hover:bg-blue-500 hover:text-white"
              to="/register"
            >
              Register
            </NavLink>
            <NavLink className="hover:bg-blue-500 hover:text-white" to="/login">
              Log In
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
