import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./AuthScreens/Login";
import PasswordRecovery from "./AuthScreens/PasswordRecovery";
import AuthLayout from "./Layout/AuthLayout";

import { useEffect, useRef, useState } from "react";
import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/Users";

import "app-assets/css/app.css";
import "app-assets/css/plugins/menu/vertical-menu.css";
import "assets/fonts/stylesheet.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "assets/css/style.css";
import "assets/css/style-user.css";

import Packages from "./Pages/Packages/Packages";
import Orders from "./Pages/Orders/Orders";
import PaymentLog from "./Pages/PaymentLog/PaymentLog";
import ContactAdmin from "./Pages/ContactAdmin/ContactAdmin";
import Register from "./AuthScreens/Register";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setLoginDetails } from "features/auth/authSlice";
import UserProfile from "./Pages/Users/UserProfile";
import ChangePassword from "./Pages/Users/ChangePassword";


import ViewFeedBack from "./Pages/ContactAdmin/ViewFeedBack";
import OrderDetail from "./Pages/Orders/Detail/OrderDetail";
import PostListing from "./Pages/Posts/PostListing";
import AddPost from "./Pages/Posts/AddPost";
import EditPost from "./Pages/Posts/EditPost";
import Notificaiton from "./Pages/Notification/Notification";
import SubscribedPackages from "./Pages/Packages/SubscribedPackages";
import EditUserProfile from "./Pages/Users/EditUserProfile";
import FormListing from "./Pages/Forms/FormListing";
import Form from "./Pages/Forms/Form";
import ViewForm from "./Pages/Forms/ViewForm";
import EditPackage from "./Pages/Packages/EditPackage";

function App({ user }) {
  const [isloggedIn, setIsloggedIn] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let authUser = useRef();
  useEffect(() => {
    authUser.current = user;
  }, [user]);
  useEffect(() => {
    if (authUser.current !== null) {
      setIsloggedIn(true);
      if (auth.user === null) {
        dispatch(setLoginDetails(authUser.current));
        authUser.current = null;
      }
    } else if (authUser.current === null && auth.user !== null) {
      setIsloggedIn(true);
    } else {
      setIsloggedIn(false);
    }
  }, [auth.user, authUser, dispatch]);

  // const auth = useSelector((state) => state.auth);

  // console.log(auth);
  return (
    <>
      <ToastContainer />

      {isloggedIn !== null ? (
        <Routes basename="/user">
          <Route
            path="/"
            element={!isloggedIn ? <AuthLayout /> : <MainLayout />}
          >
            <Route
              index
              element={!isloggedIn ? <Login /> : <Dashboard />}
            ></Route>
            {/* AuthLayout Screens */}
            <Route
              path="/password-recovery"
              element={!isloggedIn ? <PasswordRecovery /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!isloggedIn ? <Register /> : <Navigate to="/" />}
            />
            {/* AuthLayout Screens End */}
            {/* MainLayout Screens */}
            <Route
              path="/users"
              element={!isloggedIn ? <Navigate to="/" /> : <Users />}
            />
            <Route
              path="/packages"
              element={!isloggedIn ? <Navigate to="/" /> : <Packages />}
            />
             <Route
              path="/EditPackage/:id"
              element={!isloggedIn ? <Navigate to="/" /> : <EditPackage />}
            />
            <Route
              path="/orders"
              element={!isloggedIn ? <Navigate to="/" /> : <Orders />}
            />
            <Route
              path="/order/:id"
              element={!isloggedIn ? <Navigate to="/" /> : <OrderDetail />}
            />
            <Route
              path="/payment-log"
              element={!isloggedIn ? <Navigate to="/" /> : <PaymentLog />}
            />
            <Route
              path="/customer-feedback"
              element={!isloggedIn ? <Navigate to="/" /> : <ContactAdmin />}
            />
            <Route
              path="/profile"
              element={!isloggedIn ? <Navigate to="/" /> : <UserProfile />}
            />
            <Route
              path="/feedback/:id?"
              element={!isloggedIn ? <Navigate to="/" /> : <ViewFeedBack />}
            />
            <Route
              path="/ChangePassword"
              element={!isloggedIn ? <Navigate to="/" /> : <ChangePassword />}
            />
            
            <Route
              path="/posts/:id?"
              element={!isloggedIn ? <Navigate to="/" /> : <PostListing />}
            />
            <Route
              path="/posts/:OrderId?"
              element={!isloggedIn ? <Navigate to="/" /> : <PostListing />}
            />
            <Route
              path={"/post/add/:OrderId?"}
              element={!isloggedIn ? <Navigate to="/" /> : <AddPost />}
            />
            <Route
              path={"/post/edit/:OrderId?/:PostId?"}
              element={!isloggedIn ? <Navigate to="/" /> : <EditPost />}
            />
            <Route
              path={"/notifications"}
              element={!isloggedIn ? <Navigate to="/" /> : <Notificaiton />}
            />
            <Route
              path={"/subscribed-packages"}
              element={
                !isloggedIn ? <Navigate to="/" /> : <SubscribedPackages />
              }
            />
            <Route
              path={"/user/:id?"}
              element={!isloggedIn ? <Navigate to="/" /> : <EditUserProfile />}
            />
            <Route
              path={"/forms"}
              element={!isloggedIn ? <Navigate to="/" /> : <FormListing />}
            />
            <Route
              path={"/form/:OrderId?"}
              element={!isloggedIn ? <Navigate to="/" /> : <Form />}
            />
            <Route
              path={"/view/form/:OrderId?"}
              element={!isloggedIn ? <Navigate to="/" /> : <ViewForm />}
            />
            {/* MainLayout Screens */}
          </Route>
        </Routes>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default App;
