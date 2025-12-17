import IslamicCalculator from '@/components/IslamicCalculator';

export default function CalculatorPage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero */}
            <div className="bg-cham-navy py-16 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">حاسبة التمويل الإسلامي</h1>
                    <p className="text-xl opacity-90">خطط لتمويلك المستقبلي بكل دقة ووضوح</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden bg-white">
                    <IslamicCalculator />
                </div>

                <div className="max-w-4xl mx-auto mt-8 text-center bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                    <p className="text-gray-700 font-bold">ملاحظة:</p>
                    <p className="text-sm text-gray-600 mt-2">
                        الأرقام الناتجة عن هذه الحاسبة هي تقديرية ولأغراض الاسترشاد فقط. يرجى زيارة أقرب فرع للحصول على العرض المالي النهائي والدقيق.
                    </p>
                </div>
            </div>
        </div>
    );
}
