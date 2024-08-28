import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDonations } from '../../../api/donations';
import DonationItem from './DonationItem';
import rightBtnIcon from '../../../assets/icon/btn_pagination_right.svg';
import lefgBtnIcon from '../../../assets/icon/btn_pagination_left.svg';

const DonationList = () => {
    const [idols, setIdols] = useState([]);
    const [cursor, setCursor] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNext, setHasNext] = useState(true);

    const loadMore = async (cursor) => {
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
        loadMore(cursor);
    }, [cursor]);

    return (
        <Container>
            <h2>후원을 기다리는 조공</h2>
            <button
                className="button left"
                disabled={page === 1}
                onClick={() => {
                    setPage(page - 1);
                }}
            >
                <img src={lefgBtnIcon} />
            </button>
            <div className="cardList">
                {idols.slice((page - 1) * 4, page * 4).map((item) => {
                    return <DonationItem key={item.id} item={item} />;
                })}
            </div>
            <button
                className="button right"
                // disabled={cursor === null}
                onClick={nextPage}
            >
                <img src={rightBtnIcon} />
            </button>
        </Container>
    );
};

export default DonationList;

const Container = styled.div`
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
        width: 1200px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
    }
    p {
        color: var(--white200);
    }
    @media (max-width: 1200px) {
        .button {
            display: none;
        }
        .cardList {
            display: flex;
            overflow: scroll;
        }
    }
`;
