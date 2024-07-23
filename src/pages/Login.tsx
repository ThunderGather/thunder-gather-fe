import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './Login.module.css';

type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean;
};

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('/profile');
    };

    const onFinish = (values: FieldType) => {
        console.log('Success:', values);
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
                            name="username"
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
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 0, span: 24 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
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
                    </Form.Item>

                </Form>

            </div>
        </div>
    );
};

export default Login;
