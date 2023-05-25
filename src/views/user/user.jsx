import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    ExportOutlined,
    SettingOutlined
} from '@ant-design/icons';
import './user.less'

const User = ()=>{
    let navigate = useNavigate();
    let headImg = localStorage.getItem('headImg');
    let name = localStorage.getItem('name');
    let email = localStorage.getItem('email');
    const loginOut = ()=>{
        localStorage.setItem('token','');
        localStorage.setItem('id','');
        navigate('/login');
    }
    // render() {
        // let {headImg,name,email} = this.state;
    return (
        <div id='User'>
            <div className="userInfo">
                <img className='headImg' src={headImg} alt="" />
                <div className="infoDescribe">
                    <h1 className='name'>{name}</h1>
                    <p className='email'>{email}</p>
                </div>
            </div>
            <div className="menu">
                <div className="itemLine setting">
                    <SettingOutlined />设置
                </div>
                <div className="itemLine loginOut" onClick={loginOut.bind(this)}>
                    <ExportOutlined />登出
                </div>
            </div>
        </div>
    )
    // }
}

export default User