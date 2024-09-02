import { useState, useEffect } from 'react';
import { SIZES } from '../../utils/Constants';

function useItemsPerPage(items = { mobile: 6, tablet: 8, desktop: 16 }) {
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        const width = window.innerWidth;
        if (width <= SIZES.mobile) {
            return items.mobile;
        } else if (width <= SIZES.tablet) {
            return items.tablet;
        } else {
            return items.desktop;
        }
    });

    // 화면 크기에 따라 아이템 개수를 업데이트하는 함수
    const updateItemsPerPage = () => {
        const width = window.innerWidth;
        if (width <= SIZES.mobile) {
            setItemsPerPage(items.mobile); // 모바일 화면일 때
        } else if (width <= SIZES.tablet) {
            setItemsPerPage(items.tablet); // 태블릿 화면일 때
        } else {
            setItemsPerPage(items.desktop); // 데스크탑 화면일 때
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateItemsPerPage);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, []);

    return itemsPerPage;
}

export default useItemsPerPage;
