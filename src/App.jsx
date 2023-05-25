import { NavLink,Outlet,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  HomeOutlined,
  BulbOutlined,
  UserOutlined
} from '@ant-design/icons';
import './App.less'

export default function Root() {
    let navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('token')){
        navigate('/login');
      }
    },[])
    return (
      <div className='app'>
        <div className="detail">
            <Outlet />
        </div>
        <nav>
          <ul>
            <NavLink
              className={({isActive}) => isActive?"active":""} 
              to={`affair`}>
              <div>
                  <HomeOutlined />事务
              </div>
            </NavLink>
            <NavLink
              className={({isActive}) => isActive?"active":""} 
              to={`thought`}>
              <div><BulbOutlined />想法</div>
            </NavLink>
            <NavLink
              className={({isActive}) => isActive?"active":""} 
              to={`user`}>
              <div><UserOutlined />生涯</div>
            </NavLink>
          </ul>
        </nav>
      </div>
    );
  }