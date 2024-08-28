import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { dDay } from '../../../utils/dDay';

const DonationItem = ({ item }) => {
    const ratio = Math.ceil((item.receivedDonations / item.targetDonation) * 100);
    return (
        <StyledCard $ratio={ratio}>
            <div className="imgBox">
                <img src={item.idol.profilePicture} alt="프로필 사진" />
                <div className="overlay" />
                <Button>후원하기</Button>
            </div>
            <p className="subtitle">{item.subtitle}</p>
            <p className="title">{item.title}</p>
            <div className="donation">
                <p className="received">
                    {item.receivedDonations?.toLocaleString('ko-KR')} / {item.targetDonation?.toLocaleString('ko-KR')}
                </p>
                <p className="dDay">{dDay(item.deadline)}</p>
            </div>
            <div className="percentage">
                <div className="ratio" />
            </div>
        </StyledCard>
    );
};

export default DonationItem;

const StyledCard = styled.div`
    .imgBox {
        position: relative;
        img {
            width: 282px;
            height: 293px;
            object-fit: cover;
        }
        .overlay {
            position: absolute;
            top: 0;
            width: 282px;
            height: 100%;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 58.9%, #000000 100%);
        }
        button {
            position: absolute;
            bottom: 24px;
            left: 24px;
        }
    }
    .subtitle {
        margin: 12px 0 0;
        font-size: 16px;
        color: var(--gray100);
    }
    .title {
        margin: 8px 0 0;
        font-size: 18px;
        font-weight: 500;
        color: var(--white200);
    }
    .donation {
        margin: 24px 0 0;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        .received {
            color: var(--brand100);
        }
        .dDay {
            color: var(--white200);
        }
    }
    .percentage {
        width: 100%;
        margin: 8px 0 0;
        height: 1px;
        background-color: #ffffff;
        .ratio {
            width: ${(props) => props.$ratio}%;
            height: 1px;
            background-color: var(--brand100);
        }
    }
`;
