import { Button, Checkbox, Form, Input } from 'antd';
import {NavLink,useNavigate} from 'react-router-dom';
// import {useState,useRef} from 'react';
import axios from 'axios';
import './sign.less';
import Config from './../../tools/Config'

// const validatePass = (rule, value, callback) => {
//     if (value == '') {
//       callback(new Error('Please input the password'))
//     } else {
//       if (ruleForm.checkPass !== '') {
//         if (!ruleFormRef.value) return
//         ruleFormRef.value.validateField('checkPass', () => null)
//       }
//       callback()
//     }
//   }
const Sign = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = (data) => {
        // console.log('Success:', data);
        data.passward =  data.password;
        axios.post(Config.getIp()+'/user/sign',data)
            .then(docs=>{
                console.log(docs);
                let data = docs.data;
                if(data.type == 'success'){
                    alert('注册成功,欢迎您!');
                    localStorage.setItem('id',data.id);
                    localStorage.setItem('token',data.token);
                    localStorage.setItem('email',data.user.email);
                    localStorage.setItem('name',data.user.name);
                    localStorage.setItem('headImg',data.user.headImg);
                    navigate('/affair');
                }else if(data.type == 'exist'){
                    alert("注册用户已存在,请登录!");
                    navigate('/login');
                }else{

                    alert("注册错误!请联系DataLife管理员");
                    // console.log(form,form.setFieldsValue);
                    form.setFieldsValue({
                        'email':'',
                        'password':'',
                        'passwordAgain':''
                    });
                }
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div id="Sign">
            <h1>注册为用户</h1>
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
                        message: '邮箱地址不能为空'
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
                        message: '您的密码不能为空'
                    }]}
                >
                    <Input.Password className="passwordInput" />
                </Form.Item>

                <Form.Item
                    className='ItemLine'
                    label="确认密码"
                    name="passwordAgain"
                    rules={[{
                        required: true,
                        message: '密码不能为空',
                        // validator:validatePass
                    },({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('两个密码必须完全一致'));
                        },
                    })]}
                >
                    <Input.Password className="passwordInput" />
                </Form.Item>

                <Form.Item
                    className='ItemLine '
                >
                    <NavLink to="/login">已有账号,去登录→</NavLink> 
                </Form.Item>
                <Button 
                    className="loginButton" 
                    type="primary" htmlType="submit"
                >
                    注册账号
                </Button>
            </Form>
        </div>
    )
};
export default Sign;