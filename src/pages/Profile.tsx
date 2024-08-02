import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import Header from "../components/layout/Header.tsx";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
// import { GrAnnounce } from "react-icons/gr";
// import CardItem from "../components/card/CardItem.tsx";
// import axios from "axios";
import {message} from "antd";

const Profile: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleToSignin = () => {
        navigate("/login")
    };

    // const handleLogout = async () => {
    //     const accessToken = localStorage.getItem('access_token');
    //
    //     try {
    //         await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
    //             accessToken: accessToken
    //         }, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //
    //         // Clear the token and update the state
    //         localStorage.removeItem('access_token');
    //         setIsLoggedIn(false);
    //         message.success('로그아웃 성공!');
    //
    //
    //         navigate("/");
    //     } catch (error) {
    //         message.error('로그아웃 실패. 다시 시도해주세요.');
    //         console.error('Error during logout:', error);
    //         // Handle the error (optional)
    //     }
    // };

    const handleLogout = () => {

        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
        message.success('로그아웃 성공!');
        navigate("/");
    };



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
                    <button className={styles.feedback}
                            onClick={() => window.open("https://forms.gle/cumcUmVNSAYSojdo6", "_blank")}>
                        <div className={styles.feedbackTitle}>번게더 피드백 주기</div>
                        <IoIosArrowForward className={styles.icon} />
                    </button>
                </div>
                <div className={styles.bottomContainer}>
                    <div className={styles.myListTitle}>
                        내 번개 목록
                    </div>
                    <div className={styles.itemContainer}>
                        {/*<CardItem />*/}
                        {/*<CardItem />*/}
                        {/*<CardItem />*/}
                    </div>
                    <div className={styles.noticesContainer}>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
