import styled from 'styled-components';
import ModalContainer from './ModalContainer';
import closeBtn from '../../assets/img/btn_delete_24px.svg';
import creditImg from '../../assets/icon/credit.svg';

// 크레딧 부족 시 모달
const CreditNotEnough = ({ setModalClose }) => {
    // 모달창 닫는 함수
    const handleModalClose = () => {
        setModalClose((prev) => !prev);
    };

    return (
        <ModalContainer>
            <ContentsBox>
                <CloseBtn onClick={handleModalClose}>
                    <img src={closeBtn} alt='닫기' />
                </CloseBtn>
                <Contents>
                    <img src={creditImg} alt='크레딧' />
                    <p>
                        앗! 투표하기 위한 <span>크레딧</span>이 부족해요
                    </p>
                </Contents>
                <button onClick={handleModalClose}>확인</button>
            </ContentsBox>
        </ModalContainer>
    );
};

export default CreditNotEnough;

const ContentsBox = styled.div`
    width: 343px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 24px 16px 32px 16px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
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