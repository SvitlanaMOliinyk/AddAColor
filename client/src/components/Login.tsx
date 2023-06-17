import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserModel } from "../models/userModel.ts";

interface LoginProps {
  onLoginSuccessful: (user: UserModel) => void;
}

interface LoginFormValues {
  userName: string;
  password: string;
}

export const Login = ({ onLoginSuccessful }: LoginProps) => {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState<string>("");
  const onSubmit = async (values: LoginFormValues) => {
    try {
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
      if (response.status === 201) {
        const user = await response.json();
        onLoginSuccessful(user);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        if (response.status === 401) {
          throw new Error("Please, provide correct credentials");
        } else {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
      }
    } catch (error: any) {
      console.error(error);
      setGeneralError(error.message);
    }
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Please enter your name!"),
    password: Yup.string().required("Please enter your password!"),
  });

  const { errors, touched, getFieldProps, handleSubmit } =
    useFormik<LoginFormValues>({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema,
      onSubmit,
    });

  return (
    <main className="content login bg-gradient-to-bl from-gray-100 to-blue-200 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="register-form w-1/2"
        autoComplete="off"
      >
        <h2 className="font-bold ">Sign in to your account</h2>
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
            {touched.userName && errors.userName ? (
              <>{errors.userName}</>
            ) : (
              <> </>
            )}
          </div>
        </div>
        <div className="message-container">
          {generalError ? (
            <div className="message-container">{generalError}</div>
          ) : (
            <> </>
          )}
        </div>
        <button type="submit">Log in</button>
        <div className="register-link">
          <Link to={"/register"}> Register a new account here</Link>
        </div>
      </form>
    </main>
  );
};
