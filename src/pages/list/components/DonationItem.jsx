import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { dDay } from '../../../utils/dDay';
import SupportModal from '../../../components/modals/SupportModal';
import creditImg from '../../../assets/icon/credit.svg';

const DonationItem = forwardRef(({ item, pageSize }, ref) => {
    const [modalClose, setModalClose] = useState(false);
    const ratio = Math.floor((item.receivedDonations / item.targetDonation) * 100);

    const handleChargeModal = () => {
        setModalClose((prev) => !prev);
    };

    return (
        <StyledCard $ratio={ratio} ref={ref}>
            <div className="imgBox">
                <img src={item.idol.profilePicture} alt="프로필 사진" />
                <div className="overlay" />
                {pageSize !== 'mobile' ? (
                    <Button onClick={handleChargeModal}>후원하기</Button>
                ) : (
                    <Button width={142} height={31} onClick={handleChargeModal}>
                        후원하기
                    </Button>
                )}
            </div>
            <p className="subtitle">{item.subtitle}</p>
            <p className="title">{item.title}</p>
            <div className="donation">
                <p className="received">
                    <img src={creditImg} alt="크레딧" />
                    {item.receivedDonations?.toLocaleString('ko-KR')} / {item.targetDonation?.toLocaleString('ko-KR')}
                </p>
                <p className="dDay">{dDay(item.deadline)}</p>
            </div>
            <div className="percentage">
                <div className="ratio" />
            </div>
            {modalClose && <SupportModal item={item} setModalClose={setModalClose} />}
        </StyledCard>
    );
});

export default DonationItem;

const StyledCard = styled.div`
    .imgBox {
        position: relative;
        img {
            width: 282px;
            height: 293px;
            object-fit: cover;
            border-radius: 8px;
        }
        .overlay {
            position: absolute;
            top: 0;
            width: 282px;
            height: 293px;
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
            img {
                height: 16px;
                float: left;
            }
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
            width: ${(props) => (props.$ratio > 100 ? 100 : props.$ratio)}%;
            height: 1px;
            background-color: var(--brand100);
        }
    }
    @media (max-width: 767px) {
        .imgBox {
            img {
                width: 158px;
                height: 206px;
            }
            .overlay {
                width: 158px;
                height: 206px;
            }
            button {
                bottom: 8px;
                left: 8px;
            }
        }
        .subtitle {
            margin: 10px 0 0;
            font-size: 12px;
        }
        .title {
            margin: 6px 0 0;
            font-size: 14px;
            font-weight: 500;
        }
        .donation {
            margin: 20px 0 0;
            font-size: 12px;
        }
    }
`;
