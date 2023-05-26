import { useRouteError } from "react-router-dom";
import { NavLink,Outlet,useNavigate } from "react-router-dom";
import {Button} from 'antd'

export default function ErrorPage() {
  const error = useRouteError();
  let navigate = useNavigate();
  console.error(error);

  return (
    <div id="error-page" style={{padding:'20px'}}>
      <h1>404,糟糕!</h1>
      <p>抱歉,DataLife找不到指定页面!</p>
      <p style={{marginBottom:'20px'}}>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button type="primary" onClick={()=>{navigate('/affair')}}>回首页</Button>
    </div>
  );
}