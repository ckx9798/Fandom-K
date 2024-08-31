import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import IdolProfile from './idolProfile';
import { MyStateContext } from '../MyPage';

const InterestedIdols = () => {
    const { selectedDatas, setSelectedDatas } = useContext(MyStateContext);

    // 로컬스토리지에서 데이터를 불러오기
    useEffect(() => {
        const savedIdols = localStorage.getItem('selectedIdols');
        if (savedIdols) {
            setSelectedDatas(JSON.parse(savedIdols));
        }
    }, [setSelectedDatas]);

    // 데이터가 변경될 때마다 로컬스토리지에 저장하기
    useEffect(() => {
        localStorage.setItem('selectedIdols', JSON.stringify(selectedDatas));
    }, [selectedDatas]);

    const onDelete = (id) => {
        const nextIdols = selectedDatas.filter((idol) => idol.id !== id);
        setSelectedDatas(nextIdols);
    };

    return (
        <IdolWrapper>
            <h2>내가 관심있는 아이돌</h2>

            {selectedDatas.length > 0 ? (
                <InterestedIdolList>
                    {selectedDatas.map((idol) => {
                        return <IdolProfile key={idol.id} idol={idol} selected={true} onDelete={onDelete} />;
                    })}
                </InterestedIdolList>
            ) : (
                <EmptyMessage>관심있는 아이돌을 추가해주세요!😎</EmptyMessage>
            )}
        </IdolWrapper>
    );
};

export default InterestedIdols;

const IdolWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0px auto;
    padding: 76px 0px 40px;
    border-bottom: 1px solid #ffffff1a;

    @media (max-width: 1280px) {
        max-width: 584px;
    }
    @media (max-width: 768px) {
        max-width: 328px;
    }
`;

const InterestedIdolList = styled.div`
    display: flex;
    width: 100%;
    gap: 24px;
    margin-top: 32px;
    overflow-x: auto;
    overflow-y: hidden;
    align-items: center;

    /* 스크롤바 숨기기 */
    ::-webkit-scrollbar {
        display: none; /* 크롬, 사파리 */
    }

    -ms-overflow-style: none; /* 인터넷 익스플로러, 엣지 */
    scrollbar-width: none; /* 파이어폭스 */

    @media (max-width: 768px) {
        gap: 0;
        flex-wrap: nowrap;
    }
`;

const EmptyMessage = styled.p`
    margin: 52px 0 34px;
    font-size: 18px;
    color: #ffffff;
    text-align: center;
`;
