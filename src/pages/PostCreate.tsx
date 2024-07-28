import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {Form, Input, DatePicker, TimePicker, Select, InputNumber, Row, Col, Button, Checkbox, message} from 'antd';
import axios from 'axios';
import styles from './PostCreate.module.css';
import Header from "../components/layout/Header";
import { FaBoltLightning } from "react-icons/fa6";

const { TextArea } = Input;
const { Option } = Select;

type SizeType = 'small' | 'middle' | 'large';

const PostCreate: React.FC = () => {
    const [form] = Form.useForm();
    const [componentSize, setComponentSize] = useState<SizeType>('middle');
    const [isOnline, setIsOnline] = useState(false);
    const navigate = useNavigate();

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    const handleCheckboxChange = (e: any) => {
        setIsOnline(e.target.checked);
    };

    useEffect(() => {
        if (isOnline) {
            form.setFieldsValue({ location: '온라인' });
        } else {
            form.setFieldsValue({ location: '' });
        }
    }, [isOnline, form]);

    const handleSubmit = async (values: any) => {
        const postData = {
            title: values.title,
            desiredDate: values.date.format('YYYY-MM-DD'),
            desiredTime: values.time.format('HH:mm'), // Convert to 24-hour format
            category: values.category,
            maxParticipants: values.capacity,
            description: values.description,
            location: values.location,
            openChatUrl: values.chatUrl
        };

        console.log('Post Data:', postData);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/post`, postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Form Values:', response.data);
            if (response.status === 200) {
                message.success('번개 작성 완료!');
                navigate('/');
            }
        } catch (error) {
            message.error('번개 작성 실패 .. ');
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Header title='번개 생성' showLeft='no' showRight='yes' showLine='yes' />
            <div className={styles.formContainer}>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{ size: componentSize }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                    onFinish={handleSubmit}
                    style={{ margin: '0 auto', width: '100%' }}
                >
                    <Form.Item label="제목" name="title" rules={[{ required: true, message: '제목을 입력해주세요!' }]}>
                        <Input className={styles.inputField} placeholder="제목을 입력해주세요" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="날짜" name="date" rules={[{ required: true, message: '날짜를 선택해주세요!' }]}>
                                <DatePicker className={styles.datePickerField} style={{ width: '100%' }} placeholder="날짜를 선택해주세요" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="시간" name="time" rules={[{ required: true, message: '시간을 선택해주세요!' }]}>
                                <TimePicker className={styles.timePickerField} format="h:mm a" style={{ width: '100%' }} placeholder="시간을 선택해주세요" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="카테고리" name="category" rules={[{ required: true, message: '카테고리를 선택해주세요!' }]}>
                                <Select className={styles.selectField} placeholder="카테고리를 선택해주세요">
                                    <Option value="밥">밥</Option>
                                    <Option value="카페">카페</Option>
                                    <Option value="술">술</Option>
                                    <Option value="운동">운동</Option>
                                    <Option value="출사">출사</Option>
                                    <Option value="산책">산책</Option>
                                    <Option value="쇼핑">쇼핑</Option>
                                    <Option value="코딩">코딩</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="정원 (2~60)" name="capacity" rules={[{ required: true, message: '정원을 입력해주세요!' }]}>
                                <InputNumber className={styles.inputNumberField} min={2} max={60} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="설명" name="description" rules={[{ required: true, message: '설명을 입력해주세요!' }]}>
                        <TextArea className={styles.textAreaField} rows={4} placeholder="설명을 입력해주세요" style={{ resize: 'none' }} />
                    </Form.Item>

                    <Row gutter={16} align="middle">
                        <Col span={16}>
                            <Form.Item label="위치" name="location" rules={[{ required: true, message: '위치를 입력해주세요!' }]}>
                                {/*<Input className={styles.inputField} placeholder="위치를 입력해주세요" />*/}
                                {isOnline ? (
                                    <Input className={styles.inputField} placeholder="위치를 입력해주세요" readOnly />
                                ) : (
                                    <Input className={styles.inputField} placeholder="위치를 입력해주세요" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="isOnline" valuePropName="checked" style={{ marginTop: '32px' }}>
                                <Checkbox onChange={handleCheckboxChange}>온라인</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="오픈채팅방" name="chatUrl" rules={[{ type: 'url', message: '유효한 URL을 입력해주세요!' }]}>
                        <Input className={styles.inputField} placeholder="오픈채팅방 URL을 입력해주세요" />
                    </Form.Item>

                    <Form.Item>
                        <div className={styles.submitBtnContainer}>
                            <Button type="primary" htmlType="submit" className={styles.submitBtn}>
                                <FaBoltLightning />
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default PostCreate;
