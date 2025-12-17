import { strapiAPI } from "@/lib/strapi";
import HomeClient from "@/components/HomeClient";
import type { StrapiEntity, ServiceAttributes, ExchangeRate } from "@/lib/types";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch data from Strapi
  let services: StrapiEntity<ServiceAttributes>[] = [];
  let exchangeRates: ExchangeRate[] = [];

  try {
    const servicesData = await strapiAPI.getServices();
    if (servicesData?.data) services = servicesData.data;

    const ratesData = await strapiAPI.getExchangeRates();
    if (ratesData?.rates) exchangeRates = ratesData.rates as ExchangeRate[];
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  // Fallback services if API fails or is empty (for demo purposes)
  if (services.length === 0) {
    services = [
      { id: 1, attributes: { title: 'حسابات التوفير', description: 'نمّ أموالك مع حسابات التوفير المتوافقة مع الشريعة', icon: 'wallet', slug: 'savings-accounts', isActive: true } },
      { id: 2, attributes: { title: 'التمويل العقاري', description: 'امتلك منزلك الآن مع حلول التمويل المرنة', icon: 'home', slug: 'real-estate-finance', isActive: true } },
      { id: 3, attributes: { title: 'البطاقات الائتمانية', description: 'تسوق بأمان مع بطاقاتنا المصرفية المميزة', icon: 'card', slug: 'credit-cards', isActive: true } },
      { id: 4, attributes: { title: 'الخدمات الرقمية', description: 'تحكم بحسابك في أي وقت ومن أي مكان', icon: 'phone', slug: 'digital-services', isActive: true } },
    ];
  }

  return (
    <HomeClient services={services} exchangeRates={exchangeRates} />
  );
}
