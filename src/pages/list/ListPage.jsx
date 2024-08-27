import React from 'react';
import './list.css';
import Data from './data.js';
import qwe from '../../assets/image/ListPage-vote.png';
import styled from 'styled-components';

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
`;
const ChartHeaderTitle = styled.div`
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    color: #ffffff;
`;
const ChartHeaderBtnText = styled.span`
    width: 128px;
    height: 32px;
    background-color: pink;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    border-radius: 3px;
    padding: 8px 120px 8px 120px;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
`;
const ListPage = () => {
    return (
        <ChartContainer>
            <ChartHeader>
                <ChartHeaderTitle>이달의 차트</ChartHeaderTitle>
                <button className="vote">
                    <img src={qwe} />
                    <ChartHeaderBtnText> 차트 투표하기 </ChartHeaderBtnText>
                </button>
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

const IdolCardBox = styled.div`
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;
const IdolCardProfile = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 10px 0;
`;
const IdolCardProfileImg = styled.div`
    width: 70px;
    height: 70px;
    border: 1px solid #f96d69;
    border-radius: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
`;
const IdolCardRank = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: #f96d69;
`;
const IdolCardName = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.87);
`;
const IdolCardVotes = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
`;
function IdolCard({ item, rank }) {
    return (
        <IdolCardBox>
            <IdolCardProfile>
                <IdolCardProfileImg>
                    <img src={item.profilePicture} alt="프로필이미지" />
                </IdolCardProfileImg>
                <IdolCardRank> {rank} </IdolCardRank>
                <IdolCardName> {item.name} </IdolCardName>
            </IdolCardProfile>
            <IdolCardVotes>{item.totalVotes.toLocaleString()} 표</IdolCardVotes>
        </IdolCardBox>
    );
}

export default ListPage;
