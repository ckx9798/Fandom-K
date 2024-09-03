import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ModalContainer from './ModalContainer';
import Button from '../Button';
import AlarmModal from './AlarmModal';
import { postVotes } from '../../api/votes';
import { ContentsBoxStyle, DisabledBtn, TitleStyle } from './ModalGlobalStyle';
import CustomRadio from './CustomRadio';
import { getCharts } from '../../api/charts';
import { ErrorBoundary } from 'react-error-boundary';
import useCredit from '../../hooks/list/useCredit';
import closeBtn from '../../assets/image/btn_delete_24px.svg';
import mobileArrow from '../../assets/icon/icj_arrow_left.svg';
import check from '../../assets/icon/ic_check.svg';

// 투표하기 모달 (setModalClose 파라미터는 부모 컴포넌트로부터 받은 함수로, 투표하기 모달을 닫는 용도입니다.)
const VoteModal = ({ title = 'female', setModalClose }) => {
    const [voteIdol, setVoteIdol] = useState(0);
    const [alertModalClose, setAlertModalClose] = useState(true);
    const [modalTitle, setModalTitle] = useState('');
    const [idolList, setIdolList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [credit, setCredit] = useCredit();

    // 성별에 따른 전체 데이터 가져오는 함수
    useEffect(() => {
        const getIdolList = async () => {
            try {
                setLoading(true);
                const response = await getCharts({ gender: title, cursor: null, pageSize: 50 });

                if (response) {
                    setIdolList(response.idols);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('투표하기 모달 getIdolList GET 요청에서 오류 발생', error);
                    setModalTitle('alert');
                    setAlertModalClose(false);
                } else {
                  setModalTitle('server');
                  setAlertModalClose(false);
                }
            } finally {
                setLoading(false);
            }
        };

        getIdolList();
    }, []);

    // 투표수가 많은 순으로 정렬, 투표수가 같으면 id순으로 설정해서 순위가 뒤집어지지 않도록 했습니다.
    const sortIdol = idolList?.sort((a, b) => {
        if (b.totalVotes !== a.totalVotes) {
            return b.totalVotes - a.totalVotes;
        } else {
            return a.id - b.id;
        }
    });

    const isDisabled = voteIdol === 0;

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
            if (credit < 1000) {
                setModalTitle('credit');
                setAlertModalClose(false);
                return;
            }

            const response = await postVotes(voteIdol);

            if (response) {
                const adjustCredit = credit - 1000;
                localStorage.setItem('credit', adjustCredit);
                setCredit(adjustCredit);

                setModalTitle('vote');
                setAlertModalClose(false);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('투표하기 모달 handleVote POST 요청에서 오류 발생', error);

                setModalTitle('alert');
                setAlertModalClose(false);
            } else {
              // axios 에러가 아닌 다른 에러일 때 에러처리
              setModalTitle('server');
              setAlertModalClose(false);
              throw error;
            }
        }
    };

    return (
        <ErrorBoundary
            fallback={
                !alertModalClose && <AlarmModal setAlertModalClose={setAlertModalClose} setModalClose={setModalClose} title="server" />
            }
        >
            <ModalContainer handleModalClose={handleModalClose}>
                <ContentsBox>
                    <Title>
                        <MobileCloseBtn onClick={handleModalClose}>
                            <img src={mobileArrow} alt="닫기" />
                        </MobileCloseBtn>
                        <h2>이달의 {title === 'female' ? '여자' : '남자'} 아이돌</h2>
                        <CloseBtn onClick={handleModalClose}>
                            <img src={closeBtn} alt="닫기" />
                        </CloseBtn>
                    </Title>
                    <VoteForm onSubmit={handleVote}>
                        {!isLoading ? (
                            sortIdol?.length > 0 ? (
                                sortIdol.map((idol, i) => (
                                    <FormWrapper key={idol.id}>
                                        <IdolVoteInfo>
                                            <ImgBox>
                                                <IdolImg
                                                    src={idol.profilePicture}
                                                    alt="아이돌"
                                                    selected={Number(voteIdol) === idol.id}
                                                />
                                                <CheckIcon
                                                    src={check}
                                                    alt="체크 표시"
                                                    selected={Number(voteIdol) === idol.id}
                                                />
                                                <CheckBackground selected={Number(voteIdol) === idol.id} />
                                            </ImgBox>
                                            <IdolNumber>{i + 1}</IdolNumber>
                                            <CurrentVoteBox>
                                                <h3>
                                                    {idol.group} {idol.name}
                                                </h3>
                                                <span>{idol.totalVotes.toLocaleString('ko-KR')}표</span>
                                            </CurrentVoteBox>
                                        </IdolVoteInfo>
                                        <CustomRadio
                                            name="idol"
                                            value={idol.id}
                                            checked={Number(voteIdol) === idol.id}
                                            onChange={handleChangeVote}
                                        />
                                    </FormWrapper>
                                ))
                            ) : (
                                <EmptyList>표시할 아이돌이 없습니다.</EmptyList>
                            )
                        ) : (
                            <EmptyList>데이터를 불러오고 있습니다. 잠시 기다려주세요.</EmptyList>
                        )}
                        <VoteBtnBox>
                            <VoteBtn type="submit" width="327" disabled={isDisabled}>
                                투표하기
                            </VoteBtn>
                            <CreditAlert>
                                투표하는 데 <span>1000 크레딧</span>이 소모됩니다.
                            </CreditAlert>
                        </VoteBtnBox>
                    </VoteForm>
                    {!alertModalClose && (
                        <AlarmModal
                            setAlertModalClose={setAlertModalClose}
                            setModalClose={setModalClose}
                            title={modalTitle}
                        />
                    )}
                </ContentsBox>
            </ModalContainer>
        </ErrorBoundary>
    );
};

export default memo(VoteModal);

const ContentsBox = styled(ContentsBoxStyle)`
    width: 525px;
    max-height: 693px;

    @media (min-width: 375px) and (max-width: 767px) {
        width: 100vh;
        height: 100vh;
        min-height: 100vh;
        background: linear-gradient(300deg, rgba(2, 0, 14, 1) 70%, rgba(20, 195, 254, 0.2) 90%);
    }
`;

const Title = styled(TitleStyle)`
    width: 477px;
    margin: auto;
    margin-bottom: 10px;

    @media (min-width: 375px) and (max-width: 767px) {
        justify-content: center;
        position: relative;
        width: 327px;

        h2 {
            font-size: 14px;
            font-weight: 500;
            line-height: 16.71px;
        }
    }
`;

const MobileCloseBtn = styled.button`
    display: none;

    @media (min-width: 375px) and (max-width: 767px) {
        display: block;
        position: absolute;
        left: 0;
    }
`;

const CloseBtn = styled.button`
    @media (min-width: 375px) and (max-width: 767px) {
        display: none;
    }
`;

const VoteForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 477px;
    overflow: auto;
    padding: 15px 5px;
    margin: auto;
    margin-top: 0;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (min-width: 1200px) {
        margin-bottom: 40px;
    }

    @media (min-width: 375px) and (max-width: 767px) {
        width: 327px;
        padding-bottom: 60px;
    }
`;

const FormWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    height: 70px;
    margin-bottom: 8px;
    padding-bottom: 20px;
`;

const IdolVoteInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const ImgBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const IdolImg = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 9999px;
    outline: 1px solid var(--brand100);
    outline-offset: 4px;
    object-fit: cover;
`;

const CheckIcon = styled.img`
    position: absolute;
    top: 5;
    display: ${({ selected }) => (selected ? 'block' : 'none')};
`;

const CheckBackground = styled.div`
    position: absolute;
    top: 5;
    background: ${({ selected }) => (selected ? 'linear-gradient(#F96D69, #FE5493)' : 'none')};
    width: 60px;
    height: 60px;
    border-radius: 9999px;
    opacity: ${({ selected }) => (selected ? '0.5' : '1')};
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

const VoteBtnBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(24, 29, 38, 1) 0%, rgba(2, 0, 14, 1) 100%);

    @media (min-width: 375px) and (max-width: 767px) {
        padding-top: 0;
        bottom: 20px;
        background: rgba(2, 0, 14, 0.5);
    }
`;

const VoteBtn = styled(Button)`
    &:disabled {
        ${DisabledBtn}
    }
`;

const EmptyList = styled.p`
    color: white;
    text-align: center;
    margin-bottom: 20px;

    @media (min-width: 375px) and (max-width: 767px) {
        margin-bottom: 50px;
    }
`;
