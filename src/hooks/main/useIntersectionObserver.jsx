import { useEffect } from 'react';

const useIntersectionObserver = (ref, className, options = { threshold: 0.3 }) => {
    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                }
            });
        }, options);

        observer.observe(ref.current);

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);
};

export default useIntersectionObserver;
