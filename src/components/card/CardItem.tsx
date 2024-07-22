import React, {useState} from 'react';
import styles from './CardItem.module.css';
import {Avatar, Drawer, Tooltip} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CardDetail from "./CardDetail.tsx";

const CardItem: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const showDrawer = () => {
        setDrawerVisible(true);
    }

    const closeDrawer = () => {
        setDrawerVisible(false);
    }

    return (
        <>
        <div className={styles.container}>
            <div className={styles.detailContainer}>
                <div className={styles.tag}>카페</div>
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
                title="Post Detail"
                placement="bottom"
                closable={true}
                onClose={closeDrawer}
                open={drawerVisible}
                height="90%" // Adjust height as needed
            >
                <CardDetail />
            </Drawer>
        </>
    );
};

export default CardItem;
