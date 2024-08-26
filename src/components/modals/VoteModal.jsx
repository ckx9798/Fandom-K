import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ModalContainer from './ModalContainer';
import axios from 'axios';
import closeBtn from '../../assets/img/btn_delete_24px.svg';
import mobileArrow from '../../assets/icon/icj_arrow_left.svg';

// 투표하기 모달 (width값은 list 페이지가 모바일 규격이 됐을 때 받아서 반응형 스타일을 하기 위해서 필요합니다)
const VoteModal = ({ title = 'female', idolImgSrc, idolId, width = 481 }) => {
    const navigate = useNavigate();
    const [voteIdol, setVoteIdol] = useState('');

    // 모달창 닫는 함수
    const handleModalClose = () => {
        setModalClose((prev) => !prev);
    };

    // 투표할 아이돌 받는 함수
    const handleChangeVote = (e) => {
        const { value } = e.target;

        setVoteIdol(value);
  };

    // 투표하기 버튼 누르면 실행되는 함수 
    const handleVote = async (e) => {
        e.preventDefault();

        try {
            const currentCredit = parseInt(localStorage.getItem('credit'), 10) || 0;
            const adjustCredit = currentCredit - 1000;
            localStorage.setItem('credit', adjustCredit);

            const response = await axios.post(`https://fandom-k-api.vercel.app/9-4/votes`, {
                idolId,
            });

            if (response.status === 200) {
                alert('투표가 완료되었습니다.');
                navigate('/list');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('투표하기 모달 handleVote POST 요청에서 오류 발생', error);
            }
        }
    };

    return (
        <ModalContainer>
            <ContentsBox>
                <Title>
                    {width <= 480 && (
                        <button onClick={handleModalClose}>
                            <img src={mobileArrow} alt="닫기" />
                        </button>
                    )}
                    <h2>이달의 {title === 'female' ? '여자' : '남자'} 아이돌</h2>
                    {width > 480 && (
                        <button onClick={handleModalClose}>
                            <img src={closeBtn} alt="닫기" />
                        </button>
                    )}
                </Title>
                <VoteForm onSubmit={handleVote}>
                    {[1, 2, 3, 4, 5, 6].map((idol, i) => (
                        <FormWrapper key={i}>
                            <IdolVoteInfo>
                                <img src={idolImgSrc} alt="아이돌" />
                                <IdolNumber>{idol}</IdolNumber>
                                <CurrentVoteBox>
                                    <h3>뉴진스 민지 {idol}</h3>
                                    <span>204,000표</span>
                                </CurrentVoteBox>
                            </IdolVoteInfo>
                            <input type="radio" name="idol" value={idol} onChange={handleChangeVote} />
                        </FormWrapper>
                    ))}
                    <button type="submit">투표하기</button>
                    <CreditAlert>
                        투표하는 데 <span>1000 크레딧</span>이 소모됩니다.
                    </CreditAlert>
                </VoteForm>
            </ContentsBox>
        </ModalContainer>
    );
};

export default VoteModal;

const ContentsBox = styled.div`
    width: 525px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 24px 16px 32px 16px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

    @media (min-width: 375px) and (max-width: 767px) {
        width: 100vh;
        height: 100vh;
        background: linear-gradient(300deg, rgba(2, 0, 14, 1) 80%, rgba(20, 195, 254, 0.2) 100%);
    }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 477px;
    margin: auto;

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

    @media (min-width: 375px) and (max-width: 767px) {
        justify-content: center;
        position: relative;
        width: 327px;

        h2 {
            font-size: 14px;
            font-weight: 500;
            line-height: 16.71px;
        }

        button {
            position: absolute;
            left: 24px;
        }
    }
`;

const VoteForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 477px;
    margin: auto;

    @media (min-width: 375px) and (max-width: 767px) {
        width: 327px;
    }
`;

const FormWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    height: 70px;
    margin-bottom: 8px;
    padding-bottom: 15px;
`;

const IdolVoteInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    img {
        width: 60px;
        height: 60px;
        border-radius: 9999px;
        background: linear-gradient(var(--brand100), var(--brand200));
        outline: 1px solid var(--brand100);
        outline-offset: 4px;
        opacity: 50%;
    }
`;

const IdolNumber = styled.span`
    color: var(--brand100);
    font-size: 14px;
    line-height: 16.71px;
`;

const CurrentVoteBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    line-height: 16.71px;

    h3 {
        font-size: 14px;
        font-weight: 500;
        color: white;
    }

    span {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
    }
`;

const CreditAlert = styled.p`
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    line-height: 26px;
    color: white;

    span {
        color: var(--brand100);
    }
`;
