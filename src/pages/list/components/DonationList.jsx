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
    const cardListRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false); //
    const [scrollLeft, setScrollLeft] = useState(0);

    // 페이지 넘기기 버튼
    const NextSlide = () => {
        setPage((prev) => prev + 1);
    };
    const PrevSlide = () => {
        setPage((prev) => prev - 1);
    };

    // 마우스 스크롤 이벤트
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setScrollLeft(cardListRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        cardListRef.current.scrollLeft = scrollLeft;
    };

    // 후원 목록 불러 오는 함수
    const loadMore = async () => {
        if (isLoading || !hasNext) return;

        try {
            setIsLoading(true);
            const apiData = await getDonations({ cursor, pageSize: 8 });
            if (apiData.list.length < 8) {
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
        loadMore();
    }, [page]);

    // 화면 크기 변경 시 pageSize변경
    useEffect(() => {
        const handleResize = () => {
            setPageSize(getPageSize());
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Carousel 작동
    useEffect(() => {
        const { current } = cardListRef;
        const scrollAmount = current.offsetWidth + 24;
        cardListRef.current.style.transform = `translateX(-${scrollAmount * page}px)`;
    }, [page]);

    return (
        <Container>
            <h2>후원을 기다리는 조공</h2>
            <button className="button left" disabled={page === 0 || pageSize !== 'pc'} onClick={PrevSlide}>
                <img src={lefgBtnIcon} />
            </button>
            <Carousel onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
                <div className="cardList" ref={cardListRef}>
                    {idols.map((item) => {
                        return <DonationItem key={item.id} item={item} pageSize={pageSize} />;
                    })}
                </div>
            </Carousel>
            <button
                className="button right"
                disabled={page + 1 >= idols.length / PC_SIZE || pageSize !== 'pc'}
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
    }
`;

const Carousel = styled.div`
    overflow: hidden;
    .cardList {
        margin: 24px 0 0;
        display: flex;
        gap: 24px;
        transition: all 0.5s ease-in-out;
        scroll-behavior: smooth;
    }
    @media (max-width: 1280px) {
        width: 100%;
        .cardList {
            width: 100%;
            overflow: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
`;
