import { useState, useContext, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import IdolProfile from './IdolProfile';
import Button from '../../../components/Button';
import plusIcon from '../../../assets/icon/Icon-plus.svg';
import arrowIcon from '../../../assets/icon/Icon-arrow.svg';
import { MyStateContext } from '../MyPage';

const AddInterestedIdols = ({ cursor, isLoading, loadMore }) => {
    const { datas, selectedDatas, setSelectedDatas, checkedIdols, setCheckedIdols } = useContext(MyStateContext);
    const [option, setOption] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(16);

    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width <= 768) {
                setItemsPerPage(6);
            } else if (width <= 1280) {
                setItemsPerPage(8);
            } else {
                setItemsPerPage(16);
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, []);

    const handleChange = (e) => {
        setOption(e.target.value);
        setCurrentPage(0);
    };

    const handleAddClick = () => {
        setSelectedDatas([...selectedDatas, ...checkedIdols]);
        loadMore(checkedIdols.length);
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
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedDatas.slice(startIndex, endIndex);
    }, [sortedDatas, currentPage, itemsPerPage]);

    const handleNextPage = () => {
        if ((currentPage + 1) * itemsPerPage < sortedDatas.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const genderBtnArr = [
        { value: '', option: '', title: '전체 아이돌' },
        { value: 'female', option: 'female', title: '여자 아이돌' },
        { value: 'male', option: 'male', title: '남자 아이돌' },
    ];

    //모바일에서는 전체 데이터를 불러와야하기에 만듦.
    const getIdolList = () => {
        if (window.innerWidth <= 768) {
            return sortedDatas;
        }
        return paginatedDatas;
    };

    return (
        <ContentWrapper>
            <ContentTitle>
                <h2>관심 있는 아이돌을 추가해보세요.</h2>
                <ContentNav>
                    {genderBtnArr.map((gender) => (
                        <GenderToggleButton
                            key={gender.value}
                            onClick={handleChange}
                            value={gender.value}
                            selected={option === gender.option}
                        >
                            {gender.title}
                        </GenderToggleButton>
                    ))}
                </ContentNav>
            </ContentTitle>

            <CarouselPage>
                <CarouselButton onClick={handlePrevPage} disabled={isLoading || currentPage === 0}>
                    <img src={arrowIcon} alt="이전" />
                </CarouselButton>
                <IdolList>
                    {getIdolList().map((idol) => (
                        <IdolProfile
                            key={idol.id}
                            idol={idol}
                            onCheck={handleCheck}
                            checked={checkedIdols.some((checkedIdol) => checkedIdol.id === idol.id)}
                        />
                    ))}
                </IdolList>

                <CarouselButton
                    onClick={handleNextPage}
                    disabled={isLoading || (currentPage + 1) * itemsPerPage >= sortedDatas.length}
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

    @media (max-width: 1220px) {
        padding: 0 24px;
    }
`;

const ContentTitle = styled.div`
    width: 100%;
    max-width: 1200px;
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
    background-color: ${(props) => (props.selected === false ? '#02000e' : '#ffffff1a')};
    padding: 12px;
    border: none;
    border-bottom: ${(props) => (props.selected === false ? 'none' : '1px solid #fff')};

    font-size: 14px;
    line-height: 18px;
    color: ${(props) => (props.selected === false ? '#828282' : '#fff')};
`;

const CarouselPage = styled.div`
    width: 100%;
    max-width: 1280px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 22px;
    margin: 32px 0 48px;
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

    @media (max-width: 768px) {
        display: none;
    }
`;

const RotatedIcon = styled.img`
    transform: scaleX(-1);
`;

const IdolList = styled.div`
    display: grid;
    grid-template: 1fr 1fr / repeat(8, 1fr);
    gap: 24px;
    width: 100%;
    max-width: 1200px;
    place-items: center; /* 그리드 아이템을 셀의 중앙에 배치 */
    justify-content: center;

    margin: 0 auto;

    @media (max-width: 1280px) {
        grid-template-columns: repeat(4, 128px);
    }

    @media (max-width: 768px) {
        display: grid;
        grid-template-columns: repeat(3, 98px);
        grid-column-gap: 17px;
        overflow-x: scroll;
        overflow-y: hidden;
        width: 328px;
        height: 326px;
        justify-content: start;
        grid-auto-flow: column; // 열 방향으로 아이템 배치
    }

    /* 스크롤 바 숨기기 */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    /* Chrome, Safari, Opera */
    &::-webkit-scrollbar {
        display: none;
    }
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
