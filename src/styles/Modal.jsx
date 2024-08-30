import styled, { css } from 'styled-components';

// 모달 공용 (ContentsBoxStyle 스타일은 width를 지정해서 사용해주세요.)
export const ContentsBoxStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 24px 16px 32px 16px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

// 모달마다 쓰는 상단 제목과 닫기 버튼이 있는 div 스타일입니다.
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

// Number 타입의 input 사용 시 오른쪽에 뜨는 숫자 클릭버튼 없애주는 스타일입니다.
export const NumberInput = styled.input`
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

// 버튼이 disabled 상태일 때 스타일입니다.
export const DisabledBtn = css`
    cursor: default;
    background: none;
    background-color: var(--gray200);

    &:hover {
        opacity: 1;
    }
`;
