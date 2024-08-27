import { useRef } from 'react';
import styled from 'styled-components';
import logoImg from '../../../assets/image/logo.svg';
import mainImg from '../../../assets/image/Main.svg';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import useIntersectionObserver from '../../../hooks/main/useIntersectionObserver';

const LandingTitle = () => {
    const nav = useNavigate();
    const titleRef = useRef(null);
    const logoRef = useRef(null);
    const buttonRef = useRef(null);

    useIntersectionObserver(titleRef, 'fade-in');
    useIntersectionObserver(logoRef, 'fade-in');
    useIntersectionObserver(buttonRef, 'fade-in');

    return (
        <StyledTitle>
            <LandingTitleLogo>
                <h2 ref={titleRef}>
                    내가 좋아하는 아이돌을
                    <br /> 가장 <span>쉽게 덕질</span> 하는 방법
                </h2>
                <img ref={logoRef} onClick={() => nav('/list')} src={logoImg} alt="로고" width="509" height="97" />
            </LandingTitleLogo>
            <ButtonContainer ref={buttonRef}>
                <Button
                    onClick={() => {
                        localStorage.clear();
                        nav('/list');
                    }}
                    width="477"
                    height="48"
                >
                    지금 시작하기
                </Button>
            </ButtonContainer>
        </StyledTitle>
    );
};

export default LandingTitle;

const StyledTitle = styled.div`
    box-sizing: border-box;
    position: relative;
    height: 1080px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 140px 0 120px;

    &::before {
        width: 100%;
        content: '';
        position: absolute;
        top: 95.4px;
        width: 932.4px;
        height: 781.2px;
        background: url(${mainImg}) no-repeat;
        background-size: 932.4px 781.2px;
        opacity: 0.7;
        z-index: -1;
    }

    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    @media (max-width: 1200px) {
        padding: 120px 0 120px;
        height: 1200px;
        &::before {
            top: 301.4px;
            width: 713.98px;
            height: 598.2px;
            background-size: 713.98px 598.2px;
        }
    }

    @media (max-width: 768px) {
        padding: 100px 0 100px;
        height: 812px;
        &::before {
            top: 241.08px;
            width: 393.68px;
            height: 329.84px;
            background-size: 393.68px 329.84px;
        }

        button {
            width: 230px;
            height: 48px;
        }
    }
`;

const LandingTitleLogo = styled.div`
    h2 {
        font-size: 26px;
        font-weight: 700;
        text-align: center;
        margin-top: 0;
        margin-bottom: 29px;
        color: rgba(255, 255, 255, 1);

        opacity: 0;
        transform: translateY(20px);
        transition: opacity 1s ease-out, transform 1s ease-out;
    }

    img {
        cursor: pointer;

        opacity: 0;
        transform: translateY(40px);
        transition: opacity 1s ease-out, transform 1s ease-out;
    }

    span {
        color: rgba(249, 109, 105, 1);
    }

    @media (max-width: 1200px) {
        h2 {
            font-size: 20px;
            margin-bottom: 32px;
        }
        img {
            width: 325.34px;
            height: 62px;
        }
    }

    @media (max-width: 768px) {
        h2 {
            font-size: 20px;
            margin-bottom: 20px;
        }
        img {
            width: 236.64px;
            height: 45.1px;
        }
    }
`;

const ButtonContainer = styled.div`
    opacity: 0;
    transform: translateY(60px);
    transition: opacity 1s ease-out, transform 1s ease-out;
`;
