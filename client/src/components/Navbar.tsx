import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

type NavbarProps = { title: string };

function Navbar({ title }: NavbarProps): ReactElement {
  return (
    <nav className="shadow-navbar">
      <div className="logo">{title}</div>
<div className="navlinks">
      <NavLink to="/">Home</NavLink>
      <NavLink to="about">About</NavLink>
      <NavLink to="register">Register</NavLink>
      <NavLink to="login">Log in</NavLink>
      </div>
    </nav>
  );
}
export default Navbar;
