import styled from 'styled-components';

const Button = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    width: ${({ width }) => width || 234}px;
    height: ${({ height }) => height || 40}px;
    border: 1px solid ${({ border }) => border || 'none'};
    border-radius: ${({ radius }) => radius || 3}px;
    background: ${({ background }) => background || 'linear-gradient(90deg, #f86f65 0%, #fe5493 100%)'};

    &:hover {
        opacity: 0.8;
    }
    &:disabled {
        background: var(--gray300);
        opacity: 1;
    }
`;
