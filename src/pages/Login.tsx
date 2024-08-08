import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import styles from './Login.module.css';


type FieldType = {
    email?: string;
    password?: string;
    // remember?: boolean;
};

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleLogin = async (values: FieldType) => {
        try {
            console.log("Attempting login with values:", values);
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/v1/auth/signin`,
                {
                    email: values.email,
                    password: values.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.accessToken) {
                console.log(response.data.accessToken)
                localStorage.setItem('access_token', response.data.accessToken);
                localStorage.setItem('refresh_token', response.data.refreshToken);
                message.success('로그인 성공!');
                navigate('/profile');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error("Login failed with response error:", error.response.data);
                } else if (error.request) {
                    console.error("Login failed with request error:", error.request);
                } else {
                    console.error("Login failed with error:", error.message);
                }
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    };




    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.container}>
            <div className={styles.closeBtnContainer}>
                <div className={styles.closeBtn} onClick={handleProfile}>
                    <IoCloseOutline />
                </div>
            </div>
            <div className={styles.loginForm}>
                <div className={styles.logoContainer}>
                    <img src="/logo.png" alt="Logo"/>
                </div>
                <Form
                    name="basic"
                    style={{ maxWidth: 700, width: '90%' }}
                    initialValues={{ remember: true }}
                    onFinish={handleLogin}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className={styles.formItem}>
                        <Form.Item<FieldType>
                            name="email"
                            rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="아이디"
                                className={styles.inputField}
                            />
                        </Form.Item>
                    </div>

                    <div className={styles.formItem}>
                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="비밀번호"
                                className={styles.inputField}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item<FieldType>
                        // name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 0, span: 24 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <div className={styles.submitBtnContainer}>
                            <Button type="primary" htmlType="submit" className={styles.submitBtn}>
                                로그인
                            </Button>
                            <div className={styles.signupLink}>
                                <span>아이디가 없으신가요? </span>
                                <Link to="/signup" className={styles.signupLinkSpan}>회원가입</Link>
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
