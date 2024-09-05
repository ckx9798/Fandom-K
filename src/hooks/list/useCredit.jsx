import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';

// 로컬스토리지에서 크레딧 현황 가져오는 훅
const fetchCredit = () => {
    const credit = parseInt(localStorage.getItem('credit'), 10) || 0;
    return credit;
};

// SWR을 사용하여 크레딧이 변경됐을 때 1초 후 업데이트
const useCredit = () => {
    const { data: credit } = useSWR('credit', fetchCredit, { refreshInterval: 1000 });

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
    }, []);

    return credit;
};

export default useCredit;
