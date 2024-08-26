import React from 'react';
import CreditCharge from '../../components/modals/CreditCharge';
import CreditNotEnough from '../../components/modals/CreditNotEnough';
import SupportModal from '../../components/modals/SupportModal';
import VoteModal from '../../components/modals/VoteModal';

const MainPage = () => {
    return (
        <div>
            {/* <CreditCharge /> */}
            {/* <CreditNotEnough /> */}
            {/* <SupportModal /> */}
            <VoteModal />
            본문
        </div>
    );
};

export default MainPage;
