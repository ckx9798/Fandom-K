import React from 'react';
import styled from 'styled-components';

const IdolProfile = ({ idol, checked = null }) => {
    return (
        <IdolCard checked={checked}>
            <IdolImgContainer checked={checked}>
                <IdolImg src={idol.profilePicture} checked={checked} />
            </IdolImgContainer>
            <IdolName checked={checked}>{idol.name}</IdolName>
            <IdolGroup>{idol.group}</IdolGroup>
        </IdolCard>
    );
};

export default IdolProfile;

const IdolCard = styled.div`
    width: ${(props) => (props.checked === null ? '128' : '100')}px;
    height: ${(props) => (props.checked === null ? '183' : '150')}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 32px;
`;
const IdolImg = styled.img`
    width: ${(props) => (props.checked === null ? '128' : '100')}px;
    height: ${(props) => (props.checked === null ? '128' : '100')}px;
    padding: ${(props) => (props.checked === null ? '6.5' : '7.15')}px;
    background-color: #02000e;
    border-radius: 50%;
`;

const IdolImgContainer = styled.div`
    width: ${(props) => (props.checked === null ? '128' : '100')}px;
    height: ${(props) => (props.checked === null ? '128' : '100')}px;
    display: inline-block;
    outline: 1.43px solid #f96868;
    border-radius: 50%;
`;

const IdolName = styled.p`
    font-weight: 700;
    font-size: 16px;
    line-height: ${(props) => (props.checked === null ? '27.73' : '26')}px;
    color: #f4efef;
    margin: 8px 0 2px;
`;

const IdolGroup = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 16.71px;
    color: #ffffff99;
`;
