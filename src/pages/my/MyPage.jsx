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

const MyPage = () => {
    const [datas, setDatas] = useState([]);
    const [checkedIdols, setCheckedIdols] = useState([]);
    const [selectedDatas, setSelectedDatas] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [cursorArr, setCursorArr] = useState([null]);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
    const [option, setOption] = useState('total');
    const itemsPerPage = useItemsPerPage();
    const [currentPage, setCurrentPage] = useState(0);

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

    const fetchDatas = async () => {
        try {
            setIsLoading(true);
            let result;

            // option에 따라 itemsPerPage만큼 데이터 가져오기
            if (option === 'total') {
                result = await getIdols({ cursor: cursorArr[currentPage], pageSize: itemsPerPage });
            } else if (option === 'female' || option === 'male') {
                result = await getCharts({ gender: option, cursor: cursorArr[currentPage], pageSize: itemsPerPage });
            }

            const dataSource = option === 'total' ? result.list : result.idols;
            // 관심있는 아이돌에 포함된 데이터 필터링
            const filteredDatas = dataSource.filter((idol) => !selectedDatas.includes(idol.id));

            setCursorArr((prevDatas) => [...prevDatas, result.nextCursor]);
            // 만약 필터링 후 데이터가 pageSize보다 적다면, 추가 데이터 요청
            if (filteredDatas.length < pageSize) {
                const additionalData = await fetchDatas();
            }
        } catch (error) {
            console.error('데이터 로딩 오류:', error);
        }
    };

    const handleLoadMoreClick = async (itemsToLoad) => {
        if (cursorArr.length > 1 && !cursor) return; // cursor가 없으면 더 이상 요청하지 않음

        try {
            setIsLoading(true);
            const selectedCount = selectedDatas.length;
            let result;
            let category;

            if (option === 'total') {
                result = await getIdols({ cursor, pageSize: itemsToLoad });
                category = 'list';
            } else if (option === 'female' || option === 'male') {
                result = await getCharts({ gender: option, cursor, pageSize: itemsToLoad });
                category = 'idols';
            }

            const nextCursor = result.nextCursor;
            setCursorArr((prevDatas) => [...prevDatas, nextCursor]);

            const filteredDatas = result.category.filter((idol) => !checkedIdols.includes(idol.id));
            if (filteredDatas.length < itemsPerPage) {
                const additionalData = await (option === 'total' ? 'getIdols' : 'getCharts')({
                    nextCursor,
                    pageSize: itemsPerPage - filteredDatas.length,
                });
            }
            setDatas(result.category);
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
