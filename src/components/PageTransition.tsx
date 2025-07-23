
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
    const location = useLocation();
    const prevPathRef = useRef<string>(location.pathname);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isNewPage = prevPathRef.current !== location.pathname;

        if (isNewPage && elementRef.current) {
            // Apply transition animation when page changes
            elementRef.current.classList.remove('animate-page-enter');
            void elementRef.current.offsetWidth; // Force reflow
            elementRef.current.classList.add('animate-page-enter');

            // Update the previous path
            prevPathRef.current = location.pathname;

            // Scroll to top on page change
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return (
        <div
            ref={elementRef}
            className={cn("animate-page-enter", className)}
        >
            {children}
        </div>
    );
}

export default PageTransition;