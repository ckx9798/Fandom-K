import back1Img from '../../assets/image/Home-1-Back.svg';
import back2Img from '../../assets/image/Home-2-Back.svg';
import back3Img from '../../assets/image/Home-3-Back.svg';
import home1Img from '../../assets/image/Home-1.svg';
import home2Img from '../../assets/image/Home-2.svg';
import home3Img from '../../assets/image/Home-3.svg';

import StyledLanding from './components/StyledLanding';
import LandingContent from './components/LandingContent';
import LandingTitle from './components/LandingTitle';
import Rectangle from './components/Rectangle';
import Scrollbar from './components/Scrollbar';

const MainPage = () => {
    return (
        <Scrollbar>
            <StyledLanding>
                <LandingTitle />
                <LandingContent
                    backImg={back1Img}
                    mainImg={home1Img}
                    textPosition="start"
                    subText="후원하기"
                    mainText1="좋아하는 아이돌에게"
                    mainText2="쉽게 조공해 보세요"
                />
                <LandingContent
                    backImg={back2Img}
                    mainImg={home2Img}
                    textPosition="end"
                    subText="이달의 아티스트"
                    mainText1="내 아티스트에게 1등의"
                    mainText2="영예를 선물하세요 "
                />
                <LandingContent
                    backImg={back3Img}
                    mainImg={home3Img}
                    textPosition="start"
                    subText="나만의 아티스트"
                    mainText1="좋아하는 아티스트들의"
                    mainText2="소식을 모아보세요"
                />
                <Rectangle />
            </StyledLanding>
        </Scrollbar>
    );
};

export default MainPage;
