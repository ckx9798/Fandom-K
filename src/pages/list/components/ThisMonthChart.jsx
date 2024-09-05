import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button.jsx';
import IdolCard from './IdolCard.jsx';
import GenderToggleButton from './GenderToggleButton.jsx';
import VoteModal from '../../../components/modals/VoteModal.jsx';
import { getCharts } from '../../../api/charts.js';
import useDataNum from '../../../hooks/useDataNum.jsx';
import RefreshButton from '../../my/components/RefreshButton.jsx';
import chartImg from '../../../assets/image/Chart.svg';

const ThisMonthChart = () => {
    const [IdolData, setIdolData] = useState([]);
    const [IdolGender, setIdolGender] = useState('female');
    const IdolDataNum = useDataNum({ mobile: 5, tablet: 5, desktop: 10 });
    const [cursor, setCusor] = useState(null);
    const [error, setError] = useState(false);

    // 반응형 디자인
    // useDataNum({ IdolDataNum });
    // useEffect(() => {
    //     const handleResize = () => {
    //         if (window.innerWidth <= 1280) {
    //             setIdolDataNum(5);
    //         } else {
    //             setIdolDataNum(10);
    //         }
    //     };
    //     handleResize();
    //     window.addEventListener('resize', handleResize);
    // });

    // refresh가 있으면, IdolData 초기화
    const loadIdolData = async (refresh) => {
        try {
            const response = await getCharts({
                gender: IdolGender,
                cursor: refresh ? null : cursor,
                pageSize: IdolDataNum,
            });
            if (refresh) {
                setIdolData(response.idols);
            } else {
                setIdolData((prevData) => [...prevData, ...response.idols]);
            }
            setCusor(response.nextCursor);
            setError(false);
        } catch (error) {
            setError(true);
        }
    };

    // IdolData 적용
    useEffect(() => {
        loadIdolData(true);
    }, [IdolGender, IdolDataNum]);

    // 버튼으로 성별 바꾸기
    const changeGender = (e) => {
        setIdolGender(e.target.value);
    };
    // 투표하기 모달창 열기
    const [isOpen, setIsOpen] = useState(false);
    const ViewVoteModalHandler = () => {
        setIsOpen(!isOpen);
    };

    // 더보기 버튼 제거
    const ShowMoreBtn = () => {
        if (cursor) {
            return <ChartMoreBtn onClick={() => loadIdolData()}>더 보기</ChartMoreBtn>;
        } else {
            return <ChartMoreBtn className="inactive"> 보기</ChartMoreBtn>;
        }
    };

    return (
        <ChartContainer>
            <ChartHeader>
                <ChartHeaderTitle>이달의 차트</ChartHeaderTitle>
                <Button width="128" height="32" radius="3" onClick={ViewVoteModalHandler}>
                    {isOpen === true ? <VoteModal title={IdolGender} setModalClose={setIsOpen} /> : null}
                    <ChartVote>
                        <img src={chartImg} alt="차트이미지" />
                        <span> 차트 투표하기 </span>
                    </ChartVote>
                </Button>
            </ChartHeader>
            <ChartThisMonth>
                <GenderToggleButton
                    value="female"
                    currentGender={IdolGender}
                    onChange={changeGender}
                    label="이달의 여자 아이돌"
                />
                <GenderToggleButton
                    value="male"
                    currentGender={IdolGender}
                    onChange={changeGender}
                    label="이달의 남자 아이돌"
                />
            </ChartThisMonth>
            <ChartRankContainer>
                {IdolData.map((item, i) => (
                    <IdolCard key={item.id} item={item} rank={i + 1} />
                ))}
            </ChartRankContainer>
            <ShowMoreBtn />
            {error && <RefreshButton onRetry={loadIdolData} />}
        </ChartContainer>
    );
};

export default ThisMonthChart;

const ChartContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 150px;
    @media (max-width: 1280px) {
        width: 95%;
    }
`;
const ChartHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    Button {
        display: flex;
        align-items: center;
        gap: 3px;
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

const ChartVote = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 7px;
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
        background-color: inherit;
        color: var(--gray200);
    }
`;
const ChartRankContainer = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 25px;

    @media (max-width: 1280px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const ChartMoreBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 326px;
    height: 42px;
    margin-top: 40px;
    color: #ffffff;
    background-color: #ffffff1a;
    border: 1px solid rgba(241, 238, 249, 0.8);
    border-radius: 6px;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;

    &.inactive {
        display: none;
    }
`;
