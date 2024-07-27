import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import CardItem from "../components/card/CardItem.tsx";
// import Footer from "../components/layout/Footer.tsx";

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

    const navigate = useNavigate();

    const handleCategoryClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img src="/logo.png" alt="Logo"/>
            </div>
            <div className={styles.categoryContainer}>
                {categories.map(category => (
                    <div
                        key={category.id}
                        className={styles.categoryButton}
                        onClick={() => handleCategoryClick(category.path)}

                    >
                        <div className={styles.imgContainer}>
                            <img src={category.imgSrc} alt={category.name} className={styles.categoryImage}/>
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
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    {/*<CardItem />*/}
                </div>
            </div>
        </div>
    );
};

export default Home;