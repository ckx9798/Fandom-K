import Header from '../../components/Header';
import DonationList from './components/DonationList';
import styled from 'styled-components';

const ListPage = () => {
    return (
        <Container>
            <Header />
            <DonationList />
        </Container>
    );
};

export default ListPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
