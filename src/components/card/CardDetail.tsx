import React, { useState } from 'react';
import axios from 'axios';
import styles from './CardDetail.module.css';
import CardParticipant from "./CardParticipant.tsx";
import { FaBoltLightning } from "react-icons/fa6";
import { Tooltip, FloatButton, Typography, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AsyncModal from '../modal/Modal.tsx';
import AsyncModal2 from "../modal/Modal2.tsx";
import { useNavigate } from "react-router-dom";

const { Paragraph } = Typography;

const CardDetail: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        setModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/post/{postId}`);
            message.success('번개가 삭제되었습니다.');
            navigate('/'); // Navigate to another page if needed
        } catch (error) {
            message.error('번개 삭제에 실패했습니다.');
        }
        setModalOpen(false);
    };

    const handleJoinClick = () => {
        setModalOpen2(true);
    };

    const handleModalOk = () => {
        handleDeleteConfirm();
    };

    const handleModalCancel = () => {
        setModalOpen(false);
    };

    const handleModalOk2 = () => {
        setModalOpen2(false);
        message.success('참여 완료! 번개 종료 후 해당 오픈채팅방의 이용을 지양합시다.');
    };

    const handleModalCancel2 = () => {
        setModalOpen2(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.tag}>카페</div>
                <div className={styles.btnContainer}>
                    <FloatButton.Group shape="square" style={{ right: 40 }}>
                        <FloatButton icon={<DeleteOutlined onClick={handleDeleteClick} />} />
                        <FloatButton icon={<EditOutlined />} onClick={() => navigate('/post/edit')} />
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
                <button className={styles.urlShortcuts} onClick={() => window.open("https://i.namu.wiki/i/67v5G85ne3H19DBedmSJUd3vKPQk-5oaaa5z-kq8gFLTyzd_Ei-noXvfzGhDtMZp2VsqORNJ0WOhfjlZIQHdmw.webp", "_blank")}>
                    바로가기
                </button>
                <Paragraph copyable={{ tooltips: false }} className={styles.chatLink}>https://www.gle.com/w.google.com/w.googoogle.com/w.google.comhttps://www.google.com</Paragraph>
            </div>
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
                modalText="번개를 삭제하시겠습니까?"
                open={modalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            />
            <AsyncModal2
                modalText="번개에 참여하시겠습니까?"
                open={modalOpen2}
                onOk={handleModalOk2}
                onCancel={handleModalCancel2}
            />
        </div>
    );
};

export default CardDetail;
