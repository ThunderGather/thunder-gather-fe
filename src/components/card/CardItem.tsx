import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CardItem.module.css';
import { Avatar, Drawer, Tooltip, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CardDetail from "./CardDetail";
import { FaDeleteLeft } from "react-icons/fa6";
import AsyncModal from "../modal/Modal";
import axios from "axios";

interface Participant {
    id: number;
    nickname: string;
    profileImageUrl: string;
    author: boolean;
}

interface CardItemProps {
    postId: number;
    category: string;
    title: string;
    dateTime: string;
    participants: Participant[];
}

const CardItem: React.FC<CardItemProps> = ({ postId, category, title, dateTime, participants }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const location = useLocation();

    // const reload = () => {
    //     history.go(0);
    // }

    const handleCancel = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/meeting/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status >= 200 && response.status < 300 ) {
                // reload();
                message.success('번개가 취소되었습니다.');

            }
        } catch (error) {
            console.error(error);
            message.error('번개 취소에 실패했습니다.');
        }
    }

    const showDrawer = () => {
        // console.log(`Post ID: ${postId}`);
        setDrawerVisible(true);
    }

    const closeDrawer = () => {
        setDrawerVisible(false);
    }

    const handleDeleteClick = () => {
        setModalOpen(true);
    };

    const handleModalOk = () => {
        setModalOpen(false);
        handleCancel();
    };

    const handleModalCancel = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.detailContainer}>
                    <div className={styles.detailTopContainer}>
                        <div className={styles.tag}>{category}</div>
                        {location.pathname === '/profile' && (
                            <Tooltip title="번개 취소" placement="top">
                                <button className={styles.deleteIcon} onClick={handleDeleteClick}><FaDeleteLeft /></button>
                            </Tooltip>
                        )}
                    </div>

                    <div className={styles.title}>{title}</div>
                    <div className={styles.date}>{dateTime}</div>
                    <div className={styles.people}>
                        <Avatar.Group
                            max={{ count: 3 }}
                            maxPopoverTrigger="click"
                            size="small"
                            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                        >
                            {participants.map(participant => (
                                <Tooltip title={participant.nickname} placement="top" key={participant.id}>
                                    <Avatar src={participant.profileImageUrl} icon={!participant.profileImageUrl ? <UserOutlined /> : undefined} />
                                </Tooltip>
                            ))}
                        </Avatar.Group>
                    </div>
                </div>
                <button className={styles.button} onClick={() => showDrawer()}><span>more</span></button>
            </div>
            <Drawer
                title="번개 자세히 보기"
                placement="bottom"
                closable={true}
                onClose={closeDrawer}
                open={drawerVisible}
                height="90%" style={{
                    maxWidth: '600px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                bodyStyle={{
                    overflowY: 'auto',
                }}
            >
                <CardDetail postId={postId} />
            </Drawer>
            <AsyncModal
                modalText="번개참여를 취소하시겠습니까?"
                open={modalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            />
        </>
    );
};

export default CardItem;
