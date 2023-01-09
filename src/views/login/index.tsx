import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import './login.less';
import { getCaptcha } from '@/api/login/login';
import { login } from '@/api/login/login';
import { SET_TOKEN_INFO } from '@/store/modules/globalSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignIn, setIsSignin] = useState<boolean>(false);
  const [captchaSrc, setCaptcha] = useState<string>(
    'http://120.78.158.201:1000/micro-auth/captcha?key=123',
  );
  const getCaptcha_ = () => {
    getCaptcha().then(res => {
      console.log(res.data);
      let info = res.data;
      let blob = new Blob([info]);
      setCaptcha(window.URL.createObjectURL(blob));
    });
  };

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const { username, password, captcha } = values;
    try {
      const resp = await login({
        username,
        password,
        code: captcha,
        grant_type: 'password',
      });
      const { access_token: token, refresh_token } = resp.data;
      dispatch(SET_TOKEN_INFO({ token, refresh_token }));
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='zama-form'>
      <h2>CELADON-ADMIN</h2>
      <div
        className={`container ${!isSignIn ? 'right-panel-active' : ''}`}
        id='container'
      >
        <div className='form-container sign-up-container'>
          <Form
            name='basic'
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete='off'
            onFinish={onFinish}
          >
            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <h1>Sigh in</h1>
            </Form.Item>
            <Form.Item
              name='username'
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input placeholder='username' />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder='password' />
            </Form.Item>
            <div className='captcha-container'>
              <Form.Item
                name='captcha'
                rules={[{ required: true, message: 'Please input captcha!' }]}
              >
                <Input className='captcha-input' placeholder='captcha' />
              </Form.Item>
              <img src={captchaSrc} onClick={getCaptcha_} />
            </div>

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Button type='primary' htmlType='submit'>
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='form-container sign-in-container'>
          <Form
            name='basic'
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete='off'
          >
            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <h1>Create Account</h1>
            </Form.Item>
            <Form.Item
              name='email'
              rules={[{ required: true, message: 'Please input your email !' }]}
            >
              <Input type='email' placeholder='email' />
            </Form.Item>
            <Form.Item
              name='username'
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input placeholder='username' />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder='password' />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Button type='primary' htmlType='submit'>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <Button ghost type='default' onClick={e => setIsSignin(true)}>
                Sign Up
              </Button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <Button ghost type='default' onClick={e => setIsSignin(false)}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
