import React, { useState } from 'react';
import styles from './CardDetail.module.css';
import CardParticipant from "./CardParticipant.tsx";
import { FaBoltLightning } from "react-icons/fa6";
import { Tooltip, FloatButton, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AsyncModal from '../modal/Modal.tsx';

const { Paragraph } = Typography;

const CardDetail: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    // const [modalText, setModalText] = useState('Join request is being processed');

    const handleJoinClick = () => {
        setModalOpen(true);
    };

    const handleModalOk = () => {
        setModalOpen(false);
    };

    const handleModalCancel = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.tag}>카페</div>
                <div className={styles.btnContainer}>
                    <FloatButton.Group shape="square" style={{ right: 40 }}>
                        <FloatButton icon={<DeleteOutlined onClick={() => alert("Delete clicked!")}/>}/>
                        <FloatButton icon={<EditOutlined onClick={() => alert("Edit clicked!")}/>} />
                    </FloatButton.Group>
                </div>
            </div>

            <h2 className={styles.title}>스타벅스 카공팸 모집합니다</h2>
            <div className={styles.detailGroup}>
                <span style={{ color: '#C9C3B6' }}>일시</span>
                <span>2024/9/10 (월) 오전 10:30</span>
            </div>
            <div className={styles.detailGroup}>
                <span style={{ color: '#C9C3B6' }}>위치</span>
                <span>스타벅스 제주용담DT점</span>
            </div>
            <div className={styles.detailGroup}>
                <span style={{ color: '#C9C3B6' }}>참석</span>
                <span>4/5</span>
            </div>
            <div className={styles.detailGroup}>
                <span style={{ color: '#C9C3B6' }}>오픈채팅</span>
                <Paragraph copyable={{ tooltips: false }} className={styles.chatLink}>https://www.gle.com/w.google.com/w.googoogle.com/w.google.comhttps://www.google.com</Paragraph>
            </div>
            {/*<div className={styles.map}>지도 지도 지도 지도 </div>*/}
            <div className={styles.description}>
                스타벅스에서 스근하게 코딩할사람 모집합니다~~
                4시간정도 공부하다가 저녁도 같이 먹읍쉬다
            </div>
            <div className={styles.joinBtnContainer}></div>
            <hr />
            <div className={styles.participantList}>
                <div className={styles.partiTopContainer}>
                    <h2 className={styles.title}>번개 멤버 (4/5)</h2>
                    <Tooltip title="번개 참여">
                        <button className={styles.joinBtn} onClick={handleJoinClick}>
                            <FaBoltLightning className={styles.icon} />
                        </button>
                    </Tooltip>
                </div>
                <CardParticipant imgSrc="/images/derek.jpeg" name="derek.yoo" hostTag={true} />
                <CardParticipant imgSrc="/images/eric.jpeg" name="eric.ha" />
                <CardParticipant imgSrc="/images/eric.jpeg" name="eric.ha" />
                <CardParticipant imgSrc="/images/eric.jpeg" name="eric.ha" />
            </div>
            <AsyncModal
                modalText="번개에 참여 하시겠습니까?"
                open={modalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            />
        </div>
    );
};

export default CardDetail;
