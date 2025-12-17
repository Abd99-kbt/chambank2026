'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { strapiAPI } from '@/lib/strapi';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import type { StrapiEntity, SliderAttributes } from '@/lib/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

type Slide = StrapiEntity<SliderAttributes>;

export default function HeroSlider() {
    const { t, language } = useLanguage();
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSlides() {
            try {
                // Try to fetch from Strapi with locale support if available, or just standard
                // For now, we rely on the fallback or single-lang content
                const data = await strapiAPI.getSliders();
                if (data && data.data && data.data.length > 0) {
                    setSlides(data.data);
                } else {
                    // Fallback content using Dictionary (triggers when Strapi is empty)
                    // We wrap this in a way that React updates when 't' changes, 
                    // but usually we want to set it initially. 
                    // Since 't' changes, we might want to move this setSlides OUT of useEffect OR depend on [t].
                    throw new Error("Using fallback"); // Trigger catch block to set default slides
                }
            } catch (error) {
                // Fallback using Dictionary Keys
                setSlides([
                    {
                        id: 1,
                        attributes: {
                            title: t.hero_1_title,
                            description: t.hero_1_desc,
                            link: '/services',
                            buttonText: t.hero_btn_services,
                            image: { data: { attributes: { url: '/images/awdea.jpg' } } },
                            isActive: true,
                            order: 1
                        }
                    },
                    {
                        id: 2,
                        attributes: {
                            title: t.hero_2_title,
                            description: t.hero_2_desc,
                            link: '/products/real-estate',
                            buttonText: t.hero_btn_more,
                            image: { data: { attributes: { url: '/images/najmaty.jpg' } } },
                            isActive: true,
                            order: 2
                        }
                    },
                    {
                        id: 3,
                        attributes: {
                            title: t.hero_3_title,
                            description: t.hero_3_desc,
                            link: '/services',
                            buttonText: t.hero_btn_discover,
                            image: { data: { attributes: { url: '/images/mutanakel.jpg' } } },
                            isActive: true,
                            order: 3
                        }
                    },
                    {
                        id: 4,
                        attributes: {
                            title: t.hero_4_title,
                            description: t.hero_4_desc,
                            link: '/calculator',
                            buttonText: t.hero_btn_calc,
                            image: { data: { attributes: { url: '/images/mutanakel-280-29.jpg' } } },
                            isActive: true,
                            order: 4
                        }
                    },
                    {
                        id: 5,
                        attributes: {
                            title: t.hero_5_title,
                            description: t.hero_5_desc,
                            link: '/about',
                            buttonText: t.hero_btn_about,
                            image: { data: { attributes: { url: '/images/najmaty1.jpg' } } },
                            isActive: true,
                            order: 5
                        }
                    },
                    {
                        id: 6,
                        attributes: {
                            title: t.hero_6_title,
                            description: t.hero_6_desc,
                            link: '/branches',
                            buttonText: t.hero_btn_visit,
                            image: { data: { attributes: { url: '/images/najmaty2.jpg' } } },
                            isActive: true,
                            order: 6
                        }
                    }
                ] as Slide[]);
            } finally {
                setLoading(false);
            }
        }

        loadSlides();
    }, [t]); // Depend on t to reload slides when language changes

    if (loading) {
        return <div className="h-screen bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-cham-red border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    return (
        <section className="relative h-[80vh] md:h-screen w-full overflow-hidden" dir="rtl">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation
                loop={true}
                className="h-full w-full hero-swiper"
            >
                {slides.map((slide) => {
                    // Handle image URL (Strapi returns relative path usually, need to prepend URL if local)
                    let imgUrl = slide.attributes.image.data?.attributes.url || '/images/default.jpg';
                    if (!imgUrl.startsWith('http') && !imgUrl.startsWith('/')) {
                        imgUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imgUrl}`;
                    }

                    return (
                        <SwiperSlide key={slide.id} className="relative">
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={imgUrl}
                                    alt={slide.attributes.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* NIB-style dark overlay for text readability */}
                                <div className="absolute inset-0 bg-black/50"></div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16 lg:p-24">
                                <div className="max-w-2xl text-white animate-fade-in-up">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                        {slide.attributes.title}
                                    </h1>
                                    <p className="text-lg md:text-xl mb-8 leading-relaxed text-white/90">
                                        {slide.attributes.description}
                                    </p>
                                    {slide.attributes.link && (
                                        <Link
                                            href={slide.attributes.link}
                                            className="inline-block bg-cham-red hover:bg-cham-red-dark text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                                        >
                                            {slide.attributes.buttonText || 'اعرف المزيد'}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
}
