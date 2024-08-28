import { useEffect, useState } from 'react';
import ModalContainer from './ModalContainer';
import styled from 'styled-components';
import Button from '../Button';
import { ContentsBoxStyle, DisabledBtn, NumberInput, TitleStyle } from '../../styles/Modal';
import closeBtn from '../../assets/image/btn_delete_24px.svg';
import creditImg from '../../assets/icon/credit.svg';

// 크레딧 충전 모달창
const CreditCharge = ({ setModalClose }) => {
    const creditArr = [{ total: 100 }, { total: 500 }, { total: 1000 }];

    const [chargeAmount, setChargeAmount] = useState(0);
    const [customCharge, setCustomCharge] = useState('');
    const [error, setError] = useState(false);
    
    // 모달창 닫는 함수
    const handleModalClose = () => {
        setModalClose((prev) => !prev);
    };

    // 사용자가 선택한 버튼 감지 및 값 할당함수
    const handleChangeRadio = (e) => {
        const { value } = e.target;

        setChargeAmount(Number(value));
        setCustomCharge('');
    };

    // 사용자가 직접 입력한 값 감지 및 할당함수
    const handleCustomCharge = (e) => {
        const { value } = e.target;

        setCustomCharge(Number(value));
        setChargeAmount(0);
    };

    // 충전하기 버튼 누르면 실행되는 함수
    const handleCharge = (e) => {
        e.preventDefault();

        const currentCredit = parseInt(localStorage.getItem('credit'), 10) || 0;
        let totalCredit = 0;

        if (chargeAmount > 0) {
            totalCredit = currentCredit + chargeAmount;
        } else {
            totalCredit = currentCredit + customCharge;
        }

        localStorage.setItem('credit', totalCredit);

        setChargeAmount(0);
        setCustomCharge('');
        setModalClose((prev) => !prev);
    };

    // 에러상태 변경
    useEffect(() => {
        if (chargeAmount === 0 && customCharge === '') {
            setError(true);
        } else {
            setError(false);
        }
    }, [chargeAmount, customCharge]);

    return (
        <ModalContainer>
            <ContentsBox>
                <TitleStyle>
                    <h2>크레딧 충전하기</h2>
                    <button onClick={handleModalClose}>
                        <img src={closeBtn} alt="닫기" />
                    </button>
                </TitleStyle>
                <CreditForm onSubmit={handleCharge}>
                    {creditArr.map((credit) => (
                        <Credit key={credit.total} selected={chargeAmount === credit.total}>
                            <CreditRadioBox>
                                <img src={creditImg} alt="크레딧" />
                                <CreditAmount selected={chargeAmount === credit.total}>{credit.total}</CreditAmount>
                            </CreditRadioBox>
                            <input
                                type="radio"
                                name="credit"
                                value={credit.total}
                                onChange={handleChangeRadio}
                                checked={chargeAmount === credit.total}
                            />
                        </Credit>
                    ))}
                    <CustomChargeInput
                        type="number"
                        name="customCredit"
                        value={customCharge}
                        onChange={handleCustomCharge}
                        placeholder="충전할 금액 입력"
                    />
                    <ChargeBtn type="submit" width="100%" disabled={error}>
                        <img src={creditImg} alt="크레딧" />
                        충전하기
                    </ChargeBtn>
                </CreditForm>
            </ContentsBox>
        </ModalContainer>
    );
};

export default CreditCharge;

const ContentsBox = styled(ContentsBoxStyle)`
    width: 327px;
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

const ChargeBtn = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-top: 10px;

    &:disabled {
        ${DisabledBtn}
    }
`;

const CustomChargeInput = styled(NumberInput)`
    background: none;
    border: 1px solid var(--white200);
    border-radius: 8px;
    padding: 16px;
    color: white;
    font-size: 16px;
    outline: none;

    &::placeholder {
        font-family: inherit;
    }

    &:focus {
        border: 1px solid var(--brand100);
    }
`;
