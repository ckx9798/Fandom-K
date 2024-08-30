import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import InterestedIdols from './components/InterestedIdols';
import AddInterestedIdols from './components/AddInterestedIdols';
import { getIdols } from '../../api/idols';
import { createContext } from 'react';
import { getCharts } from '../../api/charts';

export const MyStateContext = createContext();

const MyPage = () => {
    const [datas, setDatas] = useState([]);
    const [checkedIdols, setCheckedIdols] = useState([]);
    const [selectedDatas, setSelectedDatas] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
    const [option, setOption] = useState('total');

    // 초기 데이터 로딩
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                let result;
                let selectedCount = selectedDatas.length;

                if (option === 'total') {
                    result = await getIdols({ cursor, pageSize: 16 + selectedCount });
                    setDatas(result.list);
                } else if (option === 'female' || option === 'male') {
                    result = await getCharts({ gender: option, cursor, pageSize: 16 + selectedCount });
                    setDatas(result.idols);
                }

                if (result && (result.list || result.idols)) {
                    setCursor(result.nextCursor);
                } else {
                    console.error('API 결과가 예상과 다릅니다:', result);
                    setDatas([]); // 기본값 설정
                }
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
                setDatas((prevDatas) => [...prevDatas, ...result.list]);
            } else if (option === 'female' || option === 'male') {
                result = await getCharts({ gender: option, cursor, pageSize: itemsToLoad });
                setDatas((prevDatas) => [...prevDatas, ...result.idols]);
            }

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
                <AddInterestedIdols
                    cursor={cursor}
                    setCursor={setCursor}
                    isLoading={isLoading}
                    loadMore={handleLoadMoreClick}
                    option={option}
                    setOption={setOption}
                />
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
