import React from 'react';
import styles from './CardDetail.module.css';

const CardDetail: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.tag}>카페</div>
            <h2 className={styles.title}>스타벅스 카공팸 모집합니다</h2>
            <div className={styles.detailGroup}>
                <span style={{color: '#C9C3B6'}}>일시</span>
                <span>2024/9/10 (월) 오전 10:30</span>
            </div>
            <div className={styles.detailGroup}>
                <span style={{color: '#C9C3B6'}}>위치</span>
                <span>스타벅스 제주용담DT점</span>
            </div>
            <div className={styles.detailGroup}>
                <span style={{color: '#C9C3B6'}}>참석</span>
                <span>4/5</span>
            </div>
            <div className={styles.detailGroup}>
                <span style={{color: '#C9C3B6'}}>오픈채팅</span>
                <span>https://www.google.com/</span>
            </div>
            <div className={styles.map}></div>

        </div>
    );
};

export default CardDetail;
