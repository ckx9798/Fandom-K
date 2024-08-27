import React, { useState } from 'react';
import styled from 'styled-components';
import IdolProfile from './IdolProfile';
import { IdolList, IdolLists } from './AddInterestedIdols';

const InterestedIdols = ({ selectedIdols }) => {
    const [idols, setIdols] = useState([...selectedIdols]);

    const onDelete = (id) => {
        const nextIdols = idols.filter((idol) => idol.id !== id);
        setIdols(nextIdols);
    };

    return (
        <IdolWrapper>
            <h2>내가 관심있는 아이돌</h2>
            <IdolLists>
                <IdolList>
                    {idols.map((idol) => {
                        return <IdolProfile key={idol.id} idol={idol} selected={true} onDelete={onDelete} />;
                    })}
                </IdolList>
            </IdolLists>
        </IdolWrapper>
    );
};

export default InterestedIdols;

const IdolWrapper = styled.div`
    width: 1200px;
    margin: 0px auto;
    padding: 76px 0px 40px;
    border-bottom: 1px solid #ffffff1a;
`;

const IdolCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
`;
