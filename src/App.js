import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
// import AuthContext from "./store/AuthContext";
import { useSelector } from "react-redux";
import UserDetails from "./pages/UserDetails";
import ExpensePage from "./pages/ExpensePage";
function App() {
  // const authCtx = useContext(AuthContext);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  console.log("in App", isAuth);
  return (
    <Layout>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/auth" />} exact></Route> */}
        {isAuth && <Route path="/home" element={<Home />} />}
        {isAuth && <Route path="/expenses" element={<ExpensePage />} />}
        {!isAuth && <Route path="/auth" element={<AuthPage />} />}
        {isAuth && <Route path="/home/userDetails" element={<UserDetails />} />}
        <Route
          path="*"
          element={<Navigate to={isAuth ? "/home" : "/auth"} />}
        ></Route>
      </Routes>
    </Layout>
  );
}

export default App;
