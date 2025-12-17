import { strapiAPI } from "@/lib/strapi";
import HomeClient from "@/components/HomeClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch data from Strapi
  let services = [];
  let exchangeRates = [];

  try {
    const servicesData = await strapiAPI.getServices();
    if (servicesData?.data) services = servicesData.data;

    const ratesData = await strapiAPI.getExchangeRates();
    if (ratesData?.data) exchangeRates = ratesData.data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  // Fallback services if API fails or is empty (for demo purposes)
  if (services.length === 0) {
    services = [
      { id: 1, attributes: { title: 'حسابات التوفير', description: 'نمّ أموالك مع حسابات التوفير المتوافقة مع الشريعة', icon: 'wallet' } },
      { id: 2, attributes: { title: 'التمويل العقاري', description: 'امتلك منزلك الآن مع حلول التمويل المرنة', icon: 'home' } },
      { id: 3, attributes: { title: 'البطاقات الائتمانية', description: 'تسوق بأمان مع بطاقاتنا المصرفية المميزة', icon: 'card' } },
      { id: 4, attributes: { title: 'الخدمات الرقمية', description: 'تحكم بحسابك في أي وقت ومن أي مكان', icon: 'phone' } },
    ];
  }

  return (
    <HomeClient services={services} exchangeRates={exchangeRates} />
  );
}
