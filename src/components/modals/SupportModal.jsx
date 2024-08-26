import { useEffect, useState } from 'react';
import { putContribute } from '../../api/donations';
import styled from 'styled-components';
import axios from 'axios';
import ModalContainer from './ModalContainer';
import Button from '../Button';
import closeBtn from '../../assets/image/btn_delete_24px.svg';
import creditImg from '../../assets/icon/credit.svg';

// 후원하기 모달창 (list 페이지에서 donations 자료를 넘겨주어야 합니다.)
const SupportModal = ({ idolId, idolImgSrc, title, subTitle, setModalClose }) => {
    const [userDonation, setUserDonation] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const currentCredit = parseInt(localStorage.getItem('credit'), 10);
    const isDisabled = userDonation > currentCredit;

    // error 상태 표출여부 결정
    useEffect(() => {
        if (isDisabled) {
            setError(true);
        } else {
            setError(false);
        }
    }, [isDisabled]);

    // 모달창 닫는 함수
    const handleModalClose = () => {
        setModalClose((prev) => !prev);
    };

    // 후원금 입력받는 함수
    const handleUserDonation = (e) => {
        const { value } = e.target;

        setUserDonation(value);
    };

    // 후원하기 버튼누르면 실행되는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await putContribute(idolId, userDonation);
            
            if (response) {
                localStorage.setItem('credit', currentCredit - userDonation);
                setUserDonation('');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('후원하기 모달 handleSubmit PUT 요청에서 오류 발생', error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalContainer>
            <ContentsBox>
                <Title>
                    <h2>후원하기</h2>
                    <button onClick={handleModalClose}>
                        <img src={closeBtn} alt="닫기" />
                    </button>
                </Title>
                <IdolBox>
                    <IdolImg src={idolImgSrc} alt="아이돌 이미지" />
                    <DonationTitleBox>
                        <h3>{title}</h3>
                        <p>{subTitle}</p>
                    </DonationTitleBox>
                </IdolBox>
                <DonationForm onSubmit={handleSubmit}>
                    <InputContainer>
                        <InputBox>
                            <input
                                type="number"
                                name="donation"
                                value={userDonation}
                                onChange={handleUserDonation}
                                placeholder="크레딧 입력"
                            />
                            <img src={creditImg} alt="크레딧" />
                        </InputBox>
                        {error && <p>갖고 있는 크레딧보다 더 많이 후원할 수 없어요</p>}
                    </InputContainer>
                    <DonationBtn type="submit" disabled={isDisabled || userDonation === ''} width="295">
                        {isLoading ? '잠시만 기다리세요.' : '후원하기'}
                    </DonationBtn>
                </DonationForm>
            </ContentsBox>
        </ModalContainer>
    );
};

export default SupportModal;

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

const IdolBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: auto;
`;

const IdolImg = styled.img`
    width: 158px;
    height: 206px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 40px 0 rgba(255, 255, 255, 0.1);
`;

const DonationTitleBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    h3 {
        font-size: 12px;
        line-height: 18px;
        letter-spacing: -0.17px;
        color: white;
        opacity: 40%;
    }

    p {
        font-size: 14px;
        font-weight: 500;
        line-height: 16.71px;
        color: var(--white200);
    }
`;

const DonationForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const InputBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid white;
    border-radius: 8px;
    background-color: #272f3d;

    input {
        background: none;
        border: none;
        width: 100%;
        outline: none;
        padding: 0;
        font-size: 20px;
        font-weight: 700;
        line-height: 26px;
        color: white;
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &::placeholder {
            color: var(--gray100);
        }
    }
`;

const DonationBtn = styled(Button)`
    &:disabled {
        cursor: default;
        background: none;
        background-color: var(--gray200);

        &:hover {
            opacity: 1;
        }
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    p {
        font-size: 12px;
        line-height: 14.32px;
        color: #ff2626;
    }
`;
