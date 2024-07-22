// Signup.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import styles from './Signup.module.css';

type SignupFieldType = {
    username?: string;
    password?: string;
    confirmPassword?: string;
    nickname?: string;
};

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('/profile');
    };

    const onFinish = (values: SignupFieldType) => {
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
            <div className={styles.signupForm}>
                <div className={styles.logoContainer}>
                    <img src="/logo.png" alt="Logo"/>
                </div>
                <Form
                    name="signup"
                    style={{ maxWidth: 600, width: '70%' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className={styles.formItem}>
                        <Form.Item<SignupFieldType>
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
                        <Form.Item<SignupFieldType>
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

                    <div className={styles.formItem}>
                        <Form.Item<SignupFieldType>
                            name="confirmPassword"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: '비밀번호를 다시 입력해주세요.' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="비밀번호 확인"
                                className={styles.inputField}
                            />
                        </Form.Item>
                    </div>

                    <div className={styles.formItem}>
                        <Form.Item<SignupFieldType>
                            name="nickname"
                            rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}
                        >
                            <Input
                                placeholder="닉네임"
                                className={styles.inputField}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <div className={styles.submitBtnContainer}>
                            <Button type="primary" htmlType="submit" className={styles.submitBtn}>
                                회원가입
                            </Button>
                            <div className={styles.loginLink}>
                                <span>이미 계정이 있으신가요? </span>
                                <Link to="/login" className={styles.loginLinkSpan}>로그인</Link>
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
