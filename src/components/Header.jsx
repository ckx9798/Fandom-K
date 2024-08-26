import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import logo from '../assets/image/logo.svg';
import userProfileImg from '../assets/image/userProfile.jpg';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <StyledHeader>
            <a href={currentPath}>
                <Logo src={logo} alt="FANDOM-K 로고" />
            </a>
            <UserProfile src={userProfileImg} alt="유저 프로필 이미지" />
        </StyledHeader>
    );
};

export default Header;

const StyledHeader = styled.div`
    background-color: #02000e;
    width: 1200px;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;

    @media (max-width: 1200px) {
        width: 744px;
        height: 81px;
    }

    @media (max-width: 700px) {
        width: 374px;
        height: 44px;
    }
`;

const Logo = styled.img`
    display: block;
    width: 167.92px;
    height: 32px;

    @media (max-width: 1023px) {
        width: 120px;
        height: 22.87px;
    }

    @media (max-width: 767px) {
        width: 108px;
        height: 20.58px;
    }
`;

const UserProfile = styled.img`
    display: block;
    height: 32px;
    width: 32px;
    border-radius: 125px;
    position: absolute;
    right: 0px;
`;
