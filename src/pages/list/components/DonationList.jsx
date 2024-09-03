import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getDonations } from '../../../api/donations';
import DonationItem from './DonationItem';
import rightBtnIcon from '../../../assets/icon/btn_pagination_right.svg';
import lefgBtnIcon from '../../../assets/icon/btn_pagination_left.svg';

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
    const [page, setPage] = useState(0);
    const [error, setError] = useState(false);

    // 터치 스크롤을 위한 state
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const cardListRef = useRef(null);
    const lastItemRef = useRef(null);

    useEffect(() => {
        const scrollAmount = cardListRef.current.offsetWidth + 24;
        cardListRef.current.scrollTo({
            left: scrollAmount * page,
            behavior: 'smooth',
        });
    }, [page]);

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
        if (isLoading || !hasNext) return;
        try {
            setIsLoading(true);
            const apiData = await getDonations({ cursor, pageSize });
            if (apiData.list.length < 4) {
                setHasNext(false);
            }
            setIdols((prev) => [...prev, ...apiData.list]);
            setCursor(apiData.nextCursor);
        } catch (error) {
            console.log(error);
            console.log('에러 발생');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadMore({ pageSize: 8 });
    }, []);

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
        <Container>
            <h2>후원을 기다리는 조공</h2>
            <PageButton className="left" disabled={page === 0} onClick={() => setPage(page - 1)}>
                <img src={lefgBtnIcon} />
            </PageButton>
            <Carousel
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseUpOrLeave}
                onMouseUp={handleMouseUpOrLeave}
                onMouseMove={handleMouseMove}
            >
                <CardList ref={cardListRef}>
                    {idols.map((item, index) => {
                        return (
                            <DonationItem
                                key={item.id}
                                item={item}
                                pageSize={pageSize}
                                ref={index === idols.length - 1 ? lastItemRef : null}
                            />
                        );
                    })}
                </CardList>
            </Carousel>
            <PageButton
                className="button right"
                disabled={(page + 1) * PC_SIZE >= idols.length && !hasNext}
                onClick={() => setPage(page + 1)}
            >
                <img src={rightBtnIcon} />
            </PageButton>
        </Container>
    );
};

export default DonationList;

const Container = styled.div`
    width: 1200px;
    position: relative;
    h2 {
        font-size: 24px;
        font-weight: 700;
        color: var(--white200);
    }

    @media (max-width: 1280px) {
        width: 100%;
    }
`;

const PageButton = styled.button`
    width: 40px;
    height: 78px;
    border: 0;
    background-color: unset;
    position: absolute;
    z-index: 10;
    &.left {
        left: -80px;
        top: 220px;
        &:disabled {
            display: none;
        }
    }
    &.right {
        right: -80px;
        top: 220px;
        &:disabled {
            display: none;
        }
    }
    @media (max-width: 1380px) {
        &.left {
            left: 0px;
        }
        &.right {
            right: 0px;
        }
    }
    @media (max-width: 1280px) {
        display: none;
    }
`;

const Carousel = styled.div`
    overflow: hidden;
    @media (max-width: 1280px) {
        width: 100%;
    }
`;

const CardList = styled.div`
    position: relative;
    overflow: hidden;
    margin: 24px 0 0;
    display: flex;
    gap: 24px;
    scroll-behavior: smooth;
    user-select: none;
    &::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 1280px) {
        overflow: scroll;
        width: 100%;
    }
`;
