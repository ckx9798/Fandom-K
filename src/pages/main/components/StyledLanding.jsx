import styled from 'styled-components';

const StyledLanding = styled.div`
    width: 1200px;
    height: 4680px;
    margin: 0 auto;
    position: relative;

    @media (max-width: 1200px) {
        width: 744px;
        height: 3432px;
    }

    @media (max-width: 768px) {
        width: 375px;
        height: 3248px;
    }
`;

export default StyledLanding;
