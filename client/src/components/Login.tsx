import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserModel } from "./models/userModel.ts";

interface LoginProps {
  onLoginSuccessful: (user: UserModel) => void;
}

export const Login = ({ onLoginSuccessful }: LoginProps) => {
  const navigate = useNavigate();
  const onSubmit = async () => {
    const { userName, password } = values;
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/user/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      }
    );
    const user = await response.json();
    console.log("User after log in:", user)
    onLoginSuccessful(user);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Please enter your name!"),
    password: Yup.string().required("Please enter your password!"),
  });

  const { values, errors, touched, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <main className="content login">
      <form
        onSubmit={handleSubmit}
        className="register-form"
        autoComplete="off"
      >
        <div className="register-field">
          <input
            type="text"
            {...getFieldProps("userName")}
            placeholder="User Name"
            className="login-input"
          ></input>

          <div className="message-container">
            {touched.userName && errors.userName ? (
              <>{errors.userName}</>
            ) : (
              <> </>
            )}
          </div>
        </div>
        <div className="register-field">
          <input
            type="password"
            {...getFieldProps("password")}
            placeholder="Password"
            className="login-input"
          ></input>

          <div className="message-container">
            {touched.password && errors.password ? (
              <>{errors.password}</>
            ) : (
              <> </>
            )}
          </div>
        </div>
        <button type="submit">Log in</button>
        <div className="register-link">
          <Link to={"/register"}> Register a new account here</Link>
        </div>
      </form>
    </main>
  );
};
