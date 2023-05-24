import { RouterProvider, createBrowserRouter, Link, Outlet } from "react-router-dom";
import App from "./../App";
import Affair from "./../views/affair/affair";
import Thought from "./../views/thought/thought";
import User from "./../views/user/user";
import Login from "./../views/login/login";
import Sign from "./../views/sign/sign";
import CompleteAffair from "./../views/completeAffair/completeAffair";
import ErrorPage from "../error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    redirect: '/affair',
    children: [
      { path: "/affair", element: <Affair /> },
      { path: "/thought", element: <Thought /> },
      { path: "/user", element: <User /> },
      { path: "/completeAffair/:id", element: <CompleteAffair /> },
    ],
  },
  {path: "/affair",element: <Affair />},
  {path: "/thought",element: <Thought />},
  {path: "/user",element: <User />},
  {path: "/completeAffair/:id",element: <CompleteAffair />},
  {path: "/login",element: <Login />},
  {path: "/sign",element: <Sign />},
]);

export default router;