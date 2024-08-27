import styled from "styled-components";

const ModalContainer = ({ children }) => {
  return (
    <Container>
      <Modal>{children}</Modal>
    </Container>
  )
}

export default ModalContainer;

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  background-color: #181D26;
  border-radius: 8px;
  overflow: hidden;
`;