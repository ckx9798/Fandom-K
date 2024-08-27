import React, { useState } from 'react';
import styled from 'styled-components';
import deleteIcon from '../../../assets/icon/Icon-delete.svg';
import checkIcon from '../../../assets/icon/ic_check.svg';

const IdolProfile = ({ idol, selected = false, onDelete }) => {
    const [checked, setChecked] = useState(false);

    const handleDeleteClick = () => onDelete(idol.id);

    return (
        <IdolCard
            selected={selected}
            onClick={() => {
                setChecked(!checked);
                console.log(checked);
            }}
        >
            <IdolImgContainer selected={selected} checked={checked}>
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
    margin-top: 32px;
    position: relative;
    cursor: pointer;
`;

const IdolImg = styled.img`
    width: ${(props) => (props.selected === false ? '128px' : '100px')};
    height: ${(props) => (props.selected === false ? '128px' : '100px')};
    padding: 7.15px;
    border-radius: 50%;
    z-index: -1;
`;

const Overlay = styled.div`
    position: absolute;
    top: 6.52px;
    left: 6.52px;
    width: 115px;
    height: 115px;
    background: linear-gradient(271.36deg, #f96e68 -9.84%, #fe578f 107.18%);
    opacity: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    border-radius: 50%;
`;

const CheckIcon = styled.img`
    width: 52.27px;
    height: 52.27px;
`;

const IdolImgContainer = styled.div`
    width: ${(props) => (props.selected === false ? '128px' : '100px')};
    height: ${(props) => (props.selected === false ? '128px' : '100px')};
    display: inline-block;
    outline: 1.43px solid #f96868;
    border-radius: 50%;
    position: relative;
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
`;
