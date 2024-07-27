import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CardItem.module.css';
import {Avatar, Drawer, Tooltip} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CardDetail from "./CardDetail.tsx";
import { FaDeleteLeft } from "react-icons/fa6";
import AsyncModal from "../modal/Modal.tsx";

const CardItem: React.FC = () => {
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
                    <div className={styles.tag}>카페</div>
                    {location.pathname === '/profile' && (
                        <Tooltip title="번개 취소" placement="top">
                            <button className={styles.deleteIcon} onClick={handleDeleteClick}><FaDeleteLeft /></button>
                        </Tooltip>
                    )}
                </div>

                <div className={styles.title}>스타벅스 카공팸 모집합니다</div>
                <div className={styles.date}>9/10(월) 10:00 am</div>
                <div className={styles.people}>
                    <Avatar.Group
                        maxCount={3}
                        maxPopoverTrigger="click"
                        size="small"
                        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                    >
                        <Tooltip title="User 1" placement="top">
                            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                        </Tooltip>
                        <Tooltip title="User 2" placement="top">
                            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                        </Tooltip>
                        <Tooltip title="User 3" placement="top">
                            <Avatar icon={<UserOutlined />} />
                        </Tooltip>
                        <Tooltip title="User 4" placement="top">
                            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" />
                        </Tooltip>
                        <Tooltip title="User 5" placement="top">
                            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=4" />
                        </Tooltip>
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
                    // boxShadow: 'none',
                    // height: 'auto',
                }}
                bodyStyle={{
                    // maxHeight: '80vh',
                    overflowY: 'auto',
                }}
            >
                <CardDetail />
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
