'use client';

import HeroSlider from "@/components/HeroSlider";
import ChatWidget from "@/components/ChatWidget";
import WelcomeOverlay from "@/components/WelcomeOverlay";
import SmallImageSlider from "@/components/SmallImageSlider";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Smartphone, ShieldCheck, Wallet, Globe, MapPin } from "lucide-react";
import ExchangeRatesTable from "@/components/ExchangeRatesTable";
import IslamicCalculator from "@/components/IslamicCalculator";
import MapWrapper from "@/components/MapWrapper";
import QuickActions from "@/components/QuickActions";
import ProductTabs from "@/components/ProductTabs";
import { useLanguage } from "@/context/LanguageContext";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HomeClientProps {
    services: any[];
    exchangeRates: any[];
}

export default function HomeClient({ services }: HomeClientProps) {
    const { t } = useLanguage();

    const getServiceIcon = (iconName: string) => {
        switch (iconName) {
            case 'wallet': return <Wallet className="w-8 h-8 text-cham-red" />;
            case 'phone': return <Smartphone className="w-8 h-8 text-cham-red" />;
            case 'global': return <Globe className="w-8 h-8 text-cham-red" />;
            case 'shield': return <ShieldCheck className="w-8 h-8 text-cham-red" />;
            default: return <Wallet className="w-8 h-8 text-cham-red" />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <WelcomeOverlay />

            {/* Hero Section */}
            <HeroSlider />

            {/* Quick Actions Bar */}
            <QuickActions />

            {/* Product Selection Tabs */}
            <ProductTabs />

            {/* Exchange Rates Table */}
            <section className="container mx-auto px-4 relative z-20 mb-12 -mt-10">
                <div className="max-w-3xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
                    <ExchangeRatesTable />
                </div>
            </section>

            {/* Services Section - Kept as secondary "Featured Services" */}
            <section className="py-20 bg-gray-50 hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.nav_products}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">{t.mission_text}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service: any) => (
                            <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 group border border-gray-100 hover:border-cham-red/20">
                                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cham-red group-hover:text-white transition-colors duration-300">
                                    {/* If Strapi provides an icon name, use mapping, else check for image */}
                                    {service.attributes.image?.data ? (
                                        <Image
                                            src={service.attributes.image.data.attributes.url.startsWith('http') ? service.attributes.image.data.attributes.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${service.attributes.image.data.attributes.url}`}
                                            alt={service.attributes.title}
                                            width={32}
                                            height={32}
                                        />
                                    ) : (
                                        getServiceIcon(service.attributes.icon || 'wallet')
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.attributes.title}</h3>
                                <p className="text-gray-600 mb-6 line-clamp-2">{service.attributes.description}</p>
                                <Link href={`/services/${service.id}`} className="inline-flex items-center text-cham-red font-semibold hover:gap-2 transition-all">
                                    {t.more_details} <ArrowRight size={16} className="mx-2" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features / Why Choose Us - NIB Style */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.why_cham}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">{t.mission_text}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
                            <div className="w-16 h-16 bg-red-50 text-cham-red rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative">
                                <ShieldCheck size={32} className="group-hover:animate-pulse-ring" />
                                <div className="absolute inset-0 bg-cham-red/10 rounded-xl scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{t.why_compliance_title}</h3>
                            <p className="text-gray-600 leading-relaxed">{t.why_compliance_text}</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
                            <div className="w-16 h-16 bg-red-50 text-cham-red rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative">
                                <Smartphone size={32} className="group-hover:animate-bounce-subtle" />
                                <div className="absolute inset-0 bg-cham-red/10 rounded-xl scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{t.why_digital_title}</h3>
                            <p className="text-gray-600 leading-relaxed">{t.why_digital_text}</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
                            <div className="w-16 h-16 bg-red-50 text-cham-red rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative">
                                <Globe size={32} className="group-hover:animate-float" />
                                <div className="absolute inset-0 bg-cham-red/10 rounded-xl scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{t.why_network_title}</h3>
                            <p className="text-gray-600 leading-relaxed">{t.why_network_text}</p>
                        </div>
                    </div>

                    {/* Small Image Slider Below */}
                    <div className="mt-16 max-w-4xl mx-auto">
                        <SmallImageSlider />
                    </div>
                </div>
            </section>

            {/* Tools & Calculator Section */}
            <section id="calculator" className="py-20 bg-gray-50 scroll-mt-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t.smart_tools_title}</h2>
                            <p className="text-gray-600 mb-8 text-lg">{t.smart_tools_desc}</p>

                            <ul className="space-y-4">
                                {[
                                    t.tool_calculator || 'Finance Calculator',
                                    t.tool_fees || 'Fees & Commissions',
                                    t.tool_compare || 'Product Comparison',
                                    t.tool_rates || 'Real-time Exchange Rates'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-red-50 text-cham-red flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full lg:w-1/3">
                            <IslamicCalculator />
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.branches_network}</h2>
                        <p className="text-gray-600">{t.branches_desc}</p>
                    </div>

                    <MapWrapper />

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
                            <MapPin className="w-12 h-12 text-cham-red mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                            <div className="font-bold text-2xl text-gray-900">15 {t.branches || 'Branches'}</div>
                            <div className="text-gray-500 text-sm mt-2">{t.why_network_text}</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
                            <Wallet className="w-12 h-12 text-cham-red mx-auto mb-4 group-hover:scale-125 group-hover:animate-bounce-subtle transition-all duration-300" />
                            <div className="font-bold text-2xl text-gray-900">25 ATM</div>
                            <div className="text-gray-500 text-sm mt-2">{t.nav_services_atm}</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
                            <Smartphone className="w-12 h-12 text-cham-red mx-auto mb-4 group-hover:scale-125 group-hover:animate-pulse-ring transition-all duration-300" />
                            <div className="font-bold text-2xl text-gray-900">{t.nav_services_mobile}</div>
                            <div className="text-gray-500 text-sm mt-2">{t.why_digital_text}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-cham-red-dark text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.app_title}</h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{t.app_desc}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-900 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.48C2.7 15.25.55 7.42 4.97 5.16c1.37-.75 2.68-.34 3.61.04.85.39 1.57.37 2.37-.02.95-.5 2.53-1.05 4.38.16 1.95 1.25 2.8 3.5 2.84 3.59-.03.04-2.22 1.35-2.26 4.02-.02 2.7 2.36 3.97 2.41 4.03-.02.06-.39 1.43-1.27 2.7z" /></svg>
                            <span>App Store</span>
                        </button>
                        <a href="https://ebanking.chambank.com/MobileApp" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-900 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.91.91 0 0 1-.94.05.996.996 0 0 1-.58-.9L2.09 2.664c0-.36.19-.7.519-.85zM15.352 13.56l3.541 3.542-4.99 2.834a.97.97 0 0 1-1.24-.26l-2.65-2.651 5.34-3.466zM20.254 11.26l-3.344-1.9L22 6.5l.86 1.48c.32.55.32 1.49 0 2.04l-2.606 1.24zM4.979 2.92L15.35 10.44l-5.34-3.465-2.65-2.65c-.32-.31-.8-.4-1.24-.26l-1.141.655z" /></svg>
                            <span>Google Play</span>
                        </a>
                    </div>
                </div>
            </section>

            <ChatWidget />
        </div>
    );
}
