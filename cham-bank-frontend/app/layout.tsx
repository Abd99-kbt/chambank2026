import type { Metadata } from "next";
import { Reem_Kufi, Poppins } from "next/font/google";
import "./globals.css";

const reemKufi = Reem_Kufi({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-reem-kufi",
  display: 'swap',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "بنك الشام الإسلامي | Cham Bank",
  description: "الريادة في المصرفية الإسلامية - تجربة مصرفية عصرية متوافقة مع أحكام الشريعة",
  icons: {
    icon: '/favicon.ico',
  }
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${reemKufi.variable} ${poppins.variable} antialiased font-arabic bg-gray-50 flex flex-col min-h-screen`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
