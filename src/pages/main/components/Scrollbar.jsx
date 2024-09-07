import styled from 'styled-components';

const Scrollbar = styled.div`
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    /* 커스텀 스크롤바 스타일 */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        height: 20%;
        background: var(--brand200);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: var(--black200);
    }
`;

export default Scrollbar;
