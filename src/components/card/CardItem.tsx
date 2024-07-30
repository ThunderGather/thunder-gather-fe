import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CardItem.module.css';
import { Avatar, Drawer, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import CardDetail from "./CardDetail.tsx";
import { FaDeleteLeft } from "react-icons/fa6";
import AsyncModal from "../modal/Modal.tsx";

interface Participant {
    id: number;
    nickname: string;
    profileImageUrl: string;
    author: boolean;
}

interface CardItemProps {
    category: string;
    title: string;
    dateTime: string;
    participants: Participant[];
}

const CardItem: React.FC<CardItemProps> = ({ category, title, dateTime, participants }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const location = useLocation();

    const showDrawer = () => {
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
                    <div className={styles.date}>{new Date(dateTime).toLocaleString()}</div>
                    <div className={styles.people}>
                        <Avatar.Group
                            maxCount={3}
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
                <button className={styles.button} onClick={showDrawer}><span>more</span></button>
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
                {/*<CardDetail category={category} title={title} dateTime={dateTime} participants={participants} />*/}
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
