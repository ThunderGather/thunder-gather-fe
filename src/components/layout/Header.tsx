import React from 'react';
import styles from './Header.module.css';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';

// Define the props interface
interface HeaderProps {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    title: string;
}

const Header: React.FC<HeaderProps> = ({ leftIcon = <FaArrowLeft />, rightIcon = <FaTimes />, title }) => {
    return (
        <div className={styles.container}>
            <div className={styles.leftIcon}>
                {leftIcon}
            </div>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.rightIcon}>
                {rightIcon}
            </div>
        </div>
    );
};

export default Header;
