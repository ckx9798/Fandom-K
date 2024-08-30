import { useState } from 'react';

import deleteIcon from '../../../assets/icon/Icon-delete.svg';
import checkIcon from '../../../assets/icon/ic_check.svg';
import styled, { css } from 'styled-components';
const IdolProfile = ({ idol, selected = false, onDelete, onCheck }) => {
    const [checked, setChecked] = useState(false);

    const handleCheckClick = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        onCheck(idol, newChecked);
    };

    const handleDeleteClick = () => onDelete(idol.id);

    return (
        <IdolCard selected={selected} onClick={handleCheckClick}>
            <IdolImgContainer selected={selected} onClick={handleCheckClick} checked={checked}>
                <IdolImg src={idol.profilePicture} selected={selected} checked={checked} />
                {checked && !selected && (
                    <Overlay>
                        <CheckIcon src={checkIcon} alt="체크 아이콘" />
                    </Overlay>
                )}
            </IdolImgContainer>
            <IdolName>{idol.name}</IdolName>
            <IdolGroup>{idol.group}</IdolGroup>
            {selected && <DeleteButton onClick={handleDeleteClick} src={deleteIcon} alt="삭제버튼" />}
        </IdolCard>
    );
};

export default IdolProfile;

const IdolCard = styled.div`
    width: ${(props) => (props.selected === false ? '128px' : '100px')};
    height: ${(props) => (props.selected === false ? '183px' : '150px')};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 1px; //선이 가려지는 현상 방지
    cursor: ${(props) => (props.selected ? 'default' : 'pointer')};

    @media (max-width: 768px) {
        width: 98px;
        min-width: 98px;
        height: ${(props) => (props.selected === false ? '151px' : '121px')};
    }
`;

const IdolCardStyles = css`
    width: ${(props) => (props.selected === false ? '128px' : '100px')};
    height: ${(props) => (props.selected === false ? '128px' : '100px')};
    border-radius: 50%;

    @media (max-width: 768px) {
        width: ${(props) => (props.selected === false ? '98px' : '70px')};
        height: ${(props) => (props.selected === false ? '98px' : '70px')};
    }
`;

const IdolImg = styled.img`
    ${IdolCardStyles}
    padding: 7.15px;
    z-index: -1;
    object-fit: cover;

    @media (max-width: 768px) {
        padding: 5px;
    }
`;

const IdolImgContainer = styled.div`
    ${IdolCardStyles}
    display: inline-block;
    outline: 1.43px solid #f96868;
    position: relative;
`;

const Overlay = styled.div`
    position: absolute;
    top: 6.52px;
    left: 6.52px;
    width: 115px;
    height: 115px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    border-radius: 50%;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(271.36deg, #f96e68 -9.84%, #fe578f 107.18%);
        opacity: 0.5;
        z-index: -1;
        border-radius: 50%;
    }

    @media (max-width: 768px) {
        top: 5px;
        left: 5px;
        width: 88px;
        height: 88px;
    }
`;

const CheckIcon = styled.img`
    width: 52.27px;
    height: 52.27px;
    z-index: 1;
`;

const IdolName = styled.p`
    font-weight: 700;
    font-size: 16px;
    line-height: ${(props) => (props.selected === false ? '27.73px' : '26px')};
    color: #f4efef;
    margin: 8px 0 2px;
`;

const IdolGroup = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 16.71px;
    color: #ffffff99;
`;

const DeleteButton = styled.img`
    position: absolute;
    width: 31.43px;
    height: 31.43px;
    top: 1.43px;
    left: 70px;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 22px;
        height: 22px;
        top: 1px;
        left: 64px;
    }
`;
