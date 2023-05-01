import classes from "./AuthForm.module.css";
import { useRef, useState } from "react";
// import AuthContext from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authReducer";
const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassWord = passwordInputRef.current.value;
    let enteredConfirmPassword;
    if (!isLogin) {
      enteredConfirmPassword = confirmPasswordInputRef.current.value;
      confirmPasswordInputRef.current.value = "";
      if (enteredConfirmPassword !== enteredPassWord) {
        console.log("passwords do not match");
        throw new Error("passwords do not match");
      }
    }

    setLoading(true);

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxmN7U0TnbCcdz-VjYAe4liAz7oYG6wlQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxmN7U0TnbCcdz-VjYAe4liAz7oYG6wlQ";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassWord,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        // const loginEmail = enteredEmail.replace(/[^a-zA-Z ]/g, "");
        // authCtx.login(data.idToken, loginEmail);
        console.log("in authForm", data.idToken);
        dispatch(
          authActions.login({ token: data.idToken, email: enteredEmail })
        );
        navigate("/home", { replace: true });
        console.log("haha");
      })
      .catch((err) => {
        let errorMessage = "authentication failed";
        console.log(err.message);
        alert(errorMessage);
      });

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  const forgotPasswordHandler = (e) => {
    const enteredEmail = emailInputRef.current.value;
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBxmN7U0TnbCcdz-VjYAe4liAz7oYG6wlQ",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => console.log(data))
      .catch((err) => {
        let errorMessage = "Could not send verification email try again";
        alert(errorMessage);
        throw new Error(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.control}>
          {!isLogin && <label htmlFor="password">Confirm password</label>}

          {!isLogin && (
            <input
              type="password"
              id="confirmPassword"
              ref={confirmPasswordInputRef}
              required
            />
          )}
        </div>
        <div className={classes.actions}>
          {isLogin && (
            <button onClick={forgotPasswordHandler}>Forgot Password</button>
          )}
          <button type="submit">
            {loading ? "loading" : isLogin ? "login" : "Sign up"}
          </button>
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "create new account" : "login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
