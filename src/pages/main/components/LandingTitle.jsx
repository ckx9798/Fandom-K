import Button from '../../../components/Button';
import styled from 'styled-components';
import logoImg from '../../../assets/image/logo.svg';
import mainImg from '../../../assets/image/Main.svg';

const LandingTitle = () => {
    return (
        <AppTitle>
            <AppTitleLogo>
                <h2>
                    내가 좋아하는 아이돌을
                    <br /> 가장 <span>쉽게 덕질</span> 하는 방법
                </h2>
                <img src={logoImg} alt="로고" width="509" height="97" />
            </AppTitleLogo>
            <Button width="477" height="48">
                지금 시작하기
            </Button>
        </AppTitle>
    );
};

export default LandingTitle;

const AppTitle = styled.div`
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

    @media (max-width: 1200px) {
        &::before {
            top: 301.4px;
            width: 713.98px;
            height: 598.2px;
            background-size: 713.98px 598.2px;
        }
    }
`;

const AppTitleLogo = styled.div`
    h2 {
        font-size: 26px;
        font-weight: 700;
        text-align: center;
        margin-top: 0;
        margin-bottom: 29px;
        color: rgba(255, 255, 255, 1);
    }

    span {
        color: rgba(249, 109, 105, 1);
    }
`;
