import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Button from '../../components/Button';
import InterestedIdols from './components/InterestedIdols';
import AddInterestedIdols from './components/AddInterestedIdols';
import IdolProfile from './components/IdolProfile';
import mockdata from './components/mockdata';
import plusIcon from '../../assets/icon/Icon-plus.svg';
import arrowIcon from '../../assets/icon/Icon-arrow.svg';

const MyPage = () => {
    const idoldatas = mockdata.list;
    const femaleIdols = [];
    const maleIdols = [];
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
            <InterestedIdols />
            <AddInterestedIdols />
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

const InterestedIdolsList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
`;

const AddInterestedIdols = styled.div`
    width: 100%;
    height: 673px;
    margin: 0 auto;
`;

const IdolContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const CarouselButon = styled.button`
    width: 29px;
    height: 135px;
    border-radius: 4px;
    border: none;
    background-color: #1b1b1bcc;
    color: #fff;
`;
