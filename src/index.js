import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { store } from "store";
import { Provider } from "react-redux";
import { client } from "utils/utils";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "react-toastify/dist/ReactToastify.css";
const stripePromise = loadStripe(
  "pk_test_51BMBBHHnBzjYlOyyd48yLxTv1qYUSUkCkztnbcBjY7lksfc6ajSeDxXul9BtvivH0SJfDJg0JhgVOKDGCu3UXNtv00OmKmJwzE"
);

async function checkLoginAndInitialize() {
  let authUser = null;
  if (localStorage.token) {
    try {
      const res = await client.get("/api/profile");

      const { data, status } = res;
      if (status === 200) {
        authUser = data;
      }
    } catch (error) {}
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
  setTimeout(() => {
    document.querySelector(".loader").classList.remove("show");
  }, 200);
  root.render(
    // <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <BrowserRouter basename="/user">
          <App user={authUser} />
        </BrowserRouter>
      </Elements>
    </Provider>
    // </React.StrictMode>
  );
}

checkLoginAndInitialize();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
