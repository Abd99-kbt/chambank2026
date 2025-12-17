import { FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LCsPage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="bg-cham-navy py-16 text-white text-center">
                <h1 className="text-3xl font-bold">الاعتمادات المستندية</h1>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-white p-10 rounded-2xl shadow-lg max-w-4xl mx-auto">
                    <Link href="/corporate" className="flex items-center text-gray-500 mb-8 hover:text-cham-red">
                        <ArrowRight size={20} className="ml-2" />
                        العودة لخدمات الشركات
                    </Link>

                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        تعتبر الاعتمادات المستندية من أهم الوسائل المستخدمة في تمويل التجارة الخارجية، حيث يقوم البنك بدور الوسيط الضامن بين المستورد والمصدر. نقدم في بنك الشام:
                    </p>

                    <div className="grid gap-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-3 rounded-lg text-cham-navy"><FileText size={24} /></div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">الاعتمادات الصادرة (الاستيراد)</h3>
                                <p className="text-gray-600">فتح اعتمادات لتسهيل استيراد البضائع وضمان وصول المستندات المطابقة للشروط.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-3 rounded-lg text-cham-navy"><FileText size={24} /></div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">الاعتمادات الواردة (التصدير)</h3>
                                <p className="text-gray-600">تبليغ وتعزيز الاعتمادات الواردة لصالح المصدرين المحليين لضمان حقوقهم المالية.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
