import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Logo with spinning ring */}
        <div className="relative w-32 h-32">
          {/* Logo with pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/logo.svg"
              alt="Cham Bank Logo"
              width={100}
              height={100}
              className="animate-pulse-ring relative z-10"
            />
          </div>

          {/* Spinning ring 1 */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-cham-red border-t-transparent" style={{ animationDuration: '1s' }}></div>

          {/* Spinning ring 2 - counter rotation */}
          <div className="absolute inset-2 rounded-full border-4 border-cham-gold/30 border-b-transparent" style={{ animation: 'spin 1.5s linear infinite reverse' }}></div>

          {/* Pulse background */}
          <div className="absolute inset-0 bg-cham-red/10 rounded-full animate-ping"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <div className="text-cham-red-dark font-bold text-2xl mb-2 animate-fade-in">
            بنك الشام
          </div>
          <div className="text-cham-gold text-sm font-medium animate-fade-in">
            جاري التحميل...
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cham-red via-cham-gold to-cham-red animate-shimmer rounded-full"
            style={{ backgroundSize: '200% 100%' }}>
          </div>
        </div>
      </div>
    </div>
  );
}