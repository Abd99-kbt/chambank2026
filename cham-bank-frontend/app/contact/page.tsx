import { Phone, Mail, MapPin, Printer } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero */}
            <div className="bg-cham-red-dark py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">تواصل معنا</h1>
                    <p className="text-xl opacity-90">نحن هنا لخدمتك والإجابة على استفساراتك</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-cham-navy mb-6">معلومات الاتصال</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-cham-red shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">الإدارة العامة</h3>
                                        <p className="text-gray-600">دمشق، سوريا - أبو رمانة - ساحة النجمة</p>
                                        <p className="text-gray-500 text-sm mt-1">ص.ب: 33979</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-cham-red shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">الهاتف</h3>
                                        <p className="text-gray-600" dir="ltr">+963 11 33919000</p>
                                        <p className="text-gray-600 mt-1"><span className="font-bold text-gray-900">مركز الاتصال:</span> <span dir="ltr">+963 11 9398</span></p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-cham-red shrink-0">
                                        <Printer size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">الفاكس</h3>
                                        <p className="text-gray-600" dir="ltr">+963 11 3348731</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-cham-red shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">البريد الإلكتروني</h3>
                                        <p className="text-gray-600">info@chambank.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-cham-navy p-8 rounded-2xl shadow-lg text-white">
                            <h3 className="text-xl font-bold mb-4">خدمة العملاء</h3>
                            <p className="opacity-90 mb-6">
                                فريق خدمة العملاء جاهز لاستقبال استفساراتكم على مدار الساعة طيلة أيام الأسبوع.
                            </p>
                            <a href="tel:9398" className="flex items-center justify-center gap-2 bg-white text-cham-navy py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                                <Phone size={20} />
                                <span>اتصل على 9398</span>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 h-full">
                            <h2 className="text-2xl font-bold text-cham-navy mb-2">أرسل لنا رسالة</h2>
                            <p className="text-gray-600 mb-8">نشكر اهتمامك ببنك الشام. يرجى ملء النموذج أدناه وسنقوم بالرد عليك في أقرب وقت.</p>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cham-red focus:border-transparent outline-none transition-all" placeholder="الاسم الثلاثي" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                                        <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cham-red focus:border-transparent outline-none transition-all" placeholder="09xxxxxxxx" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cham-red focus:border-transparent outline-none transition-all" placeholder="name@example.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">موضوع الرسالة</label>
                                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cham-red focus:border-transparent outline-none transition-all">
                                        <option>استفسار عام</option>
                                        <option>شكوى</option>
                                        <option>اقتراح</option>
                                        <option>طلب خدمة</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">نص الرسالة</label>
                                    <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cham-red focus:border-transparent outline-none transition-all" placeholder="اكتب رسالتك هنا..."></textarea>
                                </div>

                                <button type="submit" className="w-full bg-cham-red text-white py-4 rounded-lg font-bold text-lg hover:bg-cham-red-dark transition-colors shadow-md hover:shadow-lg">
                                    إرسال الرسالة
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
