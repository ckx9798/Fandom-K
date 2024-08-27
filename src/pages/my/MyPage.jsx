import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import InterestedIdols from './components/InterestedIdols';
import AddInterestedIdols from './components/AddInterestedIdols';
import mockdata from './components/mockdata';

const MyPage = () => {
    const idoldatas = mockdata.list;
    const femaleIdols = [];
    const maleIdols = [];
    const seletedIdols = [];
    /* 임시로 만든 관심있는 아이돌 리스트 */
    for (let i = 0; i < 4; i++) {
        seletedIdols.push(idoldatas[i]);
    }

    idoldatas.forEach((idol) => {
        if (idol.gender === 'female') {
            femaleIdols.push(idol);
        } else if (idol.gender === 'male') {
            maleIdols.push(idol);
        }
    });

    return (
        <StyledMyPage>
            <Header />
            <InterestedIdols seletedIdols={seletedIdols} />
            <AddInterestedIdols femaleIdols={femaleIdols} maleIdols={maleIdols} />
        </StyledMyPage>
    );
};

export default MyPage;

const StyledMyPage = styled.div`
    h2 {
        color: #f6f6f8;
        font-weight: 700;
        font-size: 24px;
        line-height: 26px;
    }
`;
