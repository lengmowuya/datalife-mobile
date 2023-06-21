import { NavLink,Outlet,useNavigate,useLocation,useOutlet } from "react-router-dom";
import { useEffect } from "react";
import {
  HomeOutlined,
  BulbOutlined,
  UserOutlined
} from '@ant-design/icons';
import './App.less'
import Tool from './tools/Tools'
import { Button, message, Space } from 'antd';
import  {TransitionGroup, CSSTransition,SwitchTransition}  from 'react-transition-group'
import axios from 'axios';
console.log(Object);
export default function Root() {
    const [messageApi, contextHolder] = message.useMessage();
    let navigate = useNavigate();
    const location = useLocation();
    const currentOutlet = useOutlet();
    useEffect(()=>{
      if(!localStorage.getItem('token')){
        navigate('/login');
      }
    },[])
    useEffect(()=>{
      if(document.body.clientWidth >= 800){
          console.log(document.body.clientWidth);
          window.location.href= Tool.config.normalAddress;
      }
    })

    // 请求拦截器-添加token信息
    axios.interceptors.request.use(function (config) {
      config.headers.token = localStorage.getItem('token');
      return config;
    }, function (error) {
      // axios发生错误的处理
      return Promise.reject(error);
    });
    // 请求响应器-响应token是否正常
    axios.interceptors.response.use(res => {
        if(res.data.error ==  1 && res.data.type == 'tokenError'){
            messageApi.open({
              type: 'error',
              content: "用户Token已过期,请重新登录"
            });
            navigate('/login');
            return Promise.reject(new Error("Error Message"))
        }
        else {
            return Promise.resolve(res)
        }
      },
      err => {
        messageApi.open({
          type: 'error',
          content: "用户Token已过期,请重新登录"
        });
    })
    return (
      <div className='app'>
        <div className="mobileHint">
          完整功能请访问DataLife桌面端
        </div>
        {contextHolder}
        <div className="detail">
            {/* <Outlet /> */}
            <SwitchTransition mode="out-in">
								<CSSTransition key={location.pathname} timeout={200} classNames="layout-main-page">
									{currentOutlet}
								</CSSTransition>
							</SwitchTransition>
        </div>
        {
          (location.pathname != '/login' && location.pathname != '/sign')?<nav>
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
          </nav>:''
        }
      </div>
    );
  }