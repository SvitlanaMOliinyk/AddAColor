import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { UserModel } from "./models/userModel.ts";

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
      <div className="logo">LOGO</div>
      <div className="navlinks">
        <NavLink to="/">Home</NavLink>
        <NavLink to="about">About</NavLink>
        {loggedInUser ? (
          <>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/" onClick={logout}>
            Log Out
          </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Log In</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
