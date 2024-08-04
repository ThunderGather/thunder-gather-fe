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

    const onFinish = async (values: FieldType) => {
        try {
            console.log("Attempting login with values:", values); // Log before request
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/v1/auth/signin`,
                {
                    email: values.email,  // Correct mapping to 'email'
                    password: values.password,  // Correct mapping to 'password'
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (response.data.accessToken) {
                localStorage.setItem('access_token', response.data.accessToken);
                message.success('로그인 성공!');
                navigate('/profile');
            }
        } catch (error) {
            console.error("Login failed with error:", error); // Log error
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
                    onFinish={onFinish}
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
