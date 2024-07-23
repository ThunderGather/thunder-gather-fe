import React from 'react';
import styles from './Profile.module.css';
import Header from "../components/layout/Header.tsx";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const Profile: React.FC = () => {
    const navigate = useNavigate();

    const handleToSignin = () => {
        navigate("/login")
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <Header title='마이 번개' showLeft='no' showRight='yes'/>
            </div>
            <div className={styles.topContainer} >
                <button className={styles.signIn} onClick={handleToSignin}>
                        <div className={styles.signInTitle}>로그인 및 회원가입</div>
                    <div className={styles.signInSubTitle}>번게더에 가입하고 번개에 참여해주세요!</div>
                    <IoIosArrowForward className={styles.icon}/>
                </button>
                <button className={styles.feedback}>
                    <div className={styles.feedbackTitle}>번게더 피드백 주기</div>
                    <IoIosArrowForward className={styles.icon}/>
                </button>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.myListTitle}>
                    내 번개 목록
                </div>

            </div>
        </div>
    );
};

export default Profile;