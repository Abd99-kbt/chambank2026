import Link from 'next/link';
import { Wallet, Home, Building2, CreditCard, Smartphone, ArrowLeft } from 'lucide-react';

export default function ProductsPage() {
    const categories = [
        {
            title: 'الحسابات والودائع',
            description: 'باقة متنوعة من الحسابات المصرفية المتوافقة مع الشريعة الإسلامية لتلبية احتياجاتك اليومية والادخارية.',
            icon: <Wallet size={40} />,
            href: '/accounts',
            color: 'bg-blue-50 text-blue-600'
        },
        {
            title: 'منتجات التمويل',
            description: 'حلول تمويلية مرنة للأفراد بصيغ المرابحة والمساومة والإجارة، لتمويل السيارات والعقارات والاحتياجات الشخصية.',
            icon: <Home size={40} />,
            href: '/finance',
            color: 'bg-green-50 text-green-600'
        },
        {
            title: 'خدمات الشركات',
            description: 'شريكك الاستراتيجي لنمو أعمالك من خلال الاعتمادات المستندية، الكفالات، وتمويل المشاريع.',
            icon: <Building2 size={40} />,
            href: '/corporate',
            color: 'bg-purple-50 text-purple-600'
        },
        {
            title: 'البطاقات المصرفية',
            description: 'تمتع بقوة شرائية ومرونة في الدفع محلياً وعالمياً مع باقة بطاقات بنك الشام.',
            icon: <CreditCard size={40} />,
            href: '/cards',
            color: 'bg-red-50 text-red-600'
        },
        {
            title: 'الخدمات الإلكترونية',
            description: 'أنجز معاملاتك المصرفية في أي وقت ومن أي مكان عبر قنواتنا الرقمية المتطورة.',
            icon: <Smartphone size={40} />,
            href: '/services',
            color: 'bg-yellow-50 text-yellow-600'
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero */}
            <div className="bg-cham-navy py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">المنتجات والخدمات</h1>
                    <p className="text-xl opacity-90">حلول مصرفية متكاملة تناسب طموحاتك</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, idx) => (
                        <Link key={idx} href={category.href} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${category.color}`}>
                                {category.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-cham-navy mb-3 group-hover:text-cham-red transition-colors">{category.title}</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {category.description}
                            </p>
                            <div className="flex items-center text-cham-red font-bold text-sm">
                                <span>استكشف المزيد</span>
                                <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
