import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Post.module.css';
import Header from "../components/layout/Header.tsx";
import 'react-datepicker/dist/react-datepicker.css';
import CardItem from "../components/card/CardItem.tsx";
import { MdOutlineCategory } from "react-icons/md";
import { Select, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';

interface Participant {
    id: number;
    nickname: string;
    profileImageUrl: string;
    author: boolean;
}

interface PostData {
    postId: number;
    userId: number;
    category: string;
    title: string;
    dateTime: string;
    maxParticipants: number;
    participants: Participant[];
}

const Post: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);  // Loading state

    const handleChange = (value: string[]) => {
        setSelectedCategories(value);
        console.log(`selected ${value}`);
    };

    const options = [
        { label: '밥', value: '밥', emoji: '🍚', desc: '밥' },
        { label: '카페', value: '카페', emoji: '☕', desc: '카페' },
        { label: '술', value: '술', emoji: '🍻', desc: '술' },
        { label: '운동', value: '운동', emoji: '🏋️', desc: '운동' },
        { label: '출사', value: '출사', emoji: '📸', desc: '출사' },
        { label: '산책', value: '산책', emoji: '🚶', desc: '산책' },
        { label: '쇼핑', value: '쇼핑', emoji: '🛒', desc: '쇼핑' },
        { label: '코딩', value: '코딩', emoji: '💻', desc: '코딩' }
    ];

    useEffect(() => {
        if (category && options.find(option => option.value === category)) {
            setSelectedCategories([category]);
        }

        setLoading(true);  // Set loading state to true before making the request
        axios.get(`${import.meta.env.VITE_BASE_URL}/post/list`)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                    setPosts([]);
                }
            })
            .catch(error => {
                console.error('Error fetching posts data:', error);
                setPosts([]);
            })
            .finally(() => {
                setLoading(false);  // Set loading state to false after the request completes
            });
    }, [category]);

    const filteredPosts = selectedCategories.length > 0
        ? posts.filter(post => selectedCategories.includes(post.category))
        : posts;

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <Header title='번개 모음' showLeft='yes' showRight='no' showLine='no'/>
                <div className={styles.filterContainer}>
                    <div className={styles.dataPicker}></div>
                    <div className={styles.categoryPicker}>
                        <div className={styles.Label}>
                            <MdOutlineCategory/><span>종류</span>
                        </div>
                        <Select
                            mode="multiple"
                            style={{ width: '80%', fontSize: '12px', height: 'auto' }}
                            className={styles.categorySelect}
                            placeholder="카테고리를 선택해주세요"
                            value={selectedCategories}
                            onChange={handleChange}
                            options={options}
                            optionLabelProp="label"
                            optionRender={(option) => (
                                <Space>
                                    <span role="img" aria-label={option.data.label}>
                                        {option.data.emoji}
                                    </span>
                                    {option.data.desc}
                                </Space>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.itemContainer}>
                <div className={styles.dailyGroup}>
                    {loading ? (
                        <SpinnerCircular size={50} color="#F7DF66" />  // Spinner while loading
                    ) : (
                        filteredPosts.map(post => (
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
    );
};

export default Post;
