import CreditStatus from '../../components/list/CreditStatus';
import Header from '../../components/Header';
import DonationList from './components/DonationList';
import styled from 'styled-components';
import ThisMonthChart from './components/ThisMonthChart';

const ListPage = () => {
    return (
        <Container>
            <Header />
            <DonationList />
            <ThisMonthChart />;
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
