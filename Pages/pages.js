import React from "react"
import DefaultLayout from "../Layouts/Default";
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import Blog from "./Blog";

export default [
  {
    path: "/blog",
    component: Blog,
    layout: DefaultLayout,
  },
  {
    path: "/login",
    component: Login,
    layout: DefaultLayout,
  },
  {
    path: "/about",
    component: About,
    layout: DefaultLayout,
  },
  {
    path: "/users",
    private: true,
    component: () => <h1>Users</h1>,
    layout: DefaultLayout,
  },
  {
    path: "/",
    component: Home,
    layout: DefaultLayout,
  },
];
