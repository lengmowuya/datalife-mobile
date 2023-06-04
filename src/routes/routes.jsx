import {createRef} from 'react';
import { RouterProvider, createHashRouter, Link, Outlet,Navigate } from "react-router-dom";
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
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const routes = [
  {path: "/affair",name:'affair',element: <Affair />, nodeRef: createRef()},
  {path: "/thought",name:'thought',element: <Thought />, nodeRef: createRef()},
  {path: "/user",name:'user',element: <User />, nodeRef: createRef()},
  {path: "/completeAffair/:id",name:'completeAffair',element: <CompleteAffair />, nodeRef: createRef()},
  { path: "/editAffair/:id",name:'editAffair', element: <EditAffair />, nodeRef: createRef() },
  {path: "/login",name:'login',element: <Login />, nodeRef: createRef()},
  {path: "/sign",name:'sign',element: <Sign />, nodeRef: createRef()},
  { path: "/newAffair",name:'newAffair', element: <NewAffair /> , nodeRef: createRef()},
  { path: "/manageAffair",name:'manageAffair', element: <ManageAffair />, nodeRef: createRef() },
  {
    path: "",
    element: <Navigate to="affair" replace />
  }
]

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    redirect: '/affair',
    children: routes.map((route) => ({
                index: route.path === '/',
                path: route.path === '/' ? undefined : route.path,
                element: route.element,
              }))
  },

]);



export default router;