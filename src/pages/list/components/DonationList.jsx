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

    // 터치 스크롤을 위한 state
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const cardListRef = useRef(null);
    const lastItemRef = useRef(null);

    // 페이지 넘기기 버튼
    const NextSlide = () => {
        if (cardListRef.current) {
            setPage((prev) => prev + 1);
        }
    };
    const PrevSlide = () => {
        if (cardListRef.current) {
            setPage((prev) => prev - 1);
        }
    };

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

    const handleMouseUp = () => {
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
            if (axios.isAxiosError(error)) {
                console.error('데이터 불러오기 에러', error);
            }
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
            <button className="button left" disabled={page === 0} onClick={PrevSlide}>
                <img src={lefgBtnIcon} />
            </button>
            <Carousel
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseUp}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <div className="cardList" ref={cardListRef}>
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
                </div>
            </Carousel>
            <button
                className="button right"
                disabled={(page + 1) * PC_SIZE >= idols.length && !hasNext}
                onClick={NextSlide}
            >
                <img src={rightBtnIcon} />
            </button>
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
    .button {
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
    }
    p {
        color: var(--white200);
    }
    @media (max-width: 1380px) {
        .button {
            &.left {
                left: 0px;
            }
            &.right {
                right: 0px;
            }
        }
    }
    @media (max-width: 1280px) {
        width: 100%;
        .button {
            display: none;
        }
    }
`;

const Carousel = styled.div`
    overflow: hidden;
    .cardList {
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
    }
    @media (max-width: 1280px) {
        width: 100%;
        .cardList {
            overflow: scroll;
            width: 100%;
        }
    }
`;
