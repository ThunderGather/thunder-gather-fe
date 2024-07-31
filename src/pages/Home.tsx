import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import CardItem from "../components/card/CardItem";
import { FaBoltLightning } from "react-icons/fa6";
import { Popover } from 'antd';
import axios from 'axios';
import { isToday } from 'date-fns';
import { SpinnerCircular } from 'spinners-react';

interface Participant {
    id: number;
    nickname: string;
    profileImageUrl: string;
    author: boolean;
}

interface Post {
    postId: number;
    userId: number;
    category: string;
    title: string;
    dateTime: string;
    maxParticipants: number;
    location: string;
    openChatUrl: string;
    participants: Participant[];
}

const categories = [
    { id: 1, name: '밥', imgSrc: '/category/1.png', path: '/post/밥' },
    { id: 2, name: '카페', imgSrc: '/category/2.png', path: '/post/카페' },
    { id: 3, name: '술', imgSrc: '/category/3.png', path: '/post/술' },
    { id: 4, name: '운동', imgSrc: 'category/4.png', path: '/post/운동' },
    { id: 5, name: '출사', imgSrc: '/category/5.png', path: '/post/출사' },
    { id: 6, name: '산책', imgSrc: '/category/6.png', path: '/post/산책' },
    { id: 7, name: '쇼핑', imgSrc: '/category/7.png', path: '/post/쇼핑' },
    { id: 8, name: '코딩', imgSrc: '/category/8.png', path: '/post/코딩' }
];

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/post/list`)
            .then(response => {
                const fetchedPosts = Array.isArray(response.data) ? response.data : [];
                const todayPosts = fetchedPosts.filter(post => isToday(new Date(post.dateTime)));
                setPosts(todayPosts);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setPosts([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleCategoryClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <Popover overlayStyle={{ width: '300px' }} placement="bottomRight" title={"번게더란?"} content={"카클스를 위한 카클스에 의한 소모임 플랫폼입니다! 수강생 50명 모두가 원하는 번개를 만들고 참여할 수 있는 장을 만들고 싶었어요. 자유롭게 번개를 생성하고 참여하되, 오픈채팅방은 번개 종료시 이용하지 않도록 합시다! ⚡️"}>
                    <FaBoltLightning className={styles.infoIcon} />
                    <div className={styles.infoText}>이용 안내</div>
                </Popover>
            </div>
            <div className={styles.logoContainer}>
                <img src="/logo.png" alt="Logo" />
            </div>
            <div className={styles.categoryContainer}>
                {categories.map(category => (
                    <div
                        key={category.id}
                        className={styles.categoryButton}
                        onClick={() => handleCategoryClick(category.path)}
                    >
                        <div className={styles.imgContainer}>
                            <img src={category.imgSrc} alt={category.name} className={styles.categoryImage} />
                        </div>
                        <span className={styles.categoryName}>{category.name}</span>
                    </div>
                ))}
            </div>
            <div className={styles.todayContainer}>
                <div className={styles.titleContainer}>
                    <span className={styles.title}>오늘의 번개⚡️</span>
                </div>
                <div className={styles.todayList}>
                    {loading ? (
                        <SpinnerCircular size={50} color="#F7DF66" />
                    ) : (
                        posts.map(post => (
                            <CardItem
                                key={post.postId}
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
    );
};

export default Home;
