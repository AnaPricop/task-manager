// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Bootstrap CSS & JS imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import LogIn from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Homepage";
import Dashboard from "./components/dashboard/Dashboard";
import HomeLogin from "./components/dashboard/Home";
import BoardWrapper from "./components/boards/BoardWrapper";
// Routes
const user = localStorage.getItem("token");
console.log(user)
var hours = 1; // to clear the localStorage after 1 hour
               // (if someone want to clear after 8hrs simply change hours=8)
var now = new Date().getTime();
var setupTime = localStorage.getItem('setupTime');
if (setupTime == null) {
    localStorage.setItem('setupTime', now)
} else {
    if(now-setupTime > hours*60*60*1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now);
        //window.location.reload();
    }
}

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/dashboard", element: user ? <Dashboard /> : <Home />},
    { path: "/home", element: user ? <HomeLogin /> : <Home /> },
    { path: "/proj/:projectId", element: user ? <BoardWrapper /> : <Home /> },
    // { path: "/", element: user ? <ShowProjects /> :  <LogIn /> },
    // { path: "/", element: user ? <ShowProjects /> :  <LogIn /> },
    // { path: "/create-book", element: <CreateBook /> },
    // { path: "/show-book/:id", element: <ShowBookDetails /> },
    // { path: "/edit-book/:id", element: <UpdateBookInfo /> },
    { path: "/login", element: <LogIn /> },
    { path: "/signup", element: <SignUp /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
        <RouterProvider router={router} />
    // </React.StrictMode>
);