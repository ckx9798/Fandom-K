import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/image/logo.svg';
import userProfileImg from '../assets/image/userProfile.jpg';
import HomeImg from '../assets/icon/Home.svg';

const Header = () => {
    const location = useLocation();
    const isHeaderDisplay = location.pathname === '/list' || location.pathname === '/my';

    //현재 위치가 list이면 새로고침
    const handleLogoClick = (e) => {
        if (location.pathname === '/list') {
            e.preventDefault(); // Link의 기본 동작을 막음
            window.location.reload();
        }
    };

    return (
        <>
            {isHeaderDisplay && (
                <StyledHeader>
                    <Link to="/">
                        <Home src={HomeImg} alt="홈" />
                    </Link>
                    <Link to="/list" onClick={handleLogoClick}>
                        <Logo src={logo} alt="FANDOM-K 로고" />
                    </Link>
                    <Link to="/my">
                        <UserProfile src={userProfileImg} alt="유저 프로필 이미지" />
                    </Link>
                </StyledHeader>
            )}
        </>
    );
};

export default Header;

const StyledHeader = styled.div`
    background-color: #02000e;
    width: 100%;
    max-width: 1200px;
    padding: 24px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    justify-content: space-between;

    @media (max-width: 1280px) {
        height: 81px;
        padding: 29px 25px;
    }

    @media (max-width: 768px) {
        height: 44px;
        padding: 18px 23px 5.42px;
    }
`;

const iconStyles = css`
    height: 32px;
    width: 32px;
`;

const Home = styled.img`
    ${iconStyles}
`;
const UserProfile = styled.img`
    ${iconStyles}
    border-radius: 125px;
`;

const Logo = styled.img`
    width: 167.92px;
    height: 32px;
    background: none;
    border: none;
    padding: 0;

    @media (max-width: 1280px) {
        height: 22.87px;
    }

    @media (max-width: 768px) {
        height: 20.58px;
    }
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
