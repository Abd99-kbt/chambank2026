import { NextResponse } from 'next/server';

// Rate limiting (simple in-memory store for demo)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // 20 requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = requestCounts.get(ip);

    if (!record || now > record.resetTime) {
        requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

function sanitizeMessage(message: string): string {
    if (typeof message !== 'string') return '';
    return message.trim().substring(0, 1000); // Limit to 1000 characters
}

// FAQ Database - bilingual Q&A about Cham Bank
const FAQ_DATABASE = {
    ar: [
        {
            keywords: ['حساب', 'حسابات', 'فتح حساب', 'أنواع الحسابات'],
            question: 'ما هي أنواع الحسابات المتاحة؟',
            answer: 'يقدم بنك الشام ثلاثة أنواع من الحسابات:\n\n1️⃣ الحساب الجاري: سحب وإيداع مرن، دفتر شيكات، بطاقة صراف.\n2️⃣ حساب التوفير: استثمار بالمضاربة، توزيع أرباح ربع سنوي.\n3️⃣ حساب الرواتب: توطين رواتب مع ميزات تمويلية.\n\nيمكنك زيارة /accounts للمزيد من التفاصيل.'
        },
        {
            keywords: ['تمويل', 'قرض', 'مرابحة', 'إجارة', 'سيارة', 'عقار'],
            question: 'ما هي خدمات التمويل المتاحة؟',
            answer: 'نقدم حلول تمويل إسلامية متنوعة:\n\n🚗 تمويل السيارات (مرابحة)\n🏠 تمويل العقارات (إجارة منتهية بالتمليك)\n🛍️ تمويل السلع الشخصية\n💼 تمويل المشاريع الصغيرة\n\nجميع منتجاتنا متوافقة مع الشريعة الإسلامية. للتفاصيل: /finance'
        },
        {
            keywords: ['بطاقة', 'بطاقات', 'فيزا', 'ماستركارد', 'صراف'],
            question: 'ما هي أنواع البطاقات؟',
            answer: 'نوفر 4 أنواع من البطاقات:\n\n💳 البطاقة الذهبية: سقف عالي + خدمات مطارات\n🛒 بطاقة المشتريات: دفع محلي آمن\n✈️ بطاقة المسافر: عملات متعددة\n🌐 بطاقة الإنترنت: تسوق إلكتروني\n\nلمعرفة المزيد: /cards'
        },
        {
            keywords: ['فرع', 'فروع', 'عنوان', 'موقع', 'أين'],
            question: 'أين تقع الفروع؟',
            answer: 'لدينا شبكة واسعة من الفروع في سورية:\n\n📍 15 فرعاً منتشرة في المحافظات\n🏧 25 صراف آلي (ATM)\n📱 خدمة E-Bank متاحة 24/7\n\nلرؤية الخريطة والعناوين: /branches'
        },
        {
            keywords: ['شريعة', 'إسلامي', 'حلال', 'حرام', 'فتوى', 'هيئة'],
            question: 'هل الخدمات متوافقة مع الشريعة؟',
            answer: 'نعم! 🕌 بنك الشام هو أول بنك إسلامي في سورية تأسس عام 2006.\n\nجميع منتجاتنا:\n✅ خاضعة لهيئة رقابة شرعية متخصصة\n✅ معتمدة بفتاوى شرعية\n✅ خالية من الربا والمعاملات المحرمة\n\nللمزيد: /about/sharia'
        },
        {
            keywords: ['تواصل', 'اتصال', 'هاتف', 'ايميل', 'بريد'],
            question: 'كيف أتواصل مع البنك؟',
            answer: '📞 هاتف: +963 11 9392\n📧 Email: info@chambank.com\n📍 العنوان: دمشق - تنظيم كفرسوسة\n🌐 E-Bank: https://ebank.chambank.com\n\nأو زر صفحة /contact'
        },
        {
            keywords: ['توظيف', 'وظيفة', 'عمل', 'careers'],
            question: 'كيف أتقدم لوظيفة؟',
            answer: 'نرحب بانضمامك لفريقنا! 🎯\n\nللتقديم على الوظائف المتاحة:\n🔗 https://apps.chambank.com/careers/forms/Main\n\nأو استخدم أيقونة "التوظيف" في الشريط العلوي.'
        },
        {
            keywords: ['e-bank', 'اونلاين', 'انترنت', 'تطبيق', 'موبايل'],
            question: 'كيف أستخدم الخدمات الإلكترونية؟',
            answer: '📱 خدماتنا الرقمية:\n\n🌐 E-Bank على الويب\n📲 تطبيق الجوال (iOS & Android)\n💻 إدارة حساباتك 24/7\n🔒 حماية قصوى وتشفير\n\nللوصول: https://ebank.chambank.com'
        }
    ],
    en: [
        {
            keywords: ['account', 'accounts', 'open account', 'types'],
            question: 'What types of accounts are available?',
            answer: 'Cham Bank offers three types of accounts:\n\n1️⃣ Current Account: Flexible deposits/withdrawals, checkbook, ATM card.\n2️⃣ Savings Account: Investment via Mudaraba, quarterly profit distribution.\n3️⃣ Salary Account: Employee salary domiciliation with financing features.\n\nVisit /accounts for details.'
        },
        {
            keywords: ['finance', 'loan', 'murabaha', 'ijara', 'car', 'property'],
            question: 'What financing services are available?',
            answer: 'We offer diverse Islamic financing:\n\n🚗 Car Financing (Murabaha)\n🏠 Property Financing (Ijara ending in ownership)\n🛍️ Personal Goods Financing\n💼 SME Project Financing\n\nAll Sharia-compliant. Details: /finance'
        },
        {
            keywords: ['card', 'cards', 'visa', 'mastercard', 'atm'],
            question: 'What types of cards do you offer?',
            answer: 'We provide 4 card types:\n\n💳 Gold Card: High limit + airport services\n🛒 Shopping Card: Safe local payments\n✈️ Travel Card: Multi-currency\n🌐 Internet Card: Secure e-commerce\n\nLearn more: /cards'
        },
        {
            keywords: ['branch', 'branches', 'address', 'location', 'where'],
            question: 'Where are your branches?',
            answer: 'Wide network across Syria:\n\n📍 15 branches nationwide\n🏧 25 ATMs\n📱 E-Bank available 24/7\n\nSee map: /branches'
        },
        {
            keywords: ['sharia', 'islamic', 'halal', 'haram', 'fatwa'],
            question: 'Are services Sharia-compliant?',
            answer: 'Yes! 🕌 Cham Bank is Syria\'s first Islamic bank (est. 2006).\n\nAll products:\n✅ Supervised by specialized Sharia board\n✅ Certified by fatwas\n✅ Free from riba and prohibited transactions\n\nMore: /about/sharia'
        },
        {
            keywords: ['contact', 'call', 'phone', 'email'],
            question: 'How do I contact the bank?',
            answer: '📞 Phone: +963 11 9392\n📧 Email: info@chambank.com\n📍 Address: Damascus - Kafarsouseh\n🌐 E-Bank: https://ebank.chambank.com\n\nOr visit /contact'
        }
    ]
};

// Simple keyword matching function
function findBestMatch(userMessage: string, language: 'ar' | 'en' = 'ar') {
    const faqList = FAQ_DATABASE[language];
    const messageLower = userMessage.toLowerCase();

    // Find FAQ with matching keywords
    for (const faq of faqList) {
        if (faq.keywords.some(keyword => messageLower.includes(keyword))) {
            return faq.answer;
        }
    }

    // Default response if no match
    return language === 'ar'
        ? 'شكراً لتواصلك! 🙏\n\nيمكنني مساعدتك بـ:\n\n• الحسابات والخدمات المصرفية\n• التمويل والبطاقات\n• مواقع الفروع\n• التوظيف والتواصل\n\nجرب سؤالاً أكثر تحديداً أو تصفح الموقع للمزيد!'
        : 'Thank you for reaching out! 🙏\n\nI can help with:\n\n• Accounts & services\n• Financing & cards\n• Branch locations\n• Careers & contact\n\nTry a more specific question or browse the site!';
}

export async function POST(req: Request) {
    try {
        // Rate limiting
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await req.json();
        const rawMessage = body.message;

        // Input validation
        if (!rawMessage || typeof rawMessage !== 'string') {
            return NextResponse.json(
                { error: 'Message is required and must be a string' },
                { status: 400 }
            );
        }

        const message = sanitizeMessage(rawMessage);

        if (message.length === 0) {
            return NextResponse.json(
                { error: 'Message cannot be empty' },
                { status: 400 }
            );
        }

        // Detect language (simple heuristic: if Arabic characters present, use Arabic)
        const isArabic = /[\u0600-\u06FF]/.test(message);
        const language = isArabic ? 'ar' : 'en';

        // Get response from FAQ database
        const responseContent = findBestMatch(message, language);

        // Simulate slight delay for natural feel
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json({ content: responseContent });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
