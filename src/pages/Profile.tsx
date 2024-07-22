import React from 'react';
import styles from './Profile.module.css';
import Header from "../components/layout/Header.tsx";

const Profile: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <Header title='나의 번개' showLeft='no' showRight='yes'/>
            </div>
        </div>
    );
};

export default Profile;