import { Button, Checkbox, Form, Input } from 'antd';
import {NavLink,useNavigate} from 'react-router-dom';
// import {useState,useRef} from 'react';
import axios from 'axios';
import './login.less';
import Config from './../../tools/Config'
import imgUrl from './../../assets/DataLife.png';

const Login = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = (data) => {
        data.passward =  data.password;
        axios.post(Config.getIp()+'/user/login',data)
            .then(docs=>{
                // console.log(docs);
                let data = docs.data;
                if(data.type == 'success'){
                    localStorage.setItem('id',data.id);
                    localStorage.setItem('token',data.token);
                    localStorage.setItem('email',data.user.email);
                    localStorage.setItem('name',data.user.name);
                    localStorage.setItem('headImg',data.user.headImg);
                    navigate('/affair');
                }else{
                    alert("登录失败,请检查账密后重试");
                    form.setFieldsValue({
                        'email':'',
                        'password':''
                    });
                }
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div id="Login">
            <div className="header">
                <img src={imgUrl} alt="" />
                <h1>DataLife</h1>
            </div>
            <Form
                form={form}
                // ref={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    className='ItemLine'
                    label="邮箱地址"
                    name="email"
                    rules={[{
                        required: true,
                        message: '请输出您的邮箱地址'
                    }]}
                >
                    <Input className="emailInput" />
                </Form.Item>

                <Form.Item
                    className='ItemLine'
                    label="密码"
                    name="password"
                    rules={[{
                        required: true,
                        message: '请输入您的密码'
                    }]}
                >
                    <Input.Password className="passwordInput" />
                </Form.Item>

                <Form.Item
                    className='ItemLine '
                >
                    <NavLink to="/sign">没有账号,去注册</NavLink> 
                </Form.Item>

                <Button 
                    className="loginButton" 
                    type="primary" htmlType="submit"
                    // onClick={loginUser.bind(this)}
                >
                    登录
                </Button>
            </Form>
        </div>
    )
};
export default Login;