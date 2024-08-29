import styled from 'styled-components';
import logo from '../assets/image/logo.svg';
import userProfileImg from '../assets/image/userProfile.jpg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const nav = useNavigate();

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <StyledHeader>
            <RefreshButton onClick={handleRefresh}>
                <Logo src={logo} alt="FANDOM-K 로고" />
            </RefreshButton>
            <UserProfile src={userProfileImg} alt="유저 프로필 이미지" onClick={() => nav('/my')} />
        </StyledHeader>
    );
};

export default Header;

const StyledHeader = styled.div`
    background-color: #02000e;
    width: 100%;
    height: 80px;
    padding: 0 360px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    @media (max-width: 1200px) {
        height: 81px;
        padding: 0 25px;
    }

    @media (max-width: 768px) and (min-width: 374px) {
        height: 44px;
        padding: 0 23px;
    }
`;

const Logo = styled.img`
    width: 167.92px;
    height: 32px;

    @media (max-width: 1023px) {
        height: 22.87px;
    }

    @media (max-width: 767px) {
        height: 20.58px;
    }
`;

const UserProfile = styled.img`
    height: 32px;
    width: 32px;
    border-radius: 125px;
    cursor: pointer;
`;

const RefreshButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    flex: 1;
    position: relative;
    left: 32px;
`;
