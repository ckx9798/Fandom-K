import React, { useEffect, useState } from 'react';
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
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    const [pageSize, setPageSize] = useState(getPageSize());

    const loadMore = async () => {
        if (isLoading || !hasNext) return;

        setIsLoading(true);

        const apiData = await getDonations({ cursor, pageSize: 8 });

        if (apiData.list.length < 8) {
            setHasNext(false);
        }
        setIdols((prev) => [...prev, ...apiData.list]);
        setCursor(apiData.nextCursor);

        setIsLoading(false);
    };

    const nextPage = async () => {
        setPage(page + 1);
        loadMore();
    };

    useEffect(() => {
        loadMore();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setPageSize(getPageSize());
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Container>
            <h2>후원을 기다리는 조공</h2>
            <button
                className="button left"
                disabled={page === 1 || pageSize !== 'pc'}
                onClick={() => {
                    setPage(page - 1);
                }}
            >
                <img src={lefgBtnIcon} />
            </button>
            <div className="cardList">
                {pageSize === 'pc' &&
                    idols.slice((page - 1) * PC_SIZE, page * PC_SIZE).map((item) => {
                        return <DonationItem key={item.id} item={item} />;
                    })}
                {pageSize !== 'pc' &&
                    idols.map((item) => {
                        return <DonationItem key={item.id} item={item} pageSize={pageSize} />;
                    })}
            </div>
            <button
                className="button right"
                disabled={page * PC_SIZE >= idols.length || pageSize !== 'pc'}
                onClick={nextPage}
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
    .cardList {
        margin: 24px 0 0;
        display: flex;
        gap: 24px;
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
        .cardList {
            width: 100%;
            overflow: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
`;
