import React, { useEffect, useRef, useState } from 'react';

import DonationItem from './DonationItem';
import RefreshButton from '../../../components/RefreshButton';
import { getDonations } from '../../../api/donations';
import lefgBtnIcon from '../../../assets/icon/btn_pagination_left.svg';
import rightBtnIcon from '../../../assets/icon/btn_pagination_right.svg';
import usePagination from '../../../hooks/usePagination';
import useScrollTo from '../../../hooks/useScrollTo';

const PC_SIZE = 4;

const getPageSize = () => {
    const width = window.innerWidth;

    if (width < 767) {
        return 'mobile';
    } else if (width < 1280) {
        return 'tablet';
    } else {
        return 'pc';
    }
};

const DonationList = () => {
    const [idols, setIdols] = useState([]);
    const [cursor, setCursor] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    const [pageSize, setPageSize] = useState(getPageSize());
    const [error, setError] = useState(false);

    // 터치 스크롤을 위한 state
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const { ref: cardListRef, scrollTo } = useScrollTo();
    const lastItemRef = useRef(null);

    const { page, handleNextPage, handlePrevPage } = usePagination(scrollTo);

    // 마우스 스크롤 이벤트
    const handleMouseDown = (e) => {
        // pc 화면일 경우 마우스 스크롤 방지
        if (pageSize === 'pc') return;
        setIsDragging(true);
        setStartX(e.pageX - cardListRef.current.offsetLeft);
        setScrollLeft(cardListRef.current.scrollLeft);
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - cardListRef.current.offsetLeft;
        const walk = x - startX;
        cardListRef.current.scrollLeft = scrollLeft - walk;
    };

    // 후원 목록 불러 오는 함수
    const loadMore = async ({ pageSize }) => {
        if (isLoading || !hasNext || error) return;
        try {
            setIsLoading(true);
            setError(false);
            const apiData = await getDonations({ cursor, pageSize });
            if (apiData.list.length < 4) {
                setHasNext(false);
            }
            setIdols((prev) => [...prev, ...apiData.list]);
            setCursor(apiData.nextCursor);
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadMore({ pageSize: 4 });
    }, [error]);

    // 화면 크기 변경 시 pageSize변경
    useEffect(() => {
        const handleResize = () => {
            setPageSize(getPageSize());
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 무한 스크롤
    useEffect(() => {
        if (!lastItemRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMore({ pageSize: 4 });
                }
            },
            {
                threshold: 0.25,
            },
        );

        const lastItemElement = lastItemRef.current;
        if (lastItemElement) observer.observe(lastItemElement);

        return () => {
            if (lastItemElement) observer.unobserve(lastItemElement);
        };
    }, [idols.length, lastItemRef, loadMore]);

    return (
        <div className="relative w-[1200px] max-w-full">
            <h2 className="text-[24px] font-bold text-white/80">후원을 기다리는 조공</h2>

            {/* 왼쪽 페이지 버튼 */}
            <button
                className={`
                    absolute z-10 w-[40px] h-[78px] bg-transparent border-0 left-[-80px] top-[220px] 
                    2xl:left-[-80px] 2xl:block
                    xl:left-0 xl:block
                    hidden 2xl:block
                    2xl:max-xl:left-0
                    2xl:max-xl:block
                    max-xl:hidden
                `}
                disabled={page === 0}
                onClick={handlePrevPage}
                style={{ display: page === 0 ? 'none' : undefined }}
            >
                <img src={lefgBtnIcon} alt="왼쪽" />
            </button>

            {/* 캐러셀 */}
            <div className="overflow-hidden w-full">
                <div
                    ref={cardListRef}
                    className="
                        relative flex gap-[24px] mt-[24px] overflow-x-scroll scroll-smooth select-none
                        [&::-webkit-scrollbar]:hidden
                        w-full
                    "
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseUpOrLeave}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseMove={handleMouseMove}
                >
                    {idols.map((item, index) => (
                        <DonationItem
                            key={item.id}
                            item={item}
                            pageSize={pageSize}
                            ref={index === idols.length - 1 ? lastItemRef : null}
                        />
                    ))}
                    {error && (
                        <div
                            className="
                                w-[1200px] h-[405px] flex flex-col items-center justify-center gap-[30px] text-center
                                xl:w-full xl:min-w-[158px] xl:h-auto
                            "
                        >
                            <RefreshButton />
                        </div>
                    )}
                </div>
            </div>

            {/* 오른쪽 페이지 버튼 */}
            <button
                className={`
                    absolute z-10 w-[40px] h-[78px] bg-transparent border-0 right-[-80px] top-[220px] 
                    2xl:right-[-80px] 2xl:block
                    xl:right-0 xl:block
                    hidden 2xl:block
                    2xl:max-xl:right-0
                    2xl:max-xl:block
                    max-xl:hidden
                `}
                disabled={(page + 1) * PC_SIZE >= idols.length}
                onClick={handleNextPage}
                style={{ display: (page + 1) * PC_SIZE >= idols.length ? 'none' : undefined }}
            >
                <img src={rightBtnIcon} alt="오른쪽" />
            </button>
        </div>
    );
};

export default DonationList;
