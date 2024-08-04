import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CardDetail.module.css';
import CardParticipant from "./CardParticipant";
import { FaBoltLightning } from "react-icons/fa6";
import { Tooltip, FloatButton, Typography, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AsyncModal from '../modal/Modal';
import AsyncModal2 from '../modal/Modal2';
import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from 'spinners-react';

const { Paragraph } = Typography;

interface CardDetailProps {
    postId: number;
}

const CardDetail: React.FC<CardDetailProps> = ({ postId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [postData, setPostData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/post/${postId}`);
                setPostData(response.data);
            } catch (error) {
                message.error('데이터를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchPostData();
    }, [postId]);

    const handleDeleteClick = () => {
        setModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        const token = localStorage.getItem('access_token');
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/post/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            message.success('번개가 삭제되었습니다.');
            navigate('/'); // Navigate to another page if needed
        } catch (error) {
            message.error('번개 삭제에 실패했습니다.');
        }
        setModalOpen(false);
    };

    const handleJoinConfirm = async () => {
        const token = localStorage.getItem('access_token');
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/meeting/${postId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            message.success('참여 완료! 번개 종료 후 해당 오픈채팅방의 이용을 지양합시다.');
        } catch (error) {
            message.error('번개 참여에 실패했습니다.');
        }
        setModalOpen2(false);
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
        handleJoinConfirm();
    };

    const handleModalCancel2 = () => {
        setModalOpen2(false);
    };

    if (loading) {
        return <SpinnerCircular size={50} color="#F7DF66" />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.tag}>{postData.category}</div>
                <div className={styles.btnContainer}>
                    <FloatButton.Group shape="square" style={{ right: 40 }}>
                        <FloatButton icon={<DeleteOutlined onClick={handleDeleteClick} />} />
                        <FloatButton icon={<EditOutlined />} onClick={() => navigate(`/post/edit/${postId}`)} />
                    </FloatButton.Group>
                </div>
            </div>

            <h2 className={styles.title}>{postData.title}</h2>
            <div className={styles.detailGroup}>
                <span style={{ color: '#C9C3B6' }}>일시</span>
                <span>{new Date(postData.dateTime).toLocaleString()}</span>
            </div>
            <div className={styles.detailGroup}>
                <span style={{ color: '#C9C3B6' }}>위치</span>
                <span>{postData.location}</span>
            </div>
            <div className={styles.detailGroup}>
                <span style={{ color: '#C9C3B6' }}>참석</span>
                <span>{`${postData.participants?.length || 0}/${postData.maxParticipants}`}</span>
            </div>
            <div className={styles.detailGroup}>
                <span style={{ color: '#C9C3B6' }}>오픈채팅</span>
                <button className={styles.urlShortcuts} onClick={() => window.open(postData.openChatUrl, "_blank")}>
                    바로가기
                </button>
                <Paragraph copyable={{ tooltips: false }} className={styles.chatLink}>{postData.openChatUrl}</Paragraph>
            </div>
            <div className={styles.description}>
                {postData.description}
            </div>
            <div className={styles.joinBtnContainer}></div>
            <hr />
            <div className={styles.participantList}>
                <div className={styles.partiTopContainer}>
                    <h2 className={styles.title}>번개 멤버 ({postData.participants?.length || 0}/{postData.maxParticipants})</h2>
                    <Tooltip title="번개 참여">
                        <button className={styles.joinBtn} onClick={handleJoinClick}>
                            <FaBoltLightning className={styles.icon} />
                        </button>
                    </Tooltip>
                </div>
                {postData.participants?.map((participant: any) => (
                    <CardParticipant
                        key={participant.id}
                        imgSrc={participant.profileImageUrl}
                        name={participant.nickname}
                        hostTag={participant.author}
                    />
                ))}
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
