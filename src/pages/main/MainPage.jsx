import styled from 'styled-components';
import back1Img from '../../assets/image/Home-1-Back.svg';
import back2Img from '../../assets/image/Home-2-Back.svg';
import back3Img from '../../assets/image/Home-3-Back.svg';
import home1Img from '../../assets/image/Home-1.svg';
import home2Img from '../../assets/image/Home-2.svg';
import home3Img from '../../assets/image/Home-3.svg';

import LandingContent from './components/LandingContent';
import LandingTitle from './components/LandingTitle';
import GlobalStyle from '../../styles/GrobalStyle';

const MainPage = () => {
    return (
        <>
            <GlobalStyle />
            <StyledApp>
                <LandingTitle />

                <LandingContent
                    backImg={back1Img}
                    mainImg={home1Img}
                    subText="후원하기"
                    mainText1="좋아하는 아이돌에게"
                    mainText2="쉽게 조공해 보세요"
                />
                <LandingContent
                    backImg={back2Img}
                    mainImg={home2Img}
                    subText="이달의 아티스트"
                    mainText1="내 아티스트에게 1등의"
                    mainText2="영예를 선물하세요 "
                />
                <LandingContent
                    backImg={back3Img}
                    mainImg={home3Img}
                    subText="나만의 아티스트"
                    mainText1="좋아하는 아티스트들의"
                    mainText2="소식을 모아보세요"
                />
                <Rectangle />
            </StyledApp>
        </>
    );
};

export default MainPage;

const StyledApp = styled.div`
    width: 1200px;
    margin: 0 auto;
    padding: 0;
    height: 4680px;
    position: relative;

    @media (max-width: 1200px) {
        width: 100%;
        height: 3432px;
    }
`;

const Rectangle = styled.div`
    position: absolute;
    left: 506px;
    top: 1393px;
    width: 187px;
    height: 3091px;
    z-index: 0;
    background: linear-gradient(180deg, #030615 0%, #051d31 42.67%, #051e32 53.12%, #051c30 74.27%, #030b1c 100%);

    @media (max-width: 1200px) {
        width: 117px;
        height: 1928px;
        top: 1394px;
        left: 314px;
    }
`;
