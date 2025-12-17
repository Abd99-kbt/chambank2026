import MapWrapper from "@/components/MapWrapper";

export default function BranchesPage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero */}
            <div className="bg-cham-navy py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">شبكة الفروع</h1>
                    <p className="text-xl opacity-90">منتشرون في كافة المحافظات السورية لخدمتكم</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 border border-gray-100">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-cham-navy mb-4">خريطة الفروع والصرافات</h2>
                        <p className="text-gray-600">يمكنك البحث عن أقرب فرع أو صراف آلي باستخدام الخريطة التفاعلية أدناه.</p>
                    </div>

                    {/* Reuse existing Map Component */}
                    <div className="h-[600px] w-full rounded-xl overflow-hidden border border-gray-200">
                        <MapWrapper />
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Placeholder Branch List - Simulation */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-cham-red mb-2 text-lg">الفرع الرئيسي</h3>
                            <p className="text-gray-600 text-sm mb-2">دمشق - أبو رمانة - ساحة النجمة</p>
                            <p className="text-gray-500 text-sm" dir="ltr">+963 11 33919000</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-cham-red mb-2 text-lg">فرع الحريقة</h3>
                            <p className="text-gray-600 text-sm mb-2">دمشق - الحريقة - جانب قصر العدل</p>
                            <p className="text-gray-500 text-sm" dir="ltr">+963 11 2218890</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-cham-red mb-2 text-lg">فرع حلب</h3>
                            <p className="text-gray-600 text-sm mb-2">حلب - العزيزية - شارع القوتلي</p>
                            <p className="text-gray-500 text-sm" dir="ltr">+963 21 2115500</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-cham-red mb-2 text-lg">فرع اللاذقية</h3>
                            <p className="text-gray-600 text-sm mb-2">اللاذقية - شارع 8 آذار</p>
                            <p className="text-gray-500 text-sm" dir="ltr">+963 41 474400</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-cham-red mb-2 text-lg">فرع حمص</h3>
                            <p className="text-gray-600 text-sm mb-2">حمص - طريق الشام</p>
                            <p className="text-gray-500 text-sm" dir="ltr">+963 31 222333</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-cham-red mb-2 text-lg">فرع حماة</h3>
                            <p className="text-gray-600 text-sm mb-2">حماة - ساحة العاصي</p>
                            <p className="text-gray-500 text-sm" dir="ltr">+963 33 222444</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
