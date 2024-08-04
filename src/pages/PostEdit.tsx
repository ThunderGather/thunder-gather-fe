import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, DatePicker, TimePicker, Select, InputNumber, Row, Col, Button, Checkbox, message } from 'antd';
import styles from './PostEdit.module.css';
import Header from "../components/layout/Header";
import dayjs from 'dayjs';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

type SizeType = 'small' | 'middle' | 'large';

const PostEdit: React.FC = () => {
    const [form] = Form.useForm();
    const [componentSize, setComponentSize] = useState<SizeType>('middle');
    const [isOnline, setIsOnline] = useState(false);
    const navigate = useNavigate();
    const { postId } = useParams();

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

    useEffect(() => {
        // Fetch post data and populate the form fields
        const postData = {
            title: "코딩 스터디 모집 (수정)",
            desiredDate: "2024-09-01",
            desiredTime: "22:02",
            category: "공부",
            capacity: 10,
            description: "함께 코딩 공부할 분을 추가 모집합니다.",
            location: "스타벅스 강남점",
            chatUrl: "https://openchat.example.com",
            isOnline: false
        };

        form.setFieldsValue({
            ...postData,
            desiredDate: dayjs(postData.desiredDate),
            desiredTime: dayjs(postData.desiredTime, 'HH:mm')
        });
        setIsOnline(postData.isOnline);
    }, [form]);

    const handleSubmit = async (values: any) => {
        const postData = {
            title: values.title,
            desiredDate: values.desiredDate.format('YYYY-MM-DD'),
            desiredTime: values.desiredTime.format('HH:mm'), // Convert to 24-hour format
            category: values.category,
            capacity: values.capacity,
            description: values.description,
            location: values.location,
            chatUrl: values.chatUrl
        };

        console.log('Post Data:', postData);

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/post/${postId}`, postData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Form Values:', response.data);
            if (response.status === 200) {
                message.success('게시물이 수정되었습니다.');
                navigate('/');
            }
        } catch (error) {
            message.error('게시물 수정 실패 .. 다시 시도해주세요.');
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Header title='번개 수정' showLeft='no' showRight='yes' showLine='yes' />
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
                            <Form.Item label="날짜" name="desiredDate" rules={[{ required: true, message: '날짜를 선택해주세요!' }]}>
                                <DatePicker
                                    className={styles.datePickerField}
                                    style={{ width: '100%' }}
                                    placeholder="날짜를 선택해주세요"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="시간" name="desiredTime" rules={[{ required: true, message: '시간을 선택해주세요!' }]}>
                                <TimePicker
                                    className={styles.timePickerField}
                                    format="HH:mm"
                                    style={{ width: '100%' }}
                                    placeholder="시간을 선택해주세요"
                                />
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
                                    <Option value="공부">공부</Option>
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
                                수정
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default PostEdit;
