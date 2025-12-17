import { Monitor, Smartphone, MessageSquare } from 'lucide-react';

export default function ElectronicServicesPage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="bg-cham-navy py-16 text-white text-center">
                <h1 className="text-3xl font-bold">الخدمات الإلكترونية</h1>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-10">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                        <Monitor size={50} className="text-cham-red mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-3">الإنترنت المصرفي</h2>
                        <ul className="text-gray-600 text-sm space-y-2 text-right">
                            <li>• كشف حساب فوري.</li>
                            <li>• تحويل بين الحسابات.</li>
                            <li>• تسديد الفواتير.</li>
                        </ul>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                        <Smartphone size={50} className="text-cham-red mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-3">الموبايل البنكي</h2>
                        <ul className="text-gray-600 text-sm space-y-2 text-right">
                            <li>• تطبيق سهل الاستخدام.</li>
                            <li>• الدخول بالبصمة.</li>
                            <li>• إدارة البطاقات.</li>
                        </ul>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                        <MessageSquare size={50} className="text-cham-red mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-3">خدمة الرسائل SMS</h2>
                        <ul className="text-gray-600 text-sm space-y-2 text-right">
                            <li>• إشعارات فورية بالحركات.</li>
                            <li>• تنبيهات الأمان.</li>
                            <li>• معرفة الرصيد.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
