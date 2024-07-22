import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, InputNumber, Button } from 'antd';
import styles from './PostCreate.module.css';
import Header from "../components/layout/Header.tsx";

const { TextArea } = Input;

const PostCreate: React.FC = () => {
    const [form] = Form.useForm();
    const [componentSize, setComponentSize] = useState<'default'>('default');

    const onFormLayoutChange = ({ size }: { size: 'default' }) => {
        setComponentSize(size);
    };

    const handleSubmit = (values: any) => {
        console.log('Form Values:', values);
    };

    return (
        <div className={styles.container}>
            <Header title='번개 생성' showLeft='no' showRight='yes' />
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={handleSubmit}
                style={{  margin: '0 auto', width: '100%' }}
            >
                <Form.Item label="제목" name="title" rules={[{ required: true, message: '제목을 입력해주세요!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="날짜" name="date" rules={[{ required: true, message: '날짜를 선택해주세요!' }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label="카테고리" name="category" rules={[{ required: true, message: '카테고리를 선택해주세요!' }]}>
                    <Select>
                        <Select.Option value="밥">밥</Select.Option>
                        <Select.Option value="카페">카페</Select.Option>
                        <Select.Option value="술">술</Select.Option>
                        <Select.Option value="운동">운동</Select.Option>
                        <Select.Option value="출사">출사</Select.Option>
                        <Select.Option value="산책">산책</Select.Option>
                        <Select.Option value="노래방">노래방</Select.Option>
                        <Select.Option value="코딩">코딩</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="설명" name="description" rules={[{ required: true, message: '설명을 입력해주세요!' }]}>
                    <TextArea rows={4} style={{ resize: 'none'}}/>
                </Form.Item>
                <Form.Item label="오픈채팅방" name="chatUrl" rules={[{ required: false, type: 'url', message: '유효한 URL을 입력해주세요!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="정원 (2~60)" name="capacity" rules={[{ required: true, message: '정원을 입력해주세요!' }]}>
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
                    <div className={styles.submitBtnContainer}>
                    <Button type="primary" htmlType="submit" className={styles.submitBtn}>
                        제출
                    </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PostCreate;
