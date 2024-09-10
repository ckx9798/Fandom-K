import { useRef } from 'react';

const useScrollTo = () => {
    const ref = useRef(null);

    const scrollTo = (direction, offset = 24) => {
        if (!ref.current) return;

        const scrollAmount = ref.current.offsetWidth + offset;
        ref.current.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
        });
    };

    return { ref, scrollTo };
};

export default useScrollTo;
