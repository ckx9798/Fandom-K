import { useState, useEffect } from 'react';

// 화면 크기를 나타내는 상수 객체
const SIZES = {
    mobile: 768,
    tablet: 1280,
};

// 화면 크기에 따라 보여줄 아이템 개수를 동적으로 설정
function useItemsPerPage(items = { mobile: 6, tablet: 8, desktop: 16 }) {
    const [itemsPerPage, setItemsPerPage] = useState(items.desktop);

    useEffect(() => {
        // 화면 크기에 따라 아이템 개수를 업데이트하는 함수
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width <= SIZES.mobile) {
                setItemsPerPage(items.mobile); // 모바일 화면일 때
            } else if (width <= SIZES.tablet) {
                setItemsPerPage(items.tablet); // 테블릿 화면일 때
            } else {
                setItemsPerPage(items.desktop); // 데스크탑 화면일 때
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, [items]);

    return itemsPerPage;
}

export default useItemsPerPage;
