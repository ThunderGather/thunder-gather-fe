import React from 'react';
import styles from './CardDetail.module.css';
import CardParticipant from "./CardParticipant.tsx";

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
            <div className={styles.map}>지도 지도 지도 지도 </div>
            <div className={styles.description}>
                스타벅스에서 스근하게 코딩할사람 모집합니다~~
                4시간정도 공부하다가 저녁도 같이 먹읍쉬다
            </div>
            <hr />
            <div className={styles.participantList}>
                <h2 className={styles.title}>참여멤버 (4/5)</h2>
                <CardParticipant imgSrc="/images/derek.jpeg" name="derek.yoo" hostTag={true} />
                <CardParticipant imgSrc="/images/eric.jpeg" name="eric.shin"/>
                <CardParticipant imgSrc="/images/eric.jpeg" name="eric.shin"/>
                <CardParticipant imgSrc="/images/eric.jpeg" name="eric.shin"/>
            </div>

        </div>
    );
};

export default CardDetail;
