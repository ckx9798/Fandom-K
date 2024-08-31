import styled from 'styled-components';

const CustomRadio = ({ name, value, checked, onChange }) => {
    return <HiddenRadio type="radio" name={name} value={value} checked={checked} onChange={onChange} />;
};

export default CustomRadio;

const HiddenRadio = styled.input`
    &[type='radio'] {
        vertical-align: middle;
        appearance: none;
        width: 16px;
        height: 16px;
        border: 3px solid white;
        border-radius: 50%;
        background-color: var(--gray100);
        position: relative;
        outline: 1px solid var(--gray100);
        outline-offset: max(2px, 0.1em);
        cursor: pointer;

        &:checked {
            outline: 1px solid var(--brand100);
            background-color: var(--brand100);
        }
    }
`;
