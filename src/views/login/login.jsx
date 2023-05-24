import { Button, Checkbox, Form, Input } from 'antd';
import {NavLink,useNavigate} from 'react-router-dom';
// import {useState,useRef} from 'react';
import axios from 'axios';
import './login.less';


const loginUser = ()=>{
    // console.log(email,password);
}

// let email = '',password = '';
const Login = () => {
    // let [email,setEmail] = useState('xxx');
    // let [password,setPassword] = useState('xxx');
    let navigate = useNavigate();
    const [form] = Form.useForm();
    // const form = useRef('');
    // console.log(email);
    const onFinish = (data) => {
        console.log('Success:', data);
        data.passward =  data.password;
        axios.post('http://192.168.1.9:3000/user/login',data)
            .then(docs=>{
                console.log(docs);
                let data = docs.data;
                if(data.type == 'success'){
                    localStorage.setItem('id',data.id);
                    localStorage.setItem('token',data.token);
                    navigate('/affair');
                }else{
                    alert("登录失败,请检查账密后重试");
                    console.log(form,form.setFieldsValue);
                    form.setFieldsValue({
                        'email':'',
                        'password':''
                    });
                }
                // else if(data.type == 'error'){
                //     alert("登录错误,请联系DataLife管理员!");

            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div id="Login">
            <h1>DataLife</h1>
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
                {/* <Form.Item
                    className='ItemLine'
                    name="remember"
                    valuePropName="checked"
                > */}
                    {/* <Checkbox className='RememberMeBox'>记住我的账密</Checkbox> */}
                {/* </Form.Item> */}

                {/* <Form.Item  */}
                    <Button 
                        className="loginButton" 
                        type="primary" htmlType="submit"
                        onClick={loginUser.bind(this)}
                    >
                        登录
                    </Button>
                {/* </Form.Item> */}
            </Form>
        </div>
    )
};
export default Login;