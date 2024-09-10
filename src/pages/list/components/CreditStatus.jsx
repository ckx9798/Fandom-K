import { useState } from 'react';
import styled from 'styled-components';
import CreditCharge from '../../../components/modals/CreditCharge';
import useCredit from '../../../hooks/list/useCredit';
import creditImg from '../../../assets/icon/credit.svg';

const CreditStatus = () => {
    const [modalClose, setModalClose] = useState(true);
    const credit = useCredit();
  
    const handleChargeModal = () => {
        setModalClose((prev) => !prev);
    };
    
    return (
        <Container>
            <MyCreditBox>
                <h2>내 크레딧</h2>
                <MyCreditAmount>
                    <img src={creditImg} alt="크레딧" />
                    {credit !== 0 ? credit?.toLocaleString('ko-KR') : 0}
                </MyCreditAmount>
            </MyCreditBox>
            <ChargeBtn onClick={handleChargeModal}>충전하기</ChargeBtn>
            {!modalClose && <CreditCharge setModalClose={setModalClose} />}
        </Container>
    );
};

export default CreditStatus;

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    padding: 30px 80px;
    border: 1px solid rgba(241, 238, 249, 0.8);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 768px) and (max-width: 1279px) {
        padding: 30px 50px;
    }

    @media (min-width: 375px) and (max-width: 767px) {
        padding: 30px;
    }
`;

const MyCreditBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    h2 {
        color: rgba(255, 255, 255, 0.6);
        font-size: 16px;
        line-height: 19.09px;
    }
`;

const MyCreditAmount = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    color: rgba(255, 255, 255, 0.87);

    img {
        width: 16px;
        height: 16px;
    }
`;

const ChargeBtn = styled.button`
    background: none;
    border: none;
    color: var(--brand100);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1.5px;
    line-height: 26px;
`;
