import React from 'react';
import styles from './Post.module.css';
import Header from "../components/layout/Header.tsx";
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CardItem from "../components/card/CardItem.tsx";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const Post: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <Header title='모든 번개 보기' showLeft='yes' showRight='no' showLine='no'/>
                <div className={styles.filterContainer}>
                    <Space direction="vertical" size={12}>
                        <RangePicker
                            defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
                            format={dateFormat}
                        />
                    </Space>
                </div>
            </div>
            <div className={styles.itemContainer}>
                <div className={styles.dailyGroup}>
                    <div className={styles.groupLabel}>
                        8/1 (월)
                    </div>
                    <CardItem/>
                </div>
                <div className={styles.dailyGroup}>
                    <div className={styles.groupLabel}>
                        8/2 (화)
                    </div>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                </div>
                <div className={styles.dailyGroup}>
                    <div className={styles.groupLabel}>
                        8/3 (수)
                    </div>
                    <CardItem/>
                    <CardItem/>

                </div>
            </div>
        </div>
    );
};

export default Post;
