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

    image {
        display: block;
        height: 32px;
    }
`;

const Logo = styled.img`
    width: 168px;
`;

const UserProfile = styled.img`
    width: 32px;
    border-radius: 125px;
    position: absolute;
    right: 0px;
`;
