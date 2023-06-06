import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider,HashRouter,Link,Outlet,BrowserRouter  } from "react-router-dom";
import router from './routes/routes'
import axios from 'axios'
import store from './stores/store'
import './assets/iconfont1.js'
import './assets/iconfont2.js'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
