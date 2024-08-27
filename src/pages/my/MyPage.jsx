import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import InterestedIdols from './components/InterestedIdols';
import AddInterestedIdols from './components/AddInterestedIdols';
import mockdata from './components/mockdata';

import { createContext, useState } from 'react';

export const MyStateContext = createContext();
const MyPage = () => {
    const [datas, setDatas] = useState(mockdata.list);
    const [selectedDatas, setSelectedDatas] = useState([]);

    for (let i = 0; i < 4; i++) {
        selectedDatas.push(datas[i]);
    }

    return (
        <MyStateContext.Provider value={{ datas, selectedDatas }}>
            <StyledMyPage>
                <Header />
                <InterestedIdols selectedIdols={selectedDatas} />
                <AddInterestedIdols />
            </StyledMyPage>
        </MyStateContext.Provider>
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
