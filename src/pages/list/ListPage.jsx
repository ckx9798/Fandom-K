import CreditStatus from '../../components/list/CreditStatus';
import Header from '../../components/Header';
import styled from 'styled-components';

const ListPage = () => {
    return (
        <Container>
            <Header />
            <CreditStatus />
        </Container>
    );
};

export default ListPage;

const Container = styled.div`
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
`;
