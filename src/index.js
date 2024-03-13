import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import LogIn from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Homepage";
import Dashboard from "./components/dashboard/Dashboard";
import HomeLogin from "./components/dashboard/Home";
import BoardWrapper from "./components/boards/BoardWrapper";
import Board from "./components/boards/Board";
// Routes
const user = localStorage.getItem("token");
console.log(user)
var hours = 1; // to clear the localStorage after 1 hour

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
    { path: "/:projectId/:boardId", element: user ? <BoardWrapper /> : <Home /> },
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