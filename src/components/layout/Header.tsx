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
}

const Header: React.FC<HeaderProps> = ({
                                           title,
                                           showLeft = 'yes',
                                           showRight = 'yes'
                                       }) => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); //뒤로가기
    };

    return (
        <div className={styles.container}>
            {showLeft === 'yes' && (
                <div className={styles.leftIcon} onClick={handleBack}>
                    <IoIosArrowBack />
                </div>
            )}
            <div className={styles.title}>
                {title}
            </div>
            {showRight === 'yes' && (
                <div className={styles.rightIcon} onClick={handleBack}>
                    <IoCloseOutline />
                </div>
            )}
        </div>
    );
};


export default Header;
