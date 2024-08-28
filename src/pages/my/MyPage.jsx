import styled from 'styled-components';
import Header from '../../components/Header';
import InterestedIdols from './components/InterestedIdols';
import AddInterestedIdols from './components/AddInterestedIdols';
import mockdata from './components/mockdata';

import { createContext, useState } from 'react';

export const MyStateContext = createContext();
const MyPage = () => {
    const [datas, setDatas] = useState(mockdata.list);
    const [selectedDatas, setSelectedDatas] = useState(datas.slice(0, 4));

    return (
        <StyledMyPage>
            <Header />
            <MyStateContext.Provider value={{ datas, selectedDatas, setSelectedDatas }}>
                <InterestedIdols />
                <AddInterestedIdols />
            </MyStateContext.Provider>
        </StyledMyPage>
    );
};

export default MyPage;

const StyledMyPage = styled.div`
    h2 {
        color: #f6f6f8;
        font-weight: 700;
        font-size: 24px;
        line-height: 26px;
    }
`;
