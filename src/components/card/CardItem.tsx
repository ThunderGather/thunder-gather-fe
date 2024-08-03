import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CardItem.module.css';
import { Avatar, Drawer, Tooltip } from 'antd';
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

    const handleCancel = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/meeting/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    const showDrawer = (postId: number) => {
        console.log(`Post ID: ${postId}`);
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

    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'short' });
        const formattedDate = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
        });
        return `${formattedDate}(${dayOfWeek}) ${formattedTime}`;
    }

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
                    <div className={styles.date}>{formatDateTime(dateTime)}</div>
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
                <button className={styles.button} onClick={() => showDrawer(postId)}><span>more</span></button>
            </div>
            <Drawer
                title="번개 자세히 보기"
                placement="bottom"
                closable={true}
                onClose={closeDrawer}
                open={drawerVisible}
                height="90%"
                style={{
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
