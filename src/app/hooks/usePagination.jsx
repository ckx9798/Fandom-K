'use client';

import { useCallback, useState } from 'react';

const usePagination = (scrollTo) => {
    const [page, setPage] = useState(0);
    const handleNextPage = useCallback(() => {
        scrollTo('next');
        setPage((prevPage) => prevPage + 1);
    }, [scrollTo]);

    const handlePrevPage = useCallback(() => {
        scrollTo('prev');
        setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
    }, [scrollTo]);

    return { page, setPage, handleNextPage, handlePrevPage };
};

export default usePagination;
