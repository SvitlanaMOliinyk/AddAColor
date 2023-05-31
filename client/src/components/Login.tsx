import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Login = () => {
  const navigate = useNavigate();
  const onSubmit = () => {
      const { userName, password } = values;
        fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      setTimeout(() => {
          navigate("/");
        }, 2000);
}

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
      <form onSubmit={handleSubmit} className="register-form" autoComplete="off">
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
                  type="text"
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
  )
}