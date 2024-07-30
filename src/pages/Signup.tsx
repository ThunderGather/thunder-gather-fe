import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { LockOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, Image, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import axios from 'axios';

import styles from './Signup.module.css';
import { RcFile } from "antd/es/upload";

type SignupFieldType = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    nickname?: string;
};

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [profileImg, setProfileImg] = useState<UploadFile | null>(null);

    const handleProfile = () => {
        navigate('/profile');
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setProfileImg(newFileList.length > 0 ? newFileList[0] : null);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const onFinish = async (values: SignupFieldType) => {
        try {
            const formData = new FormData();
            if (profileImg && profileImg.originFileObj) {
                formData.append('file', profileImg.originFileObj);
            }

            const data = {
                email: values.email,
                password: values.password,
                nickname: values.nickname,
                profileImageUrl: profileImg ? profileImg.name : ''
            };

            formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
            // formData.append('data', JSON.stringify(data));

            console.log(data)

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signUp`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                message.success('회원가입 성공!');
                navigate('/login');
            }
        } catch (error) {
            message.error('회원가입 실패. 다시 시도해주세요.');
            console.error('Failed:', error);
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
            <div className={styles.signupForm}>
                <div className={styles.logoContainer}>
                    <img src="/logo.png" alt="Logo" />
                </div>
                <Form
                    name="signup"
                    style={{ maxWidth: 700, width: '90%' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className={styles.formItem}>
                        <div className={styles.avatarUploader}>
                            <Upload
                                listType="picture-circle"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                beforeUpload={() => false} // Prevent automatic upload
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </div>
                    </div>

                    <div className={styles.formItem}>
                        <Form.Item<SignupFieldType>
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
                            <div className={styles.passwordConfirmGroup}>
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="비밀번호 확인"
                                    className={styles.inputField}
                                />
                            </div>
                        </Form.Item>
                    </div>

                    <div className={styles.formItem}>
                        <Form.Item<SignupFieldType>
                            name="nickname"
                            rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}
                        >
                            <Input
                                placeholder="닉네임  (예시) jeff.lim"
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
