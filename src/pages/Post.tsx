import React, { useState } from 'react';
import styles from './Post.module.css';
import Header from "../components/layout/Header.tsx";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CardItem from "../components/card/CardItem.tsx";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { Select, Space } from 'antd';

const Post: React.FC = () => {
    const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
    const [startDate, endDate] = dateRange;
    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    const options = [
        {
            label: '밥',
            value: '밥',
            emoji: '🍚',
            desc: '밥',
        },
        {
            label: '카페',
            value: '카페',
            emoji: '☕',
            desc: '카페',
        },
        {
            label: '술',
            value: '술',
            emoji: '🍻',
            desc: '술',
        },
        {
            label: '운동',
            value: '운동',
            emoji: '🏋️',
            desc: '운동',
        },
        {
            label: '출사',
            value: '출사',
            emoji: '📸',
            desc: '출사',
        },
        {
            label: '산책',
            value: '산책',
            emoji: '🚶',
            desc: '산책',
        },
        {
            label: '노래방',
            value: '노래방',
            emoji: '🎤',
            desc: '노래방',
        },
        {
            label: '코딩',
            value: '코딩',
            emoji: '💻',
            desc: '코딩',
        }
    ];


    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <Header title='모든 번개 보기' showLeft='yes' showRight='no' showLine='no'/>
                <div className={styles.filterContainer}>
                    <div className={styles.dataPicker}>
                    {/*<div className={styles.Label}>*/}
                    {/*    <LuCalendarDays /><span>날짜</span>*/}
                    {/*</div>*/}
                    {/*<ReactDatePicker*/}
                    {/*    selectsRange={true}*/}
                    {/*    startDate={startDate}*/}
                    {/*    endDate={endDate}*/}
                    {/*    onChange={(update: [Date | null, Date | null]) => {*/}
                    {/*        setDateRange([update[0] ?? undefined, update[1] ?? undefined]);*/}
                    {/*    }}*/}
                    {/*    withPortal*/}
                    {/*    dateFormat="yyyy/MM/dd"*/}
                    {/*    className={styles.datePicker}*/}
                    {/*    placeholderText="날짜를 선택해주세요"*/}
                    {/*/>*/}
                    </div>
                    <div className={styles.categoryPicker}>
                        <div className={styles.Label}>
                            <MdOutlineCategory/><span>종류</span>
                        </div>
                        <Select
                            mode="multiple"
                            style={{width: '80%', fontSize: '12px', height: '32px' }}
                            className={styles.categorySelect}
                            placeholder="카테고리를 선택해주세요"
                            // defaultValue={''}
                            onChange={handleChange}
                            options={options}
                            optionRender={(option) => (
                                <Space>
        <span role="img" aria-label={option.data.label}>
          {option.data.emoji}
        </span>
                                    {option.data.desc}
                                </Space>
                            )}
                        />

                    </div>

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
                    <CardItem/>
                    {/*<CardItem/>*/}
                </div>
            </div>
        </div>
    );
};

export default Post;
