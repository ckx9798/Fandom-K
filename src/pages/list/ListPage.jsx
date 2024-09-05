import CreditStatus from './components/CreditStatus';
import ThisMonthChart from './components/ThisMonthChart';
import Header from '../../components/Header';
import DonationList from './components/DonationList';
import styled from 'styled-components';

const ListPage = () => {
    return (
        <Container>
            <Header />
            <CreditStatus />
            <DonationList />
            <ThisMonthChart />
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
