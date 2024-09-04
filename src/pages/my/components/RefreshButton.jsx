import styled from 'styled-components';
import RefreshImg from '../../../assets/icon/reflash.svg';
import Button from '../../../components/Button';

const RefreshButton = () => {
    const handleReflash = () => {
        window.location.reload();
    };

    return (
        <StyledRefreshButton>
            <img onClick={handleReflash} src={RefreshImg} alt="새로고침" width="100" height="100" />
            <p>페이지 로딩에 실패했습니다.🥹</p>
            <Button radius="24">새로 고침</Button>
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
