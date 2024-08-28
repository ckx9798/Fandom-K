import { useState, useContext, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import IdolProfile from './IdolProfile';
import Button from '../../../components/Button';
import plusIcon from '../../../assets/icon/Icon-plus.svg';
import arrowIcon from '../../../assets/icon/Icon-arrow.svg';
import { MyStateContext } from '../MyPage';

const AddInterestedIdols = () => {
    const { datas, selectedDatas, setSelectedDatas } = useContext(MyStateContext);
    const [option, setOption] = useState('');
    const [checkedIdols, setCheckedIdols] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

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

    //성별 옵션을 선택하여 선택된 성별만 렌더링
    const sortedDatas = useMemo(() => {
        let filteredDatas = datas;

        if (option !== '') {
            filteredDatas = filteredDatas.filter((item) => item.gender === option);
        }

        return filteredDatas.filter((item) => !selectedDatas.some((selected) => selected.id === item.id));
    }, [datas, option, selectedDatas]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <ContentWrapper>
            <ContentTitle>
                <h2>관심 있는 아이돌을 추가해보세요.</h2>
                <ContentNav>
                    <GenderToggleButton onClick={handleChange} value="" isSelected={option === ''}>
                        전체 아이돌
                    </GenderToggleButton>
                    <GenderToggleButton onClick={handleChange} value="female" isSelected={option === 'female'}>
                        여자 아이돌
                    </GenderToggleButton>
                    <GenderToggleButton onClick={handleChange} value="male" isSelected={option === 'male'}>
                        남자 아이돌
                    </GenderToggleButton>
                </ContentNav>
            </ContentTitle>

            <CarouselPage>
                <CarouselButton onClick={handlePrevPage} disabled={currentPage === 0}>
                    <img src={arrowIcon} alt="이전" />
                </CarouselButton>
                <IdolList>
                    {sortedDatas.map((idol) => (
                        <IdolProfile key={idol.id} idol={idol} onCheck={handleCheck} />
                    ))}
                </IdolList>
                <CarouselButton onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
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
    flex-direction: column;
`;

const ContentNav = styled.div`
    width: 100%;
    height: 42px;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
`;

const GenderToggleButton = styled.button`
    flex: 1;
    text-align: center;
    background-color: ${(props) => (props.isSelected === false ? '#02000e' : '#ffffff1a')};
    padding: 12px;
    border: none;
    border-bottom: ${(props) => (props.isSelected === false ? 'none' : '1px solid #fff')};

    font-size: 14px;
    line-height: 18px;
    color: ${(props) => (props.isSelected === false ? '#828282' : '#fff')};
`;

const CarouselPage = styled.div`
    width: 1280px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

const IdolList = styled.div`
    display: grid;
    grid-template: 1fr 1fr / repeat(8, 1fr);
    gap: 24px;
    width: 1200px;
    height: 454px;
    overflow: hidden;
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
