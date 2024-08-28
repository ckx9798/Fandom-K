import { useState, useContext, useMemo } from 'react';
import styled from 'styled-components';
import IdolProfile from './IdolProfile';
import Button from '../../../components/Button';
import plusIcon from '../../../assets/icon/Icon-plus.svg';
import arrowIcon from '../../../assets/icon/Icon-arrow.svg';
import { MyStateContext } from '../MyPage';

const ITEMS_PER_PAGE = 16; // 페이지당 표시할 아이템 수

const AddInterestedIdols = () => {
    const { datas, selectedDatas, setSelectedDatas } = useContext(MyStateContext);
    const [option, setOption] = useState('');
    const [checkedIdols, setCheckedIdols] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

    const handleChange = (e) => {
        setOption(e.target.value);
        setCurrentPage(0); // 필터 변경 시 첫 페이지로 이동
    };

    const handleAddClick = () => {
        setSelectedDatas([...selectedDatas, ...checkedIdols]);
        setCheckedIdols([]);
    };

    const handleCheck = (idol, checked) => {
        if (checked) {
            setCheckedIdols([...checkedIdols, idol]);
        } else {
            setCheckedIdols(checkedIdols.filter((checkedIdol) => checkedIdol.id !== idol.id));
        }
    };

    const sortedDatas = useMemo(() => {
        let filteredDatas = datas;

        // 선택된 옵션에 따른 필터링
        if (option !== '') {
            filteredDatas = filteredDatas.filter((item) => item.gender === option);
        }

        // selectedDatas에 포함되지 않은 데이터만 필터링
        return filteredDatas.filter((item) => !selectedDatas.some((selected) => selected.id === item.id));
    }, [datas, option, selectedDatas]);

    // 페이지네이션된 데이터 계산
    const paginatedDatas = useMemo(() => {
        const startIndex = currentPage * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return sortedDatas.slice(startIndex, endIndex);
    }, [sortedDatas, currentPage]);

    const handleNextPage = () => {
        if ((currentPage + 1) * ITEMS_PER_PAGE < sortedDatas.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <ContentWrapper>
            <ContentTitle>
                <h2>관심 있는 아이돌을 추가해보세요.</h2>
                <select onChange={handleChange} value={option}>
                    <option value="">전체</option>
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                </select>
            </ContentTitle>
            <CarouselPage>
                <CarouselButton onClick={handlePrevPage} disabled={currentPage === 0}>
                    <img src={arrowIcon} alt="이전" />
                </CarouselButton>
                <IdolList>
                    {paginatedDatas.map((idol) => (
                        <IdolProfile key={idol.id} idol={idol} onCheck={handleCheck} />
                    ))}
                </IdolList>
                <CarouselButton
                    onClick={handleNextPage}
                    disabled={(currentPage + 1) * ITEMS_PER_PAGE >= sortedDatas.length}
                >
                    <RotatedIcon src={arrowIcon} alt="다음" />
                </CarouselButton>
            </CarouselPage>
            <Button onClick={handleAddClick} width="255" height="48" radius="24">
                <ButtonInner>
                    <img src={plusIcon} alt="추가" />
                    <span>추가하기</span>
                </ButtonInner>
            </Button>
        </ContentWrapper>
    );
};

export default AddInterestedIdols;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 81px;
`;

const ContentTitle = styled.div`
    width: 1200px;
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    select {
        font-size: 16px;
        font-weight: 700;
        padding: 10px 20px;
        border-radius: 8px;
    }
`;

const CarouselPage = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 32px;
    margin-bottom: 48px;
`;

const CarouselButton = styled.button`
    width: 29px;
    height: 135px;
    border-radius: 4px;
    border: none;
    background-color: #1b1b1bcc;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const RotatedIcon = styled.img`
    transform: scaleX(-1);
`;

export const IdolLists = styled.div`
    display: flex;
    flex-direction: column;
    width: 1200px;
`;

export const IdolList = styled.div`
    display: grid;
    grid-template: 1fr 1fr / repeat(8, 1fr);
    gap: 24px;
`;

const ButtonInner = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 26px;
    gap: 8px;

    img {
        width: 24px;
        height: 24px;
    }
`;
