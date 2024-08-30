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
    const [checkedIdols, setCheckedIdols] = useState([]);
    const [selectedDatas, setSelectedDatas] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

    // 초기 데이터 로딩
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                let result = await getIdols({ cursor, pageSize: 32 });
                if (!cursor) {
                    setDatas(result.list);
                }
                setCursor(result.nextCursor);
            } catch (error) {
                console.error('데이터 로딩 오류:', error);
                return;
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLoadMoreClick = async (itemsToLoad) => {
        if (!cursor) return; // cursor가 없으면 더 이상 요청하지 않음

        try {
            setIsLoading(true);
            const result = await getIdols({ cursor, pageSize: itemsToLoad });
            setDatas((prevDatas) => [...prevDatas, ...result.list]);
            setCursor(result.nextCursor); // 다음 cursor로 업데이트
        } catch (error) {
            console.error('추가 데이터 로딩 오류:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <StyledMyPage>
            <Header />
            <MyStateContext.Provider value={{ datas, selectedDatas, setSelectedDatas, checkedIdols, setCheckedIdols }}>
                <InterestedIdols />
                <AddInterestedIdols cursor={cursor} isLoading={isLoading} loadMore={handleLoadMoreClick} />
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
