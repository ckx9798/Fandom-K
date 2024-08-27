import React from 'react';
import styled from 'styled-components';
import IdolProfile from './IdolProfile';
import deleteIcon from '../../../assets/icon/Icon-delete.svg';

const InterestedIdols = () => {
    const checked = 'checked';
    return (
        <IdolWrapper>
            <h2>내가 관심있는 아이돌</h2>
            <IdolCard>
                <IdolProfile idol={exp} checked={checked} />
                <DeleteButton src={deleteIcon} alt="Delete icon" />
            </IdolCard>
        </IdolWrapper>
    );
};

export default InterestedIdols;

const exp = {
    id: 904,
    name: '로제',
    gender: 'female',
    group: '블랙핑크',
    profilePicture: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720765415011/rose.png',
    totalVotes: 50,
    teamId: 23,
};

const IdolWrapper = styled.div`
    width: 1200px;
    margin: 0px auto;
    padding: 76px 0px 40px;
    border-bottom: 1px solid #ffffff1a;
`;

const IdolCard = styled.div`
    position: relative;
    display: inline-block;
`;

const DeleteButton = styled.img`
    width: 31.43px;
    height: 31.43px;
    position: absolute;
    top: 32px;
    right: 0px;
`;
