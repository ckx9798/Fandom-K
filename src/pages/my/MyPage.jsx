import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import InterestedIdols from './components/InterestedIdols';
import AddInterestedIdols from './components/AddInterestedIdols';
import { getIdols } from '../../api/idols';
import { createContext } from 'react';
import { getCharts } from '../../api/charts';
import useDataNum from '../../hooks/useDataNum';
import axios from 'axios';

export const MyStateContext = createContext();
export const MyDispatchContext = createContext();

const MyPage = () => {
    const [datas, setDatas] = useState([]);
    const [checkedIdols, setCheckedIdols] = useState([]);
    const [selectedDatas, setSelectedDatas] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [option, setOption] = useState('total');
    const dataNum = useDataNum();
    const [error, setError] = useState(false);

    // 초기 데이터 로딩
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                let result;

                if (option === 'total') {
                    result = await getIdols({ cursor, pageSize: dataNum });
                    setDatas(result.list);
                } else if (option === 'female' || option === 'male') {
                    result = await getCharts({ gender: option, cursor, pageSize: dataNum });
                    setDatas(result.idols);
                }

                setCursor(result?.nextCursor);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('AxiosError 로딩 오류:', error);
                } else {
                    console.error('데이터 로딩 오류:', error);
                }

                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [option]);

    // 데이터 업데이트 및 오류 처리 함수
    const handleDataUpdate = (data, errorMessage) => {
        if (Array.isArray(data)) {
            setDatas((prevDatas) => [...prevDatas, ...data]);
        } else {
            console.error(`오류: ${errorMessage}가 배열이 아님`);
        }
    };

    const handleLoadMoreClick = async (itemsToLoad, option) => {
        if (!cursor) return; // cursor가 없으면 더 이상 요청하지 않음

        try {
            setIsLoading(true); // 추가 데이터 로딩 시작
            let result;

            // 필터 옵션에 따른 추가 데이터 로드
            if (option === 'total') {
                result = await getIdols({ cursor, pageSize: itemsToLoad });
                handleDataUpdate(result?.list, 'result.list');
            } else if (option === 'female' || option === 'male') {
                result = await getCharts({ gender: option, cursor, pageSize: itemsToLoad });
                handleDataUpdate(result?.idols, 'result.idols');
            }
            setCursor(result?.nextCursor); // 다음 커서 업데이트
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('AxiosError 로딩 오류:', error);
            } else {
                console.error('데이터 로딩 오류:', error);
            }
            setError(true);
        } finally {
            setIsLoading(false); // 추가 데이터 로딩 종료
        }
    };

    return (
        <StyledMyPage>
            <Header />
            <MyStateContext.Provider value={{ datas, selectedDatas, checkedIdols }}>
                <MyDispatchContext.Provider value={{ setDatas, setSelectedDatas, setCheckedIdols }}>
                    <InterestedIdols />
                    <AddInterestedIdols
                        cursor={cursor}
                        setCursor={setCursor}
                        isLoading={isLoading}
                        loadMore={handleLoadMoreClick}
                        option={option}
                        setOption={setOption}
                        error={error}
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
