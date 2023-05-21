import { RouterProvider,createBrowserRouter,Link,Outlet } from "react-router-dom";
import App from "./../App";
import Affair from "./../views/affair/affair";
import Thought from "./../views/thought/thought";
import User from "./../views/user/user";
import ErrorPage from "../error-page";
const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "affair",
          element: <Affair />,
        },
        {
          path: "thought",
          element: <Thought />,
        },
        {
          path: "user",
          element: <User />,
        },
      ],
    },
    {
      path: "affair",
      element: <Affair />,
    },
    {
      path: "thought",
      element: <Thought />,
    },
    {
      path: "user",
      element: <User />,
    },
  ]);
export default router;