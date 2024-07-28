import React, { useState } from 'react';
import { Modal } from 'antd';

interface AsyncModalProps {
    modalText: string;
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
}

const AsyncModal2: React.FC<AsyncModalProps> = ({ modalText, open, onOk, onCancel }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            onOk();
        }, 2000);
    };

    return (
        <Modal
            centered
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            width={350}
        >
            <p>{modalText}</p>
        </Modal>
    );
};

export default AsyncModal2;
