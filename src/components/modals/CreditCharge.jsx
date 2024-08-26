import { useState } from 'react';
import ModalContainer from './ModalContainer';
import styled from 'styled-components';
import closeBtn from '../../assets/img/btn_delete_24px.svg';
import creditImg from '../../assets/icon/credit.svg';

// 크레딧 충전 모달창
const CreditCharge = ({ setModalClose }) => {
    const creditArr = [{ total: 100 }, { total: 500 }, { total: 1000 }];

    const [chargeAmount, setChargeAmount] = useState(0);

    // 모달창 닫는 함수
    const handleModalClose = () => {
        setModalClose((prev) => !prev);
    };

    // 사용자가 선택한 버튼 감지 및 값 할당함수
    const handleChangeRadio = (e) => {
        const { value } = e.target;
        
        setChargeAmount(Number(value));
    };

    // 충전하기 버튼 누르면 실행되는 함수
    const handleCharge = (e) => {
        e.preventDefault();

        const currentCredit = parseInt(localStorage.getItem('credit'), 10) || 0;

        const totalCredit = currentCredit + chargeAmount;
        localStorage.setItem('credit', totalCredit);

        setChargeAmount(0);
    };

    return (
        <ModalContainer>
            <ContentsBox>
                <Title>
                    <h2>크레딧 충전하기</h2>
                    <button onClick={handleModalClose}>
                        <img src={closeBtn} alt="닫기" />
                    </button>
                </Title>
                <CreditForm onSubmit={handleCharge}>
                    {creditArr.map((credit) => (
                        <Credit key={credit.total} selected={chargeAmount === credit.total}>
                            <CreditRadioBox>
                                <img src={creditImg} alt="크레딧" />
                                <CreditAmount selected={chargeAmount === credit.total}>
                                    {credit.total}
                                </CreditAmount>
                            </CreditRadioBox>
                            <input type="radio" name="credit" value={credit.total} onChange={handleChangeRadio} />
                        </Credit>
                    ))}
                    <ChargeBtn type="submit">충전하기</ChargeBtn>
                </CreditForm>
            </ContentsBox>
        </ModalContainer>
    );
};

export default CreditCharge;

const ContentsBox = styled.div`
    width: 327px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 24px 16px 32px 16px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    h2 {
        font-size: 18px;
        font-weight: 600;
        line-height: 21.48px;
        color: var(--white200);
    }

    button {
        background: none;
        border: none;
        padding: 0;
    }
`;

const CreditForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Credit = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${({ selected }) => (selected ? 'var(--brand100)' : 'var(--white200)')};
    border-radius: 8px;
    padding: 12px;
`;

const CreditRadioBox = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const CreditAmount = styled.span`
    color: ${({ selected }) => (selected ? 'white' : 'var(--gray200)')};
`;

const ChargeBtn = styled.button`
    margin-top: 10px;
`;
