import { useState, useContext, useMemo } from 'react';
import styled from 'styled-components';
import IdolProfile from './IdolProfile';
import Button from '../../../components/Button';
import plusIcon from '../../../assets/icon/Icon-plus.svg';
import arrowIcon from '../../../assets/icon/Icon-arrow.svg';
import { MyStateContext } from '../MyPage';

const AddInterestedIdols = () => {
    const { datas } = useContext(MyStateContext);
    const [option, setOption] = useState('');

    const handleChange = (e) => {
        setOption(e.target.value);
    };

    const sortedDatas = useMemo(() => {
        if (option === '') return datas;
        return datas.filter((item) => item.gender === option);
    }, [datas, option]);

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
                <CarouselButton>
                    <img src={arrowIcon} />
                </CarouselButton>
                <IdolList>
                    {sortedDatas.map((idol) => {
                        return <IdolProfile key={idol.id} idol={idol} checked={false} />;
                    })}
                </IdolList>
                <CarouselButton>
                    <RotatedIcon src={arrowIcon} />
                </CarouselButton>
            </CarouselPage>
            <Button width="255" height="48" radius="24">
                <ButtonInner>
                    <img src={plusIcon} />
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
`;

const RotatedIcon = styled.img`
    transform: scaleX(-1);
`;

// export const IdolLists = styled.div`
//     display: flex;
//     flex-direction: column;
//     width: 1200px;
// `;

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
