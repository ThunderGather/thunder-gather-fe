import React from 'react';
import styles from './CardParticipant.module.css';
import { BsLightningFill } from "react-icons/bs";

interface CardParticipantProps {
    imgSrc: string;
    name: string;
    hostTag?: boolean;
}

const CardParticipant: React.FC<CardParticipantProps> = ({ imgSrc, name, hostTag = false }) => {
    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src={imgSrc} alt="avatar" />
            </div>
            <div className={styles.name}>
                {name}
            </div>
            {hostTag && (
                <div className={styles.hostTag}>
                    <BsLightningFill className={styles.icon} />번개장
                </div>
            )}
        </div>
    );
};

export default CardParticipant;
