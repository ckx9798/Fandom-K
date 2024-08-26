import styled from 'styled-components';

const LandingContent = ({ backImg, mainImg, textPosition, subText, mainText1, mainText2 }) => {
    return (
        <ContentWrapper>
            <Content backImg={backImg}>
                <ContentText textPosition={textPosition}>
                    <span>{subText}</span>
                    <h2>{mainText1}</h2>
                    <h2>{mainText2}</h2>
                </ContentText>
                <img src={mainImg} alt="메인 이미지" width="320" height="693.66" />
            </Content>
        </ContentWrapper>
    );
};

export default LandingContent;

const ContentWrapper = styled.div`
    background: linear-gradient(
        90deg,
        rgba(217, 217, 217, 0) 0%,
        rgba(217, 217, 217, 0.4) 30.73%,
        rgba(217, 217, 217, 0.6) 51.04%,
        rgba(217, 217, 217, 0.4) 71.87%,
        rgba(217, 217, 217, 0) 100%
    );
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 160px;
    gap: 58px;
    height: 1200px;
    position: relative;
    background: linear-gradient(180deg, #02000e 9.38%, rgba(2, 0, 14, 0.5) 52.39%, #02000e 100%);

    span,
    h2,
    img {
        z-index: 1;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
                50% 50% at 50% 50%,
                rgba(2, 0, 14, 0) 0%,
                rgba(2, 0, 14, 0.180099) 37.5%,
                rgba(2, 0, 14, 0.5) 79.5%,
                #02000e 100%
            ),
            url(${({ backImg }) => backImg}) no-repeat center center;
        background-size: cover;
        z-index: -1;
    }

    @media (max-width: 1200px) {
        padding-top: 84px;
        gap: 47px;
        height: 744px;
        width: 744px;

        img {
            width: 200px;
            height: 433.07px;
        }
    }

    @media (max-width: 744px) {
        padding-top: 76px;
        gap: 66px;
        width: 375px;
        height: 812px;

        img {
            width: 240px;
            height: 520.25px;
        }

        &::before {
            height: 744px;
        }
    }
`;

const ContentText = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
        font-size: 16px;
        font-weight: 500;
        color: rgba(210, 192, 48, 1);
        margin-bottom: 8px;
    }

    h2 {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
        color: rgba(255, 255, 255, 1);
    }

    @media (max-width: 1200px) {
        h2 {
            font-size: 20px;
        }
    }
    @media (max-width: 768px) {
        padding: 0px 32px;
        span {
            font-size: 14px;
        }
        align-items: ${({ textPosition }) => textPosition || 'center'};
    }
`;
