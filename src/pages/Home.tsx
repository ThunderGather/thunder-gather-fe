import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
// import Footer from "../components/layout/Footer.tsx";

const categories = [
    { id: 1, name: '밥', imgSrc: '/category/1.png', path: '/category/1' },
    { id: 2, name: '카페', imgSrc: '/category/2.png', path: '/category/2' },
    { id: 3, name: '술', imgSrc: '/category/3.png', path: '/category/3' },
    { id: 4, name: '운동', imgSrc: 'category/4.png', path: '/category/4' },
    { id: 5, name: '출사', imgSrc: '/category/5.png', path: '/category/5' },
    { id: 6, name: '산책', imgSrc: '/category/6.png', path: '/category/6' },
    { id: 7, name: '노래방', imgSrc: '/category/7.png', path: '/category/7' },
    { id: 8, name: '코딩', imgSrc: '/category/8.png', path: '/category/8' }
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
            </div>
            {/*<div className={styles.footerContainer}>*/}
            {/*    <Footer/>*/}
            {/*</div>*/}
        </div>
    );
};

export default Home;