import Header from '../../components/Header';
import DonationList from './components/DonationList';
import styled from 'styled-components';

const ListPage = () => {
    return (
        <Container>
            <DonationList />
            <Header />
        </Container>
    );
};

export default ListPage;

const Container = styled.div`
    display: flex;
    justify-content: center;
`;
