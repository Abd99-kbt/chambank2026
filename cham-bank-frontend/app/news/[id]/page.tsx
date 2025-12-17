import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';

// Simulated database
const newsItems = [
    {
        id: 1,
        title: 'بنك الشام يطلق خدمة الدفع الإلكتروني الجديدة',
        date: '2025-01-15',
        author: 'المكتب الإعلامي',
        category: 'تكنولوجيا',
        content: `
            <p>أعلن بنك الشام اليوم عن إطلاق خدمة الدفع الإلكتروني الجديدة عبر تطيقه للهاتف المحمول، والتي تتيح للمتعاملين إمكانية تسديد الفواتير والرسوم الحكومية بكل سهولة ويسر.</p>
            <p>وتأتي هذه الخطوة في إطار استراتيجية البنك للتحول الرقمي وتقديم حلول مصرفية مبتكرة تلبي تطلعات المتعاملين وتواكب التطورات التكنولوجية المتسارعة في القطاع المصرفي.</p>
            <p>وأكد الرئيس التنفيذي للبنك أن الخدمة الجديدة تتميز بأعلى معايير الأمان والسرعة، وستوفر على المتعاملين الوقت والجهد في إنجاز معاملاتهم المالية اليومية.</p>
        `,
        image: '/images/news-1.jpg'
    },
    {
        id: 2,
        title: 'توقيع اتفاقية تعاون مع وزارة الحج والعمرة',
        date: '2024-12-20',
        author: 'العلاقات العامة',
        category: 'اتفاقيات',
        content: `
            <p>وقع بنك الشام مذكرة تفاهم استراتيجية مع وزارة الحج والعمرة، بهدف تسهيل إجراءات الدفع الإلكتروني للحجاج والمعتمرين.</p>
            <p>وبموجب هذه الاتفاقية، سيقوم البنك بتوفير قنوات دفع متعددة وآمنة لتمكين الحجاج من سداد رسوم الخدمات المختلفة بيسر وسهولة، مما يسهم في تحسين تجربتهم وتسهيل رحلتهم الإيمانية.</p>
        `,
        image: '/images/news-2.jpg'
    },
    {
        id: 3,
        title: 'افتتاح الفرع الجديد في منطقة المزة',
        date: '2024-11-05',
        author: 'إدارة الفروع',
        category: 'توسع',
        content: `
            <p>افتتح بنك الشام فرعه الجديد في منطقة المزة بدمشق، وذلك ضمن خطته التوسعية للوصول إلى أكبر شريحة من المتعاملين في مختلف المناطق.</p>
            <p>ويتميز الفرع الجديد بتصميمه العصري وتجهيزاته المتطورة، ويقدم كافة الخدمات المصرفية للأفراد والشركات، بما في ذلك فتح الحسابات، التمويل، والخدمات الإلكترونية.</p>
        `,
        image: '/images/news-3.jpg'
    },
    {
        id: 4,
        title: 'بنك الشام يحصد جائزة أفضل بنك إسلامي في سورية',
        date: '2024-10-10',
        author: 'الجوائز والتقدير',
        category: 'إنجازات',
        content: `
            <p>حصد بنك الشام جائزة "أفضل بنك إسلامي في سورية لعام 2024" من مجلة المصارف العربية، تتويجاً لجهوده المتميزة في تقديم خدمات مصرفية إسلامية رائدة.</p>
            <p>وتعكس هذه الجائزة التزام البنك الراسخ بقيم الصيرفة الإسلامية وحرصه المستمر على تطوير منتجاته وخدماته لتلبية احتياجات السوق المتغيرة.</p>
        `,
        image: '/images/news-4.jpg'
    }
];

export default function NewsDetailPage({ params }: { params: { id: string } }) {
    const newsItem = newsItems.find(item => item.id === parseInt(params.id));

    if (!newsItem) {
        notFound();
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero */}
            <div className="bg-cham-navy py-16 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <p className="text-cham-red font-bold mb-2">{newsItem.category}</p>
                    <h1 className="text-3xl md:text-4xl font-bold max-w-4xl mx-auto leading-normal">{newsItem.title}</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-4xl mx-auto">
                    {/* Meta Data */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-cham-red" />
                            <span>{newsItem.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={18} className="text-cham-red" />
                            <span>{newsItem.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag size={18} className="text-cham-red" />
                            <span>{newsItem.category}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none text-gray-700 leading-loose prose-headings:text-cham-navy prose-a:text-cham-red"
                        dangerouslySetInnerHTML={{ __html: newsItem.content }}
                    />

                    {/* Back Link */}
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <Link href="/news" className="inline-flex items-center text-cham-red font-bold hover:underline">
                            <ArrowLeft size={18} className="ml-2" />
                            العودة إلى قائمة الأخبار
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
