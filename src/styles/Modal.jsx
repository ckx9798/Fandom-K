import styled from 'styled-components';

// 모달 공용 (width를 지정해서 사용해주세요.)
export const ContentsBoxStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 24px 16px 32px 16px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

export const TitleStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    h2 {
        font-size: 18px;
        font-weight: 600;
        line-height: 21.48px;
        color: var(--white200);
    }

    button {
        background: none;
        border: none;
        padding: 0;
    }
`;

export const NumberInput = styled.input`
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
