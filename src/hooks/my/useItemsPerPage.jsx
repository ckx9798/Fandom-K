import { useState, useEffect } from 'react';

function useItemsPerPage() {
    const [itemsPerPage, setItemsPerPage] = useState(16);

    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width <= 768) {
                setItemsPerPage(6);
            } else if (width <= 1280) {
                setItemsPerPage(8);
            } else {
                setItemsPerPage(16);
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, []);

    return itemsPerPage;
}

export default useItemsPerPage;
