import React from 'react';
import styled from 'styled-components';
import IdolProfile from './IdolProfile';
import Button from '../../../components/Button';
import plusIcon from '../../../assets/icon/Icon-plus.svg';
import arrowIcon from '../../../assets/icon/Icon-arrow.svg';

const AddInterestedIdols = ({ femaleIdols, maleIdols }) => {
    return (
        <ContentWrapper>
            <ContentTitle>
                <h2>관심 있는 아이돌을 추가해보세요.</h2>
            </ContentTitle>
            <CarouselPage>
                <CarouselButton>
                    <img src={arrowIcon} />
                </CarouselButton>
                <IdolLists>
                    <IdolList>
                        {femaleIdols.map((idol) => {
                            return <IdolProfile key={idol.id} idol={idol} />;
                        })}
                    </IdolList>
                    <IdolList>
                        {maleIdols.map((idol) => {
                            return <IdolProfile key={idol.id} idol={idol} />;
                        })}
                    </IdolList>
                </IdolLists>
                <CarouselButton rotated>
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

const IdolLists = styled.div`
    display: flex;
    flex-direction: column;
    width: 1200px;
`;

const IdolList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;
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
