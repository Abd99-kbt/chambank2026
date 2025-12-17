import { Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function GuaranteesPage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="bg-cham-navy py-16 text-white text-center">
                <h1 className="text-3xl font-bold">الكفالات المصرفية</h1>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-white p-10 rounded-2xl shadow-lg max-w-4xl mx-auto">
                    <Link href="/corporate" className="flex items-center text-gray-500 mb-8 hover:text-cham-red">
                        <ArrowRight size={20} className="ml-2" />
                        العودة لخدمات الشركات
                    </Link>

                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        يصدر بنك الشام جميع أنواع الكفالات المصرفية التي تحتاجها الشركات والمؤسسات للمشاركة في المناقصات وتنفيذ العقود، محلياً ودولياً.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="border border-gray-100 p-6 rounded-xl hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-cham-red text-lg mb-3">كفالة دخول مناقصة (Bid Bond)</h3>
                            <p className="text-gray-600">ضمان جدية المشاركة في العطاءات والمناقصات الحكومية والخاصة.</p>
                        </div>
                        <div className="border border-gray-100 p-6 rounded-xl hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-cham-red text-lg mb-3">كفالة حسن تنفيذ (Performance Bond)</h3>
                            <p className="text-gray-600">ضمان الالتزام بتنفيذ شروط العقد المبرم مع الجهة المستفيدة.</p>
                        </div>
                        <div className="border border-gray-100 p-6 rounded-xl hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-cham-red text-lg mb-3">كفالة الدفعة المقدمة (Advance Payment)</h3>
                            <p className="text-gray-600">ضمان استرداد الدفعات المقدمة في حال عدم التزام المقاول بالتنفيذ.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
