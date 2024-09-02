import styled from 'styled-components';
import ErrorImg from '../assets/image/error.png';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <ErrorContainer>
            <ErrorWrapper>
                <Contents>
                    <img src={ErrorImg} alt="에러" />
                    <ContentsBox>
                        <h2>앗! 오류가 발생했어요.</h2>
                        <p>입력하신 경로를 다시 한번 확인해주세요.</p>
                    </ContentsBox>
                </Contents>
                <HomeLink to="/">돌아가기</HomeLink>
            </ErrorWrapper>
        </ErrorContainer>
    );
};

export default ErrorPage;

const ErrorContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

const ErrorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;

    img {
        width: 60px;
        height: 60px;
    }
`;

const Contents = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (min-width: 375px) and (max-width: 768px) {
        flex-direction: column;
    }
`;

const ContentsBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    h2 {
        color: var(--white200);
    }

    p {
        color: var(--gray300);
    }

    @media (min-width: 375px) and (max-width: 768px) {
        align-items: center;
    }
`;

const ContentsList = styled.ul`
    color: var(--white200);
    line-height: 1.5rem;
`;

const HomeLink = styled(Link)`
    background: linear-gradient(90deg, #f86f65 0%, #fe5493 100%);
    padding: 0.5rem 1.5rem;
    border-radius: 10px;
    color: var(--white200);
    transition: all 0.1s ease-in-out;
    font-size: 1.2rem;
    font-weight: bold;

    &:hover {
        background: linear-gradient(90deg, #f56258 0%, #fd4488 100%);
    }
`;
