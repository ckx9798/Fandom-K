import { useEffect, useState } from 'react';

// 로컬스토리지에서 크레딧 현황 가져오는 훅
const useCredit = () => {
  const [credit, setCredit] = useState(0);

    const updateCredit = () => {
        const creditValue = parseInt(localStorage.getItem('credit'), 10) || 0;
        setCredit(creditValue);
    };

    useEffect(() => {
        updateCredit();
        
        window.addEventListener('storage', updateCredit);

        return () => {
            window.removeEventListener('storage', updateCredit);
        };
    }, []);

    return credit;
};

export default useCredit;
