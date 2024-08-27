import React from 'react';
import DonationList from './components/DonationList';
import styled from 'styled-components';

const ListPage = () => {
    return (
        <Container>
            <DonationList />
        </Container>
    );
};

export default ListPage;

const Container = styled.div`
    display: flex;
    justify-content: center;
`;
