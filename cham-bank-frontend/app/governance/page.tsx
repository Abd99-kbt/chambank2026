import Link from 'next/link';
import { ShieldCheck, Gavel, Users, FileText } from 'lucide-react';

export default function GovernancePage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero */}
            <div className="bg-cham-navy py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">الحوكمة والشفافية</h1>
                    <p className="text-xl opacity-90">ملتزمون بأعلى معايير الإفصاح والنزاهة المؤسسية</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link href="/about/board" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group flex items-start gap-6">
                        <div className="w-16 h-16 bg-blue-50 text-cham-navy rounded-xl flex items-center justify-center shrink-0">
                            <Users size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-cham-navy mb-2 group-hover:text-cham-red transition-colors">مجلس الإدارة</h2>
                            <p className="text-gray-600">تعرف على أعضاء مجلس الإدارة ودورهم في رسم السياسات الاستراتيجية للبنك.</p>
                        </div>
                    </Link>

                    <Link href="/about/sharia" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group flex items-start gap-6">
                        <div className="w-16 h-16 bg-green-50 text-green-700 rounded-xl flex items-center justify-center shrink-0">
                            <Gavel size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-cham-navy mb-2 group-hover:text-cham-red transition-colors">هيئة الرقابة الشرعية</h2>
                            <p className="text-gray-600">الهيئة المستقلة المسؤولة عن ضمان توافق جميع أعمال البنك مع أحكام الشريعة.</p>
                        </div>
                    </Link>

                    <Link href="/investor-relations" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group flex items-start gap-6">
                        <div className="w-16 h-16 bg-red-50 text-cham-red rounded-xl flex items-center justify-center shrink-0">
                            <FileText size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-cham-navy mb-2 group-hover:text-cham-red transition-colors">التقارير المالية</h2>
                            <p className="text-gray-600">التقارير السنوية والربعية التي توضح الأداء المالي للبنك بشفافية.</p>
                        </div>
                    </Link>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-6">
                        <div className="w-16 h-16 bg-gray-50 text-gray-600 rounded-xl flex items-center justify-center shrink-0">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-cham-navy mb-2">دليل الحوكمة</h2>
                            <p className="text-gray-600 mb-4">وثيقة توضح السياسات والإجراءات المعتمدة لضمان الإدارة الرشيدة.</p>
                            <span className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">تحميل PDF (قريباً)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
