'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Custom Marker Icon using DivIcon to embed the logo
const createCustomIcon = () => {
    return L.divIcon({
        className: 'custom-map-marker',
        html: `
            <div class="relative w-12 h-12">
                <div class="absolute inset-0 bg-cham-red rounded-full shadow-lg border-2 border-white flex items-center justify-center transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform duration-300">
                    <img src="/images/logo.svg" alt="Bank" class="w-8 h-8 object-contain brightness-0 invert" />
                    <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-cham-red"></div>
                </div>
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 blur-[2px] rounded-full"></div>
            </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -60],
    });
};

const branches = [
    { id: 1, name: "الإدارة العامة - دمشق", coords: [33.5138, 36.2765] },
    { id: 2, name: "فرع الحريقة", coords: [33.5090, 36.3000] },
    { id: 3, name: "فرع المزة", coords: [33.5000, 36.2500] },
    { id: 4, name: "فرع حلب", coords: [36.2021, 37.1343] },
    { id: 5, name: "فرع حمص", coords: [34.7324, 36.7136] },
    { id: 6, name: "فرع اللاذقية", coords: [35.5317, 35.7901] },
];

export default function MapComponent() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-[500px] w-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center text-gray-400">تحميل الخريطة...</div>;
    }

    return (
        <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 relative z-0">
            {/* Styling Overlay for professional look */}
            <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-md border border-gray-100">
                <p className="text-cham-navy font-bold text-sm">شبكة فروعنا</p>
            </div>

            {/* @ts-ignore */}
            <MapContainer center={[34.8021, 38.9968]} zoom={7} scrollWheelZoom={false} className="h-full w-full bg-gray-50">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                {branches.map((branch) => (
                    // @ts-ignore
                    <Marker key={branch.id} position={branch.coords} icon={createCustomIcon()}>
                        <Popup className="custom-popup">
                            <div className="text-center p-2 min-w-[150px]">
                                <h3 className="font-bold text-lg text-cham-navy mb-1">{branch.name}</h3>
                                <div className="text-xs text-cham-gold font-medium uppercase tracking-wider mb-2">Cham Bank</div>
                                <button className="text-xs bg-cham-red text-white px-3 py-1 rounded-full hover:bg-cham-red-dark transition-colors w-full">
                                    احصل على الاتجاهات
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
