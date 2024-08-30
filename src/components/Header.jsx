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
            <Logo src={logo} alt="FANDOM-K 로고" onClick={handleRefresh} />

            <UserProfile src={userProfileImg} alt="유저 프로필 이미지" onClick={() => nav('/my')} />
        </StyledHeader>
    );
};

export default Header;

const StyledHeader = styled.div`
    background-color: #02000e;
    width: 100%;
    max-width: 1200px;
    padding: 24px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: '. logo profile';
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    @media (max-width: 1200px) {
        height: 81px;
        padding: 29px 25px;
    }

    @media (max-width: 768px) and (min-width: 374px) {
        height: 44px;
        padding: 18px 23px 5.42px;
    }
`;

const Logo = styled.img`
    width: 167.92px;
    height: 32px;
    background: none;
    border: none;
    padding: 0;
    grid-area: logo;
    justify-self: center;
    cursor: pointer;

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
    grid-area: profile;
    justify-self: end;
`;
