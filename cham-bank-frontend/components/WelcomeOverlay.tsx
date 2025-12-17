'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function WelcomeOverlay() {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set mounted to true on client-side
        setIsMounted(true);

        // Check if we've shown the intro in this session
        const hasShownIntro = sessionStorage.getItem('hasShownIntro');

        if (hasShownIntro) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
            // Hide after 4 seconds
            const timer = setTimeout(() => {
                setIsVisible(false);
                sessionStorage.setItem('hasShownIntro', 'true');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Don't render anything on server-side to avoid hydration mismatch
    if (!isMounted) {
        return null;
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col items-center gap-6"
                    >
                        <motion.div
                            className="w-24 h-24 flex items-center justify-center rounded-2xl shadow-xl"
                            animate={{
                                rotate: [0, 0, 360],
                                borderRadius: ["1rem", "50%", "1rem"]
                            }}
                            transition={{ duration: 1.5, times: [0, 0.5, 1], delay: 0.5 }}
                        >
                            <Image
                                src="/images/logo.svg"
                                alt="Cham Bank Logo"
                                width={80}
                                height={80}
                                className="animate-pulse"
                            />
                        </motion.div>
                        <motion.h1
                            className="text-3xl md:text-5xl font-bold text-gray-900"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            بنك الشام
                            <span className="block text-lg text-cham-navy mt-2 text-center font-normal">أول بنك إسلامي في سوريا</span>
                        </motion.h1>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
