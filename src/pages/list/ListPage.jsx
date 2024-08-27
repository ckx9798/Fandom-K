import React, { useEffect, useState } from 'react';
import Data from './data.js';
import qwe from '../../assets/image/ListPage-vote.png';
import styled from 'styled-components';
import Button from '../../components/Button.jsx';
import IdolCard from './IdolCard.jsX';
import axios from 'axios';

const ChartContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
    background-color: #02000e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const ChartHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    Button {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 13px;
        padding: 2px 10px;
    }
`;
const ChartHeaderTitle = styled.div`
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    color: #ffffff;
    line-height: 26px;
`;

const ChartThisMonth = styled.div`
    width: 100%;
    margin: 20px 0;

    button {
        width: 50%;
        height: 42px;
        padding: 12px;
        color: #ffffff;
        background-color: #ffffff1a;
        border: none;
        border-bottom: 1px solid #ffffff;
    }

    .inactive {
        width: 50%;
        height: 42px;
        padding: 12px;
        color: #828282;
        background-color: inherit;
        border: none;
    }
`;
const ChartRankContainer = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 25px;
`;

const ChartMoreBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 326px;
    height: 42px;
    margin-top: 20px;
    color: #ffffff;
    background-color: #ffffff1a;
    border: 1px solid rgba(241, 238, 249, 0.8);
    border-radius: 6px;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
`;

const ListPage = () => {
    return (
        <ChartContainer>
            <ChartHeader>
                <ChartHeaderTitle>이달의 차트</ChartHeaderTitle>
                <Button width="128" height="32" border-radius="3">
                    <img src={qwe} />
                    <span> 차트 투표하기 </span>
                </Button>
            </ChartHeader>
            <ChartThisMonth>
                <button>이달의 여자 아이돌</button>
                <button className="inactive">이달의 남자 아이돌</button>
            </ChartThisMonth>
            <ChartRankContainer>
                {Data.list.map((item, i) => {
                    return <IdolCard item={item} rank={i + 1} />;
                })}
            </ChartRankContainer>

            <ChartMoreBtn>더 보기</ChartMoreBtn>
        </ChartContainer>
    );
};

export default ListPage;
