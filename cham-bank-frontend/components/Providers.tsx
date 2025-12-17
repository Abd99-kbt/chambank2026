'use client';

import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";
import WelcomeOverlay from "@/components/WelcomeOverlay";

function DirectionHandler({ children }: { children: React.ReactNode }) {
    const { dir } = useLanguage();

    useEffect(() => {
        document.documentElement.dir = dir;
        document.documentElement.lang = dir === 'rtl' ? 'ar' : 'en';
    }, [dir]);

    return <div dir={dir} className="flex flex-col min-h-screen">{children}</div>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <DirectionHandler>
                <WelcomeOverlay />
                {children}
            </DirectionHandler>
        </LanguageProvider>
    );
}
