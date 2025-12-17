import ExchangeRatesTable from '@/components/ExchangeRatesTable';

export default function RatesPage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero */}
            <div className="bg-cham-navy py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">أسعار الصرف</h1>
                    <p className="text-xl opacity-90">نشرة أسعار صرف العملات الأجنبية المعتمدة</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-cham-navy mb-2">النشرة اليومية</h2>
                            <p className="text-gray-500">يتم تحديث الأسعار يومياً وفقاً لنشرة مصرف سوريا المركزي</p>
                        </div>
                        <ExchangeRatesTable />
                    </div>

                    <div className="mt-8 text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-cham-navy font-bold">ملاحظة هامة</p>
                        <p className="text-gray-600 text-sm mt-2">الأسعار المعروضة هي للأغراض المعلوماتية فقط وقد تتغير دون إشعار مسبق. يرجى مراجعة أقرب فرع للتأكد من الأسعار الحالية.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
