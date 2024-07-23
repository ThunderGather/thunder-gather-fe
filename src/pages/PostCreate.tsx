import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, InputNumber, Button, Row, Col } from 'antd';
import styles from './PostCreate.module.css';
import Header from "../components/layout/Header";
import { FaBoltLightning } from "react-icons/fa6";

const { TextArea } = Input;
const { Option } = Select;

type SizeType = 'small' | 'middle' | 'large';

const PostCreate: React.FC = () => {
    const [form] = Form.useForm();
    const [componentSize, setComponentSize] = useState<SizeType>('middle'); // Changed default size to 'middle'

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    const handleSubmit = (values: any) => {
        console.log('Form Values:', values);
    };

    return (
        <div className={styles.container}>
            <Header title='번개 생성' showLeft='no' showRight='yes' showLine='yes' />
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
                        <Form.Item label="정원 (2~60)" name="capacity" rules={[{ required: true, message: '정원을 입력해주세요!' }]}>
                            <InputNumber className={styles.inputNumberField} min={2} max={60} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="카테고리" name="category" rules={[{ required: true, message: '카테고리를 선택해주세요!' }]}>
                    <Select className={styles.selectField} placeholder="카테고리를 선택해주세요">
                        <Option value="밥">밥</Option>
                        <Option value="카페">카페</Option>
                        <Option value="술">술</Option>
                        <Option value="운동">운동</Option>
                        <Option value="출사">출사</Option>
                        <Option value="산책">산책</Option>
                        <Option value="노래방">노래방</Option>
                        <Option value="코딩">코딩</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="설명" name="description" rules={[{ required: true, message: '설명을 입력해주세요!' }]}>
                    <TextArea className={styles.textAreaField} rows={4} placeholder="설명을 입력해주세요" style={{ resize: 'none' }} />
                </Form.Item>

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
    );
};

export default PostCreate;
