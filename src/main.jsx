import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider,createBrowserRouter,Link,Outlet,BrowserRouter  } from "react-router-dom";
import router from './routes/routes'
import './assets/aliFont.js'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
