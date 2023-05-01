import { Fragment } from "react";
import Footer from "./Footer";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

import { useSelector } from "react-redux";
const Layout = (props) => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <Fragment>
      <MainNavigation />
      <main className={theme === "light" ? classes.main : classes.darkMain}>
        {props.children}
      </main>
      <Footer />
    </Fragment>
  );
};
export default Layout;
