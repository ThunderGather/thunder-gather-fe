import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import Header from "../components/layout/Header";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { GrAnnounce } from "react-icons/gr";
import { message } from "antd";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import CardItem from "../components/card/CardItem";

interface Participant {
    id: number;
    nickname: string;
    profileImageUrl: string;
    author: boolean;
}


// Define the Post type
interface Post {
    postId: number;
    category: string;
    title: string;
    dateTime: string;
    participants: Participant[];
}

const Profile: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleToSignin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('access_token');
            // 로그아웃 요청
            await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
                accessToken: token
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // 로그아웃 성공 시 처리
            localStorage.removeItem('access_token');
            setIsLoggedIn(false);
            message.success('로그아웃 성공!');
            navigate("/");
        } catch (error) {
            // 오류 처리
            message.error('로그아웃 실패. 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/meeting/mymeeting`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                    setPosts([]);
                }
            } catch (error) {
                console.error('Error fetching posts data:', error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className={styles.headerContainer}>
                <Header title='마이 번개' showLeft='no' showRight='yes' />
            </div>
            <div className={styles.container}>
                <div className={styles.topContainer}>
                    {!isLoggedIn && (
                        <button className={styles.signIn} onClick={handleToSignin}>
                            <div className={styles.signInTitle}>로그인 및 회원가입</div>
                            <div className={styles.signInSubTitle}>번게더에 가입하고 번개에 참여해주세요!</div>
                            <IoIosArrowForward className={styles.icon} />
                        </button>
                    )}
                    {isLoggedIn && (
                        <button className={styles.logout} onClick={handleLogout}>
                            <div className={styles.logoutTitle}>로그아웃</div>
                            <IoIosArrowForward className={styles.icon} />
                        </button>
                    )}
                    <button className={styles.feedback} onClick={() => window.open("https://forms.gle/cumcUmVNSAYSojdo6", "_blank")}>
                        <div className={styles.feedbackTitle}>
                            번게더 피드백 주기
                        </div>
                        <IoIosArrowForward className={styles.icon} />
                    </button>
                    <button className={styles.notices} onClick={() => navigate('/notices')}>
                        <div className={styles.feedbackTitle}>
                            <GrAnnounce /> <span>공지사항</span>
                        </div>
                        <IoIosArrowForward className={styles.icon} />
                    </button>
                </div>
                <div className={styles.bottomContainer}>
                    <div className={styles.myListTitle}>
                        내 번개 목록
                    </div>
                    <div className={styles.itemContainer}>
                        {loading ? (
                            <SpinnerCircular size={50} color="#F7DF66" />
                        ) : (
                            posts.map(post => (
                                <CardItem
                                    key={post.postId}
                                    postId={post.postId}
                                    category={post.category}
                                    title={post.title}
                                    dateTime={post.dateTime}
                                    participants={post.participants}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
