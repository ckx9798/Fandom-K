import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import InterestedIdols from './components/InterestedIdols';
import AddInterestedIdols from './components/AddInterestedIdols';
import { getIdols } from '../../api/idols';
import { createContext } from 'react';
import { getCharts } from '../../api/charts';
import useItemsPerPage from '../../hooks/my/useItemsPerPage';

export const MyStateContext = createContext();
export const MyDispatchContext = createContext();

const MyPage = () => {
    const [datas, setDatas] = useState([]);
    const [checkedIdols, setCheckedIdols] = useState([]);
    const [selectedDatas, setSelectedDatas] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
    const [option, setOption] = useState('total');
    const itemsPerPage = useItemsPerPage();

    // 초기 데이터 로딩
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                let result;
                let selectedCount = selectedDatas.length;

                if (option === 'total') {
                    result = await getIdols({ cursor, pageSize: itemsPerPage + selectedCount });
                    setDatas(result.list);
                } else if (option === 'female' || option === 'male') {
                    result = await getCharts({ gender: option, cursor, pageSize: itemsPerPage + selectedCount });
                    setDatas(result.idols);
                }
                setCursor(result.nextCursor);
            } catch (error) {
                console.error('데이터 로딩 오류:', error);
                setDatas([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [option]);

    const handleLoadMoreClick = async (itemsToLoad, option) => {
        if (!cursor) return; // cursor가 없으면 더 이상 요청하지 않음

        try {
            setIsLoading(true);
            let result;

            if (option === 'total') {
                result = await getIdols({ cursor, pageSize: itemsToLoad });
                if (result && Array.isArray(result.list)) {
                    // result.list가 배열인지 확인
                    setDatas((prevDatas) => [...prevDatas, ...result.list]);
                } else {
                    console.error('오류: result.list가 배열이 아님');
                    handleLoadMoreClick();
                }
            } else if (option === 'female' || option === 'male') {
                result = await getCharts({ gender: option, cursor, pageSize: itemsToLoad });
                if (result && Array.isArray(result.idols)) {
                    // result.idols가 배열인지 확인
                    setDatas((prevDatas) => [...prevDatas, ...result.idols]);
                } else {
                    console.error('오류: result.idols가 배열이 아님');
                }
            }
            setCursor(result?.nextCursor); // result가 정의되어 있으면 cursor 업데이트
        } catch (error) {
            console.error('추가 데이터 로딩 오류:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <StyledMyPage>
            <Header />
            <MyStateContext.Provider value={{ datas, selectedDatas, checkedIdols }}>
                <MyDispatchContext.Provider value={{ setSelectedDatas, setCheckedIdols }}>
                    <InterestedIdols />
                    <AddInterestedIdols
                        cursor={cursor}
                        setCursor={setCursor}
                        isLoading={isLoading}
                        loadMore={handleLoadMoreClick}
                        option={option}
                        setOption={setOption}
                    />
                </MyDispatchContext.Provider>
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
