import React from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

// Define the props interface
interface HeaderProps {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    title: string;
    showLeft?: 'yes' | 'no';
    showRight?: 'yes' | 'no';
    showLine?: 'yes' | 'no';
}

const Header: React.FC<HeaderProps> = ({
                                           title,
                                           showLeft = 'yes',
                                           showRight = 'yes',
                                           showLine = 'yes'
                                       }) => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); //뒤로가기
    };

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className={`${styles.container} ${showLine === 'no' ? styles.noLine : ''}`}>
            {showLeft === 'yes' && (
                <div className={styles.leftIcon} onClick={handleBack}>
                    <IoIosArrowBack/>
                </div>
            )}
            <div className={styles.title}>
                {title}
            </div>
            {showRight === 'yes' && (
                <div className={styles.rightIcon} onClick={handleClose}>
                    <IoCloseOutline/>
                </div>
            )}
        </div>
    );
};


export default Header;
