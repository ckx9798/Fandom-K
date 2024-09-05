import styled from 'styled-components';
import RefreshImg from '../assets/icon/refresh.svg';
import AlertImg from '../assets/icon/alert.svg';
import Button from './Button';
import { ButtonInner } from '../pages/my/components/AddInterestedIdols';

const RefreshButton = () => {
    const handleReflash = () => {
        window.location.reload();
    };

    return (
        <StyledRefreshButton>
            <img src={AlertImg} alt="새로고침" width="100" height="100" />
            <p>페이지 로딩에 실패했습니다.🥹</p>
            <Button onClick={handleReflash} width="255" height="48" radius="24">
                <ButtonInner>
                    <img src={RefreshImg} alt="새로 고침" />
                    <span>새로 고침</span>
                </ButtonInner>
            </Button>
        </StyledRefreshButton>
    );
};

export default RefreshButton;

const StyledRefreshButton = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    color: white;
    align-items: center;
    padding: 98px 0;

    img {
        cursor: pointer;
    }

    p {
        font-size: 16px;
        margin-bottom: 42px;
    }
`;
