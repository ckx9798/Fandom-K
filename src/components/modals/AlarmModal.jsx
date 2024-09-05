import styled from 'styled-components';
import ModalContainer from './ModalContainer';
import { ContentsBoxStyle } from './ModalGlobalStyle';
import Button from '../Button';
import closeBtn from '../../assets/image/btn_delete_24px.svg';
import creditImg from '../../assets/icon/credit.svg';

// 공용 알림 모달
const AlarmModal = ({ setAlertModalClose, setModalClose, title = 'credit' }) => {
    // 모달창 닫는 함수
    const handleModalClose = () => {
        setAlertModalClose((prev) => !prev);
        setModalClose((prev) => !prev);
    };

    let description;

    switch (title) {
        case 'credit':
            description = (
                <p>
                    앗! 투표하기 위한 <span>크레딧</span>이 부족해요
                </p>
            );
            break;
        case 'vote':
        case 'donation':
            description = <p>{title === 'vote' ? '투표가' : '후원이'} 완료되었습니다.</p>;
            break;
        case 'server':
            description = <ServerError>서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.</ServerError>;
            break;
        default:
            description = <p>오류가 발생했어요. 잠시 후 다시 시도해주세요.</p>;
    }

    return (
        <ModalContainer handleModalClose={handleModalClose}>
            <ContentsBox>
                <CloseBtn onClick={handleModalClose}>
                    <img src={closeBtn} alt="닫기" />
                </CloseBtn>
                <Contents>
                    <img src={creditImg} alt="크레딧" />
                    {description}
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
    padding: 32px 16px;
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

const ServerError = styled.p`
  text-align: center;
  letter-spacing: -1px;
`;