'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center text-gray-400">تحميل الخريطة...</div>
});

export default function MapWrapper() {
    return <MapComponent />;
}
