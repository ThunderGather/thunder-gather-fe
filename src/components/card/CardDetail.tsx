import React from 'react';
import styles from './CardDetail.module.css';

const CardDetail: React.FC = () => {
    return (
        <div className={styles.container}>
            <h2>Post Title</h2>
            <p>This is the detailed content of the post...</p>
            <p>More content here...</p>
        </div>
    );
};

export default CardDetail;
