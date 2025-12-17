'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Show transition overlay
        setIsTransitioning(true);

        // Hide after animation
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <>
            {/* Page Transition Overlay with Logo */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-white z-[9999] flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.2, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-24 h-24"
                        >
                            {/* Logo */}
                            <Image
                                src="/images/logo.svg"
                                alt="Loading"
                                width={96}
                                height={96}
                                className="animate-pulse-ring"
                            />

                            {/* Spinning ring */}
                            <div className="absolute inset-0 animate-spin rounded-full border-4 border-cham-red border-t-transparent"></div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Page Content */}
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
                className="flex flex-col min-h-screen"
            >
                {children}
            </motion.div>
        </>
    );
}
