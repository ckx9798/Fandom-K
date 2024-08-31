import styled from 'styled-components';
import ModalContainer from './ModalContainer';
import { ContentsBoxStyle } from './ModalGlobalStyle';
import Button from '../Button';
import closeBtn from '../../assets/image/btn_delete_24px.svg';
import creditImg from '../../assets/icon/credit.svg';

// 크레딧 부족 시, 투표 완료했을 때 띄울 공용 모달
const AlarmModal = ({ setAlertModalClose, title = 'credit' }) => {
    // 모달창 닫는 함수
    const handleModalClose = () => {
        setAlertModalClose((prev) => !prev);
    };

    return (
        <ModalContainer handleModalClose={handleModalClose}>
            <ContentsBox>
                <CloseBtn onClick={handleModalClose}>
                    <img src={closeBtn} alt="닫기" />
                </CloseBtn>
                <Contents>
                    <img src={creditImg} alt="크레딧" />
                    {title === 'credit' ? (
                        <p>
                            앗! 투표하기 위한 <span>크레딧</span>이 부족해요
                        </p>
                    ) : (
                        <p>투표가 완료되었습니다.</p>
                    )}
                </Contents>
                <Button onClick={handleModalClose} width="100%">
                    확인
                </Button>
            </ContentsBox>
        </ModalContainer>
    );
};

export default AlarmModal;

const ContentsBox = styled(ContentsBoxStyle)`
    width: 343px;
`;

const CloseBtn = styled.button`
    background: none;
    border: none;
    padding: 0;
    width: 24px;
    height: 24px;
    align-self: flex-end;
`;

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    color: white;

    img {
        width: 113px;
        height: 113px;
    }

    span {
        color: var(--brand100);
    }
`;
