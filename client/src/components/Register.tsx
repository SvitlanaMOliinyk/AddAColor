import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserModel } from "../models/userModel.ts";

interface RegisterProps {
  onRegisterSuccessful: (user: UserModel) => void;
}

export const Register = ({ onRegisterSuccessful }: RegisterProps) => {
  const navigate = useNavigate();
  const onSubmit = async () => {
    const { userName, email, password } = values;
    console.log("Url:", `${import.meta.env.VITE_BASE_URL}/api/user`);
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userName, email, password }),
    });
    const newUser = await response.json();
    onRegisterSuccessful(newUser);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Please enter your name!"),
    email: Yup.string()
      .email("Please enter a valid email!")
      .required("Please enter your email!"),
    password: Yup.string()
      .required("Please enter your password!")
      .min(4, "Your password have to be more than 4 character")
      .matches(/[a-z]+/, "At least 1 lowercase")
      .matches(/[A-Z]+/, "At least 1 uppercase")
      .matches(/[+-/.,!'^@%&€$£#]+/, "At least 1 special character")
      .matches(/\d+/, "At least 1 number"),
    confirmPassword: Yup.string()
      .required("Please re-enter in password field")
      .oneOf([Yup.ref("password")], "Password fields don't match"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema,
      onSubmit,
    });

  return (
    <main className="content register">
      <form
        onSubmit={handleSubmit}
        className="register-form"
        autoComplete="off"
      >
        <label htmlFor="userName">User Name</label>
        <div className="register-field">
          <input
            id="userName"
            name="userName"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
          />
          <div className="message-container">
            {touched.userName && errors.userName ? (
              <>{errors.userName}</>
            ) : (
              <> </>
            )}
          </div>
        </div>

        <label htmlFor="email">Email Address</label>
        <div className="register-field">
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <div className="message-container">
            {touched.email && errors.email ? <>{errors.email}</> : <> </>}
          </div>
        </div>

        <label htmlFor="password">Password</label>
        <div className="register-field">
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <div className="message-container">
            {touched.password && errors.password ? (
              <>{errors.password}</>
            ) : (
              <> </>
            )}
          </div>
        </div>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="register-field">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
          />
          <div className="message-container">
            {touched.confirmPassword && errors.confirmPassword ? (
              <>{errors.confirmPassword}</>
            ) : (
              <> </>
            )}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};
