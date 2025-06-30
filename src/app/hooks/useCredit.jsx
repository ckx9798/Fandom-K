import useSWR, { mutate } from 'swr';

import { useEffect } from 'react';

// 로컬스토리지에서 크레딧 현황 가져오는 함수
export const fetchCredit = () => {
    const credit = parseInt(localStorage.getItem('credit'), 10) || 0;
    return credit;
};

// SWR을 사용하여 크레딧이 변경된 후 실행되면 업데이트
const useCredit = () => {
    const { data: credit } = useSWR('credit', fetchCredit);

    useEffect(() => {
        const updateCredit = () => {
            const currentCredit = fetchCredit();
            if (currentCredit !== credit) {
                mutate('credit');
            }
        };

        updateCredit();

        window.addEventListener('storage', updateCredit);

        return () => {
            window.removeEventListener('storage', updateCredit);
        };
    }, [credit]);

    return credit;
};
