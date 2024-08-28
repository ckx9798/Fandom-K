import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import InterestedIdols from './components/InterestedIdols';
import AddInterestedIdols from './components/AddInterestedIdols';
import { getIdols } from '../../api/idols';
import { createContext } from 'react';

export const MyStateContext = createContext();

const MyPage = () => {
    const [datas, setDatas] = useState([]);
    const [selectedDatas, setSelectedDatas] = useState([]);
    const [cursor, setCursor] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let result;
            try {
                result = await getIdols({ cursor, pageSize: 10 });
            } catch (error) {
                console.error(error);
                return;
            }
            if (!cursor) {
                setDatas(result.list);
            } else {
                setDatas((prevData) => [...prevData, ...response.list]);
            }
            setCursor(response.nextCursor);
        };

        fetchData();
    }, [cursor]);

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

const LoadMoreButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    color: #ffffff;
    background-color: #1b1b1b;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #333;
    }
`;
