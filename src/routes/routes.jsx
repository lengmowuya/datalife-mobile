import { RouterProvider, createBrowserRouter, Link, Outlet } from "react-router-dom";
import App from "./../App";
import Affair from "./../views/affair/affair";
import Thought from "./../views/thought/thought";
import User from "./../views/user/user";
import Login from "./../views/login/login";
import Sign from "./../views/sign/sign";
import NewAffair from "./../views/newAffair/newAffair";
import ManageAffair from "./../views/manageAffair/manageAffair";
import CompleteAffair from "./../views/completeAffair/completeAffair";
import EditAffair from "./../views/editAffair/editAffair";
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
      { path: "/editAffair/:id", element: <EditAffair /> },
      { path: "/newAffair", element: <NewAffair /> },
      { path: "/manageAffair", element: <ManageAffair /> },
    ],
  },
  {path: "/affair",element: <Affair />},
  {path: "/thought",element: <Thought />},
  {path: "/user",element: <User />},
  {path: "/completeAffair/:id",element: <CompleteAffair />},
  { path: "/editAffair/:id", element: <EditAffair /> },
  {path: "/login",element: <Login />},
  {path: "/sign",element: <Sign />},
  { path: "/newAffair", element: <NewAffair /> },
  { path: "/manageAffair", element: <ManageAffair /> }
]);

export default router;