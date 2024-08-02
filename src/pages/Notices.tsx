import React from 'react';
import styles from './Notices.module.css';
import Header from "../components/layout/Header.tsx";
import {Collapse, CollapseProps} from 'antd';

const Notices: React.FC = () => {

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: '번게더 v1.0 출시 안내 (24/08/04)',
            children: <>
                <p>안녕하세요, 번게더 팀입니다.</p> <br/>
                <p>저희는 기쁜 마음으로 번게더의 최초 버전인 v1.0을 2024년 8월 4일 공식적으로 배포하게 되었음을 알려드립니다. 번게더를 통해 더욱 편리한 모임 관리와 소통을 경험하시길
                    바랍니다.</p><br/>
                <p>앞으로도 많은 관심과 피드백 부탁드립니다.</p><br/>
                <p>감사합니다.</p><br/>
                <p>번게더 드림</p>
            </>
        }
    ];



    return (
        <>
            <div className={styles.headerContainer}>
                <Header title='공지사항' showLeft='yes' showRight='no' />
            </div>
            <div className={styles.noticesContainer}>
                <Collapse accordion items={items.reverse()} />
            </div>



        </>
    );
};

export default Notices;
