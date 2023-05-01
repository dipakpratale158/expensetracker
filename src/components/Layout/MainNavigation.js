import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
// import { useContext } from "react";
// import AuthContext from "../../store/AuthContext";
import { authActions } from "../../store/authReducer";
import { useDispatch, useSelector } from "react-redux/es/exports";

const MainNavigation = () => {
  // const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const theme = useSelector((state) => {
    return state.theme.theme;
  });
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  console.log(theme);
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <header className={theme === "light" ? classes.header : classes.darkHeader}>
      <ul>
        {isAuth && <h2>Welcome to expense tracker!</h2>}
        {isAuth && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/home"
            >
              Home
            </NavLink>
          </li>
        )}
        {/* {isAuth && (
          <li>
            Your profile is incomplete
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/home/userDetails"
            >
              <p> </p>complete now
            </NavLink>
          </li>
        )} */}
        {isAuth && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/expenses"
            >
              Expenses
            </NavLink>
          </li>
        )}

        {!isAuth && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/auth"
            >
              Login
            </NavLink>
          </li>
        )}
        {isAuth && (
          <li>
            <button className={classes.button} onClick={logoutHandler}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};
export default MainNavigation;
