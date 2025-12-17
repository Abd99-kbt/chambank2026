/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
    StrapiResponse,
    Language,
    SliderAttributes,
    ServiceAttributes,
    ProductAttributes,
    NewsAttributes,
    BranchAttributes,
    TeamMemberAttributes,
    InvestorItemAttributes,
    TeamType,
} from './types';

export class StrapiAPI {
    private baseURL: string;

    constructor(baseURL?: string) {
        this.baseURL = baseURL || process.env.NEXT_PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1337';
    }

    private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        try {
            const res = await fetch(`${this.baseURL}/api${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
                ...options,
            });

            if (!res.ok) {
                // Return empty generic response on 404/500 to allow fallbacks to work
                console.warn(`Strapi API Error: ${res.status} ${res.statusText}`);
                return { data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } } as any;
            }

            return res.json();
        } catch (error) {
            // Gracefully handle network errors (e.g. backend offline)
            console.warn('Strapi Connection Failed (Backend likely offline). Using fallback content.');
            return { data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } } as any;
        }
    }

    // Sliders
    async getSliders(locale: Language = 'ar'): Promise<StrapiResponse<SliderAttributes>> {
        const lang = locale === 'ar' ? 'ar' : 'en';
        try {
            const res = await this.fetch<StrapiResponse<SliderAttributes>>(`/sliders?populate=*&filters[isActive][$eq]=true&sort=order:asc&locale=${locale}`);
            if (!res.data || res.data.length === 0) throw new Error('No data');
            return res;
        } catch (e) {
            return { data: MOCK_DATA.sliders[lang], meta: { pagination: { page: 1, pageSize: 2, pageCount: 1, total: 2 } } } as StrapiResponse<SliderAttributes>;
        }
    }

    // Branches
    async getBranches(): Promise<StrapiResponse<BranchAttributes>> {
        return this.fetch<StrapiResponse<BranchAttributes>>('/branches?populate=*');
    }

    async getBranchesByCity(city: string): Promise<StrapiResponse<BranchAttributes>> {
        return this.fetch<StrapiResponse<BranchAttributes>>(`/branches?filters[city][$eq]=${encodeURIComponent(city)}&populate=*`);
    }

    // Products (Accounts, Finance, Cards)
    async getProducts(category: string | null, locale: Language = 'ar'): Promise<StrapiResponse<ProductAttributes>> {
        const lang = locale === 'ar' ? 'ar' : 'en';
        try {
            const filter = category ? `&filters[category][$eq]=${category}` : '';
            const res = await this.fetch<StrapiResponse<ProductAttributes>>(`/products?populate=*${filter}&locale=${locale}`);
            if (!res.data || res.data.length === 0) throw new Error('No data');
            return res;
        } catch (e) {
            if (category === 'accounts') return { data: MOCK_DATA.accounts[lang], meta: { pagination: { page: 1, pageSize: 3, pageCount: 1, total: 3 } } } as StrapiResponse<ProductAttributes>;
            if (category === 'finance') return { data: MOCK_DATA.finance[lang], meta: { pagination: { page: 1, pageSize: 2, pageCount: 1, total: 2 } } } as StrapiResponse<ProductAttributes>;
            return { data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } } as StrapiResponse<ProductAttributes>;
        }
    }

    async getProduct(slug: string, locale: Language = 'ar'): Promise<StrapiResponse<ProductAttributes>> {
        return this.fetch<StrapiResponse<ProductAttributes>>(`/products?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`);
    }

    // Services
    async getServices(locale: Language = 'ar'): Promise<StrapiResponse<ServiceAttributes>> {
        const lang = locale === 'ar' ? 'ar' : 'en';
        try {
            const res = await this.fetch<StrapiResponse<ServiceAttributes>>(`/services?populate=*&filters[isActive][$eq]=true&locale=${locale}`);
            if (!res.data || res.data.length === 0) throw new Error('No data');
            return res;
        } catch (e) {
            return { data: MOCK_DATA.services[lang], meta: { pagination: { page: 1, pageSize: 4, pageCount: 1, total: 4 } } } as StrapiResponse<ServiceAttributes>;
        }
    }

    // News
    async getNews(limit = 10, locale: Language = 'ar'): Promise<StrapiResponse<NewsAttributes>> {
        const lang = locale === 'ar' ? 'ar' : 'en';
        try {
            const res = await this.fetch<StrapiResponse<NewsAttributes>>(`/news?populate=*&filters[isPublished][$eq]=true&sort=publishDate:desc&locale=${locale}&pagination[limit]=${limit}`);
            if (!res.data || res.data.length === 0) throw new Error('No data');
            return res;
        } catch (e) {
            return { data: MOCK_DATA.news[lang], meta: { pagination: { page: 1, pageSize: limit, pageCount: 1, total: 2 } } } as StrapiResponse<NewsAttributes>;
        }
    }

    async getNewsItem(slug: string, locale: Language = 'ar'): Promise<StrapiResponse<NewsAttributes>> {
        return this.fetch<StrapiResponse<NewsAttributes>>(`/news?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`);
    }

    // Exchange Rates
    async getExchangeRates(): Promise<{ rates: Array<{ currency: string; buy: number; sell: number; trend: string }>; lastUpdate: string }> {
        try {
            const res = await this.fetch<{ rates: Array<{ currency: string; buy: number; sell: number; trend: string }>; lastUpdate: string }>('/exchange-rates');
            return res;
        } catch (e) {
            return {
                rates: [
                    { currency: 'USD', buy: 14600, sell: 14750, trend: 'stable' },
                    { currency: 'EUR', buy: 15800, sell: 16000, trend: 'up' },
                    { currency: 'SAR', buy: 3890, sell: 3930, trend: 'stable' },
                    { currency: 'AED', buy: 3970, sell: 4010, trend: 'down' },
                ],
                lastUpdate: new Date().toISOString()
            };
        }
    }

    // New Dynamic Methods
    async getTeam(type: TeamType, locale: Language = 'ar'): Promise<StrapiResponse<TeamMemberAttributes>> {
        const lang = locale === 'ar' ? 'ar' : 'en';
        try {
            const res = await this.fetch<StrapiResponse<TeamMemberAttributes>>(`/${type}?populate=*&locale=${locale}`);
            if (!res.data || res.data.length === 0) throw new Error('No data');
            return res;
        } catch (e) {
            const mockData = MOCK_DATA[type]?.[lang] || [];
            return { data: mockData, meta: { pagination: { page: 1, pageSize: mockData.length, pageCount: 1, total: mockData.length } } } as StrapiResponse<TeamMemberAttributes>;
        }
    }

    async getInvestorsData(locale: Language = 'ar'): Promise<StrapiResponse<InvestorItemAttributes>> {
        const lang = locale === 'ar' ? 'ar' : 'en';
        try {
            const res = await this.fetch<StrapiResponse<InvestorItemAttributes>>(`/investors-items?populate=*&locale=${locale}`);
            if (!res.data || res.data.length === 0) throw new Error('No data');
            return res;
        } catch (e) {
            return { data: MOCK_DATA.investors[lang], meta: { pagination: { page: 1, pageSize: 3, pageCount: 1, total: 3 } } } as StrapiResponse<InvestorItemAttributes>;
        }
    }
}

export const strapiAPI = new StrapiAPI();

// Mock Data for Fallback
const MOCK_DATA = {
    sliders: {
        ar: [
            {
                id: 1,
                attributes: {
                    title: 'ريادة المصرفية الإسلامية',
                    description: 'نقدم لك حلولاً مالية مبتكرة متوافقة مع أحكام الشريعة الإسلامية',
                    link: '/services',
                    buttonText: 'خدماتنا',
                    image: { data: { attributes: { url: '/images/awdea.jpg' } } }
                }
            },
            {
                id: 2,
                attributes: {
                    title: 'تمويلك العقاري أصبح أسهل',
                    description: 'امتلك منزل أحلامك مع برامج التمويل العقاري الميسرة',
                    link: '/products/real-estate',
                    buttonText: 'اعرف المزيد',
                    image: { data: { attributes: { url: '/images/najmaty.jpg' } } }
                }
            }
        ],
        en: [
            {
                id: 1,
                attributes: {
                    title: 'Leading Islamic Banking',
                    description: 'Providing innovative financial solutions compliant with Islamic Sharia.',
                    link: '/services',
                    buttonText: 'Our Services',
                    image: { data: { attributes: { url: '/images/awdea.jpg' } } }
                }
            },
            {
                id: 2,
                attributes: {
                    title: 'Real Estate Finance Made Easy',
                    description: 'Own your dream home with our easy real estate finance programs.',
                    link: '/products/real-estate',
                    buttonText: 'Know More',
                    image: { data: { attributes: { url: '/images/najmaty.jpg' } } }
                }
            }
        ]
    },
    services: {
        ar: [
            { id: 1, attributes: { title: 'الموبايل البنكي', description: 'تطبيق Cham Mobile يضع خدمات البنك بين يديك. إدارة حساباتك، تحويل الأموال، دفع الفواتير.', icon: 'Smartphone', slug: 'mobile-banking' } },
            { id: 2, attributes: { title: 'الإنترنت المصرفي', description: 'منصة Cham Online للشركات والأفراد. تحكم كامل بحساباتك وتنفيذ عملياتك المصرفية بأمان.', icon: 'Monitor', slug: 'online-banking' } },
            { id: 3, attributes: { title: 'خدمة الرسائل', description: 'ابق على اطلاع دائم بحركات حسابك. استقبل إشعارات فورية عند السحب والإيداع.', icon: 'MessageSquare', slug: 'sms' } },
            { id: 4, attributes: { title: 'الدفع الإلكتروني', description: 'سدد فواتيرك ومدفوعاتك الحكومية والتعليمية بكل سهولة عبر قنواتنا الإلكترونية.', icon: 'CreditCard', slug: 'e-payment' } }
        ],
        en: [
            { id: 1, attributes: { title: 'Mobile Banking', description: 'Cham Mobile app puts bank services in your hands. Manage accounts, transfer money, pay bills.', icon: 'Smartphone', slug: 'mobile-banking' } },
            { id: 2, attributes: { title: 'Online Banking', description: 'Cham Online platform for corporates and individuals. Full control over your accounts securely.', icon: 'Monitor', slug: 'online-banking' } },
            { id: 3, attributes: { title: 'SMS Service', description: 'Stay updated with your account movements. Receive instant notifications for withdrawals and deposits.', icon: 'MessageSquare', slug: 'sms' } },
            { id: 4, attributes: { title: 'E-Payment', description: 'Pay your bills and government fees easily through our electronic channels.', icon: 'CreditCard', slug: 'e-payment' } }
        ]
    },
    accounts: {
        ar: [
            { id: 1, attributes: { title: 'الحساب الجاري', description: 'حساب يلبي احتياجاتك المصرفية اليومية بمرونة عالية.', icon: 'Wallet', category: 'accounts', features: 'متوافق مع الشريعة\nدفتر شيكات\nبطاقة صراف' } },
            { id: 2, attributes: { title: 'حساب التوفير', description: 'استثمر مدخراتك بطريقة آمنة ومتوافقة مع الشريعة الإسلامية.', icon: 'Coins', category: 'accounts', features: 'أرباح تنافسية\nحرية سحب وإيداع\nتوزيع ربع سنوي' } },
            { id: 3, attributes: { title: 'الودائع لأجل', description: 'ودائع استثمارية لمدد محددة تمنحك عوائد أعلى.', icon: 'Landmark', category: 'accounts', features: 'فترات مرنة\nعوائد مجزية\nتجديد تلقائي' } }
        ],
        en: [
            { id: 1, attributes: { title: 'Current Account', description: 'An account that meets your daily banking needs with high flexibility.', icon: 'Wallet', category: 'accounts', features: 'Sharia Compliant\nCheckbook\nATM Card' } },
            { id: 2, attributes: { title: 'Savings Account', description: 'Invest your savings in a safe and Sharia-compliant way.', icon: 'Coins', category: 'accounts', features: 'Competitive Profits\nWithdraw/Deposit Freedom\nQuarterly Distribution' } },
            { id: 3, attributes: { title: 'Term Deposits', description: 'Investment deposits for fixed terms giving you higher returns.', icon: 'Landmark', category: 'accounts', features: 'Flexible Terms\nLucrative Returns\nAuto Renewal' } }
        ]
    },
    finance: {
        ar: [
            { id: 1, attributes: { title: 'التمويل العقاري', description: 'امتلك منزل أحلامك الآن مع حلول التمويل العقاري المتوافقة مع الشريعة.', icon: 'Home', category: 'finance', features: 'حتى 25 سنة\nتمويل 80%\nإجارة منتهية بالتمليك' } },
            { id: 2, attributes: { title: 'تمويل السيارات', description: 'انطلق بسيارتك الجديدة بكل سهولة مع برنامج تمويل السيارات.', icon: 'Car', category: 'finance', features: 'حتى 5 سنوات\nمرابحة للأمر بالشراء\nسرعة في الإنجاز' } }
        ],
        en: [
            { id: 1, attributes: { title: 'Real Estate Finance', description: 'Own your dream home now with Sharia-compliant real estate finance solutions.', icon: 'Home', category: 'finance', features: 'Up to 25 years\n80% Financing\nIjara with Ownership' } },
            { id: 2, attributes: { title: 'Auto Finance', description: 'Drive your new car easily with our auto finance program.', icon: 'Car', category: 'finance', features: 'Up to 5 years\nMurabaha\nFast Processing' } }
        ]
    },
    cards: {
        ar: [
            { id: 1, attributes: { title: 'البطاقة الذهبية', description: 'بطاقة ائتمانية بحدود عالية ومرونة في السداد.', icon: 'CreditCard', category: 'cards', features: 'سقف ائتماني مرتفع\nدخول صالات كبار الزوار\nخصومات حصرية' } },
            { id: 2, attributes: { title: 'بطاقة المشتريات', description: 'تسوق الآن وادفع لاحقاً بأقساط ميسرة.', icon: 'ShoppingBag', category: 'cards', features: 'تقسيط بسعر الكاش\nمقبولة عالمياً\nفترة سماح 50 يوم' } }
        ],
        en: [
            { id: 1, attributes: { title: 'Gold Card', description: 'Credit card with high limits and flexible repayment.', icon: 'CreditCard', category: 'cards', features: 'High Credit Limit\nVIP Lounge Access\nExclusive Discounts' } },
            { id: 2, attributes: { title: 'Shopping Card', description: 'Shop now and pay later with easy installments.', icon: 'ShoppingBag', category: 'cards', features: '0% Installments\nGlobally Accepted\n50 Days Grace Period' } }
        ]
    },
    news: {
        ar: [
            { id: 1, attributes: { title: 'بنك الشام يطلق خدمة الدفع الإلكتروني', description: 'أعلن بنك الشام عن إطلاق خدمة الدفع الإلكتروني الجديدة لطلاب الجامعات...', date: '2024-03-15', image: { data: { attributes: { url: '/images/news1.jpg' } } } } },
            { id: 2, attributes: { title: 'افتتاح الفرع الجديد في حلب', description: 'ضمن خطة التوسع والانتشار، تم افتتاح فرع جديد في مدينة حلب...', date: '2024-02-20', image: { data: { attributes: { url: '/images/news2.jpg' } } } } }
        ],
        en: [
            { id: 1, attributes: { title: 'Cham Bank Launches E-Payment Service', description: 'Cham Bank announced the launch of the new electronic payment service for university students...', date: '2024-03-15', image: { data: { attributes: { url: '/images/news1.jpg' } } } } },
            { id: 2, attributes: { title: 'New Branch Opening in Aleppo', description: 'As part of the expansion plan, a new branch was opened in Aleppo city...', date: '2024-02-20', image: { data: { attributes: { url: '/images/news2.jpg' } } } } }
        ]
    },
    corporate: {
        ar: [
            { id: 1, attributes: { title: 'حلول التجارة الخارجية', description: 'خدمات شاملة للاستيراد والتصدير، اعتمادات مستندية وتحصيل مستندي.', icon: 'Globe', category: 'corporate', features: 'شبكة مراسلين عالمية\nسرعة في التنفيذ\nاستشارات تجارية' } },
            { id: 2, attributes: { title: 'تمويل رأس المال العامل', description: 'سيولة نقدية تغطي احتياجاتك التشغيلية وتضمن استمرارية أعمالك.', icon: 'Briefcase', category: 'corporate', features: 'صيغ تمويل مرنة\nفترات سداد مريحة\nمعدلات ربح منافسة' } },
            { id: 3, attributes: { title: 'إدارة النقد والسيولة', description: 'حلول ذكية لإدارة تدفقاتك النقدية وتحصيل مستحقاتك بكفاءة.', icon: 'Coins', category: 'corporate', features: 'تحصيل شيكات\nرواتب الموظفين\nدفع الفواتير' } }
        ],
        en: [
            { id: 1, attributes: { title: 'Trade Finance Solutions', description: 'Comprehensive import/export services, letters of credit and documentary collections.', icon: 'Globe', category: 'corporate', features: 'Global Correspondent Network\nFast Execution\nTrade Advisory' } },
            { id: 2, attributes: { title: 'Working Capital Finance', description: 'Cash liquidity to cover your operational needs and ensure business continuity.', icon: 'Briefcase', category: 'corporate', features: 'Flexible Financing\nComfortable Repayment\nCompetitive Rates' } },
            { id: 3, attributes: { title: 'Cash Management', description: 'Smart solutions to manage your cash flows and collect receivables efficiently.', icon: 'Coins', category: 'corporate', features: 'Check Collection\nPayroll Services\nBill Payments' } }
        ]
    },
    investors: {
        ar: [
            { id: 1, attributes: { title: 'النتائج المالية', description: 'اطلع على أحدث التقارير المالية والبيانات المرحلية والسنوية.', icon: 'BarChart', category: 'investors', link: '/investor-relations/reports' } },
            { id: 2, attributes: { title: 'حوكمة الشركات', description: 'التزامنا بأعلى معايير الإفصاح والشفافية وحماية حقوق المساهمين.', icon: 'ShieldCheck', category: 'investors', link: '/governance' } },
            { id: 3, attributes: { title: 'معلومات السهم', description: 'تابع أداء سهم بنك الشام وبيانات التداول في سوق دمشق للأوراق المالية.', icon: 'TrendingUp', category: 'investors', link: '/investor-relations/stock' } }
        ],
        en: [
            { id: 1, attributes: { title: 'Financial Results', description: 'View the latest financial reports, interim and annual statements.', icon: 'BarChart', category: 'investors', link: '/investor-relations/reports' } },
            { id: 2, attributes: { title: 'Corporate Governance', description: 'Our commitment to highest standards of disclosure, transparency and shareholder rights.', icon: 'ShieldCheck', category: 'investors', link: '/governance' } },
            { id: 3, attributes: { title: 'Stock Information', description: 'Track Cham Bank stock performance and trading data at DSE.', icon: 'TrendingUp', category: 'investors', link: '/investor-relations/stock' } }
        ]
    },
    founders: {
        ar: [
            { id: 1, attributes: { name: 'المصرف التجاري السوري', role: 'شريك استراتيجي', description: 'أكبر المصارف السورية الحكومية، يمتلك خبرة عريقة في العمل المصرفي.' } },
            { id: 2, attributes: { name: 'الشركة الكويتية للاستثمار', role: 'شريك مؤسس', description: 'شركة رائدة في مجال الاستثمار والخدمات المالية في دولة الكويت.' } },
            { id: 3, attributes: { name: 'مجموعة من رجال الأعمال السوريين', role: 'مساهمون', description: 'نخبة من كبار رجال الأعمال والصناعيين في سورية.' } }
        ],
        en: [
            { id: 1, attributes: { name: 'Commercial Bank of Syria', role: 'Strategic Partner', description: 'The largest Syrian state-owned bank, with extensive banking experience.' } },
            { id: 2, attributes: { name: 'Kuwait Investment Company', role: 'Founding Partner', description: 'A leading company in investment and financial services in Kuwait.' } },
            { id: 3, attributes: { name: 'Group of Syrian Businessmen', role: 'Shareholders', description: 'Elite group of major businessmen and industrialists in Syria.' } }
        ]
    },
    board: {
        ar: [
            { id: 1, attributes: { name: 'السيد علي الزغبي', role: 'رئيس مجلس الإدارة', bio: 'خبرة تزيد عن 30 عاماً في العمل المصرفي الإسلامي.' } },
            { id: 2, attributes: { name: 'د. محمد الحسين', role: 'نائب رئيس مجلس الإدارة', bio: 'وزير المالية الأسبق، وخبير اقتصادي بارز.' } },
            { id: 3, attributes: { name: 'السيد أحمد السالم', role: 'عضو مجلس إدارة', bio: 'ممثل عن القطاع الخاص، ورجل أعمال.' } },
            { id: 4, attributes: { name: 'السيدة ريم العرب', role: 'عضو مجلس إدارة', bio: 'خبيرة في إدارة المخاطر المالية.' } }
        ],
        en: [
            { id: 1, attributes: { name: 'Mr. Ali Al-Zoghbi', role: 'Chairman', bio: 'Over 30 years of experience in Islamic banking.' } },
            { id: 2, attributes: { name: 'Dr. Mohammad Al-Hussein', role: 'Vice Chairman', bio: 'Former Minister of Finance, prominent economist.' } },
            { id: 3, attributes: { name: 'Mr. Ahmed Al-Salem', role: 'Board Member', bio: 'Private sector representative, businessman.' } },
            { id: 4, attributes: { name: 'Ms. Reem Al-Arab', role: 'Board Member', bio: 'Expert in financial risk management.' } }
        ]
    },
    sharia: {
        ar: [
            { id: 1, attributes: { name: 'أ.د. عبد الستار أبو غدة', role: 'رئيس الهيئة', bio: 'عالم بارز في فقه المعاملات المالية الإسلامية.' } },
            { id: 2, attributes: { name: 'د. محمد توفيق رمضان', role: 'عضو الهيئة', bio: 'أستاذ الفقه المقارن في جامعة دمشق.' } },
            { id: 3, attributes: { name: 'الشيخ عبد الرزاق السيروان', role: 'عضو الهيئة', bio: 'باحث ومحقق في العلوم الشرعية.' } }
        ],
        en: [
            { id: 1, attributes: { name: 'Prof. Dr. Abdul Sattar Abu Ghuddah', role: 'Chairman', bio: 'Prominent scholar in Islamic financial jurisprudence.' } },
            { id: 2, attributes: { name: 'Dr. Mohammad Tawfiq Ramadan', role: 'Member', bio: 'Professor of Comparative Jurisprudence at Damascus University.' } },
            { id: 3, attributes: { name: 'Sheikh Abdul Razzaq Al-Sirwan', role: 'Member', bio: 'Researcher in Sharia sciences.' } }
        ]
    }
};
