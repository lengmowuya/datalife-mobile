import { Button, Checkbox, Form, Input,message  } from 'antd';
import {NavLink,useNavigate} from 'react-router-dom';
import {useState,useRef} from 'react';
import axios from 'axios';
import './sign.less';
import Config from './../../tools/Config'

const Sign = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const [sendCode,setSendCode] = useState(false);
    const [sendCodeButtonText,setSendCodeButtonText] = useState('获取验证码');
    const [messageApi, contextHolder] = message.useMessage();
    let emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
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
                        'emailCode':'',
                        'passwordAgain':''
                    });
                }
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const sendEmailCode = ()=>{
        // this.Work.User.sendEmailCode(this.SignBlock.email);
        const {email} = form.getFieldsValue(true);
        if(email == undefined || email.trim() == '' || !emailReg.test(email)){
            messageApi.open({
                type: 'warning',
                content: '请输入有效的邮箱地址',
              });
            return;
        }

        console.log(email);
        setSendCode(true);
        axios.post(Config.getIp()+'/user/sign/sendEmailCode',{email})
            .then(docs=>{
                messageApi.info('验证码邮件已发送至您的邮箱，请注意查收。');
            })
        let time = 0;
        let interval = setInterval(()=>{
            setSendCodeButtonText(30 - time +'秒后重新获取');
            time++;
            if(time >= 30){
                clearInterval(interval);
                setSendCode(false);
                setSendCodeButtonText('获取验证码');
            }
        },1000)
    }
    return (
        <div id="Sign">
            {contextHolder}
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
                    },({ getFieldValue }) => ({
                        validator(_, value) {
                            let myReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                          if (myReg.test(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('请输入有效的邮箱地址'));
                        },
                    })]}
                >
                    <Input className="emailInput" />
                </Form.Item>

                <Form.Item
                    className='ItemLine'
                    label="邮箱验证码"
                    name="emailCode"
                    rules={[{
                        required: true,
                        message: '请输入邮箱验证码'
                    }]}
                >
                    <Input className="emailCodeInput" />
                </Form.Item>
                <Button disabled={sendCode} type="primary" onClick={sendEmailCode.bind()}>{sendCodeButtonText}</Button>

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