import styled from 'styled-components';

const Rectangle = styled.div`
    position: absolute;
    width: 187px;
    height: 3091px;
    left: 506px;
    top: 1393px;
    z-index: 0;
    background: linear-gradient(180deg, #030615 0%, #051d31 42.67%, #051e32 53.12%, #051c30 74.27%, #030b1c 100%);

    @media (max-width: 1200px) {
        width: 117px;
        height: 1928px;
        left: 314px;
        top: 1394px;
    }

    @media (max-width: 768px) {
        width: 117px;
        height: 2133px;
        top: 1029px;
        left: 129px;
    }
`;

export default Rectangle;
