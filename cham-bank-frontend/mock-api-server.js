const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 1337;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security: Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// CORS Configuration - More secure
const corsOptions = {
    origin: NODE_ENV === 'production' 
        ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://chambank.com']
        : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Security Headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    if (NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    next();
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);

// Input Validation Helper
function validateLocale(locale) {
    return locale === 'ar' || locale === 'en' ? locale : 'ar';
}

function validateCategory(category) {
    const validCategories = ['accounts', 'finance', 'cards'];
    return validCategories.includes(category) ? category : null;
}

function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.trim().substring(0, 500); // Limit length
}

// Mock data matching Strapi structure
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
                    image: { data: { attributes: { url: '/images/awdea.jpg' } } },
                    isActive: true,
                    order: 1
                }
            },
            {
                id: 2,
                attributes: {
                    title: 'تمويلك العقاري أصبح أسهل',
                    description: 'امتلك منزل أحلامك مع برامج التمويل العقاري الميسرة',
                    link: '/finance',
                    buttonText: 'اعرف المزيد',
                    image: { data: { attributes: { url: '/images/najmaty.jpg' } } },
                    isActive: true,
                    order: 2
                }
            },
            {
                id: 3,
                attributes: {
                    title: 'خدماتنا المصرفية المتكاملة',
                    description: 'استمتع بمجموعة شاملة من الخدمات المصرفية الآمنة والمبتكرة',
                    link: '/services',
                    buttonText: 'اكتشف الخدمات',
                    image: { data: { attributes: { url: '/images/mutanakel.jpg' } } },
                    isActive: true,
                    order: 3
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
                    image: { data: { attributes: { url: '/images/awdea.jpg' } } },
                    isActive: true,
                    order: 1
                }
            },
            {
                id: 2,
                attributes: {
                    title: 'Real Estate Finance Made Easy',
                    description: 'Own your dream home with our easy real estate finance programs.',
                    link: '/finance',
                    buttonText: 'Know More',
                    image: { data: { attributes: { url: '/images/najmaty.jpg' } } },
                    isActive: true,
                    order: 2
                }
            },
            {
                id: 3,
                attributes: {
                    title: 'Integrated Banking Services',
                    description: 'Enjoy a comprehensive range of safe and innovative banking services.',
                    link: '/services',
                    buttonText: 'Discover Services',
                    image: { data: { attributes: { url: '/images/mutanakel.jpg' } } },
                    isActive: true,
                    order: 3
                }
            }
        ]
    },
    services: {
        ar: [
            { 
                id: 1, 
                attributes: { 
                    title: 'الموبايل البنكي', 
                    description: 'تطبيق Cham Mobile يضع خدمات البنك بين يديك. إدارة حساباتك، تحويل الأموال، دفع الفواتير.', 
                    icon: 'Smartphone', 
                    slug: 'mobile-banking',
                    isActive: true 
                } 
            },
            { 
                id: 2, 
                attributes: { 
                    title: 'الإنترنت المصرفي', 
                    description: 'منصة Cham Online للشركات والأفراد. تحكم كامل بحساباتك وتنفيذ عملياتك المصرفية بأمان.', 
                    icon: 'Monitor', 
                    slug: 'online-banking',
                    isActive: true 
                } 
            },
            { 
                id: 3, 
                attributes: { 
                    title: 'خدمة الرسائل', 
                    description: 'ابق على اطلاع دائم بحركات حسابك. استقبل إشعارات فورية عند السحب والإيداع.', 
                    icon: 'MessageSquare', 
                    slug: 'sms',
                    isActive: true 
                } 
            },
            { 
                id: 4, 
                attributes: { 
                    title: 'الدفع الإلكتروني', 
                    description: 'سدد فواتيرك ومدفوعاتك الحكومية والتعليمية بكل سهولة عبر قنواتنا الإلكترونية.', 
                    icon: 'CreditCard', 
                    slug: 'e-payment',
                    isActive: true 
                } 
            }
        ],
        en: [
            { 
                id: 1, 
                attributes: { 
                    title: 'Mobile Banking', 
                    description: 'Cham Mobile app puts bank services in your hands. Manage accounts, transfer money, pay bills.', 
                    icon: 'Smartphone', 
                    slug: 'mobile-banking',
                    isActive: true 
                } 
            },
            { 
                id: 2, 
                attributes: { 
                    title: 'Online Banking', 
                    description: 'Cham Online platform for corporates and individuals. Full control over your accounts securely.', 
                    icon: 'Monitor', 
                    slug: 'online-banking',
                    isActive: true 
                } 
            },
            { 
                id: 3, 
                attributes: { 
                    title: 'SMS Service', 
                    description: 'Stay updated with your account movements. Receive instant notifications for withdrawals and deposits.', 
                    icon: 'MessageSquare', 
                    slug: 'sms',
                    isActive: true 
                } 
            },
            { 
                id: 4, 
                attributes: { 
                    title: 'E-Payment', 
                    description: 'Pay your bills and government fees easily through our electronic channels.', 
                    icon: 'CreditCard', 
                    slug: 'e-payment',
                    isActive: true 
                } 
            }
        ]
    },
    products: {
        accounts: {
            ar: [
                { 
                    id: 1, 
                    attributes: { 
                        title: 'الحساب الجاري', 
                        description: 'حساب يلبي احتياجاتك المصرفية اليومية بمرونة عالية.', 
                        icon: 'Wallet', 
                        category: 'accounts', 
                        features: 'متوافق مع الشريعة\nدفتر شيكات\nبطاقة صراف',
                        isActive: true
                    } 
                },
                { 
                    id: 2, 
                    attributes: { 
                        title: 'حساب التوفير', 
                        description: 'استثمر مدخراتك بطريقة آمنة ومتوافقة مع الشريعة الإسلامية.', 
                        icon: 'Coins', 
                        category: 'accounts', 
                        features: 'أرباح تنافسية\nحرية سحب وإيداع\nتوزيع ربع سنوي',
                        isActive: true
                    } 
                },
                { 
                    id: 3, 
                    attributes: { 
                        title: 'الودائع لأجل', 
                        description: 'ودائع استثمارية لمدد محددة تمنحك عوائد أعلى.', 
                        icon: 'Landmark', 
                        category: 'accounts', 
                        features: 'فترات مرنة\nعوائد مجزية\nتجديد تلقائي',
                        isActive: true
                    } 
                }
            ],
            en: [
                { 
                    id: 1, 
                    attributes: { 
                        title: 'Current Account', 
                        description: 'An account that meets your daily banking needs with high flexibility.', 
                        icon: 'Wallet', 
                        category: 'accounts', 
                        features: 'Sharia Compliant\nCheckbook\nATM Card',
                        isActive: true
                    } 
                },
                { 
                    id: 2, 
                    attributes: { 
                        title: 'Savings Account', 
                        description: 'Invest your savings in a safe and Sharia-compliant way.', 
                        icon: 'Coins', 
                        category: 'accounts', 
                        features: 'Competitive Profits\nWithdraw/Deposit Freedom\nQuarterly Distribution',
                        isActive: true
                    } 
                },
                { 
                    id: 3, 
                    attributes: { 
                        title: 'Term Deposits', 
                        description: 'Investment deposits for fixed terms giving you higher returns.', 
                        icon: 'Landmark', 
                        category: 'accounts', 
                        features: 'Flexible Terms\nLucrative Returns\nAuto Renewal',
                        isActive: true
                    } 
                }
            ]
        },
        finance: {
            ar: [
                { 
                    id: 1, 
                    attributes: { 
                        title: 'التمويل العقاري', 
                        description: 'امتلك منزل أحلامك الآن مع حلول التمويل العقاري المتوافقة مع الشريعة.', 
                        icon: 'Home', 
                        category: 'finance', 
                        features: 'حتى 25 سنة\nتمويل 80%\nإجارة منتهية بالتمليك',
                        isActive: true
                    } 
                },
                { 
                    id: 2, 
                    attributes: { 
                        title: 'تمويل السيارات', 
                        description: 'انطلق بسيارتك الجديدة بكل سهولة مع برنامج تمويل السيارات.', 
                        icon: 'Car', 
                        category: 'finance', 
                        features: 'حتى 5 سنوات\nمرابحة للأمر بالشراء\nسرعة في الإنجاز',
                        isActive: true
                    } 
                }
            ],
            en: [
                { 
                    id: 1, 
                    attributes: { 
                        title: 'Real Estate Finance', 
                        description: 'Own your dream home now with Sharia-compliant real estate finance solutions.', 
                        icon: 'Home', 
                        category: 'finance', 
                        features: 'Up to 25 years\n80% Financing\nIjara with Ownership',
                        isActive: true
                    } 
                },
                { 
                    id: 2, 
                    attributes: { 
                        title: 'Auto Finance', 
                        description: 'Drive your new car easily with our auto finance program.', 
                        icon: 'Car', 
                        category: 'finance', 
                        features: 'Up to 5 years\nMurabaha\nFast Processing',
                        isActive: true
                    } 
                }
            ]
        },
        cards: {
            ar: [
                { 
                    id: 1, 
                    attributes: { 
                        title: 'البطاقة الذهبية', 
                        description: 'بطاقة ائتمانية بحدود عالية ومرونة في السداد.', 
                        icon: 'CreditCard', 
                        category: 'cards', 
                        features: 'سقف ائتماني مرتفع\nدخول صالات كبار الزوار\nخصومات حصرية',
                        isActive: true
                    } 
                },
                { 
                    id: 2, 
                    attributes: { 
                        title: 'بطاقة المشتريات', 
                        description: 'تسوق الآن وادفع لاحقاً بأقساط ميسرة.', 
                        icon: 'ShoppingBag', 
                        category: 'cards', 
                        features: 'تقسيط بسعر الكاش\nمقبولة عالمياً\nفترة سماح 50 يوم',
                        isActive: true
                    } 
                }
            ],
            en: [
                { 
                    id: 1, 
                    attributes: { 
                        title: 'Gold Card', 
                        description: 'Credit card with high limits and flexible repayment.', 
                        icon: 'CreditCard', 
                        category: 'cards', 
                        features: 'High Credit Limit\nVIP Lounge Access\nExclusive Discounts',
                        isActive: true
                    } 
                },
                { 
                    id: 2, 
                    attributes: { 
                        title: 'Shopping Card', 
                        description: 'Shop now and pay later with easy installments.', 
                        icon: 'ShoppingBag', 
                        category: 'cards', 
                        features: '0% Installments\nGlobally Accepted\n50 Days Grace Period',
                        isActive: true
                    } 
                }
            ]
        }
    },
    news: {
        ar: [
            { 
                id: 1, 
                attributes: { 
                    title: 'بنك الشام يطلق خدمة الدفع الإلكتروني', 
                    description: 'أعلن بنك الشام عن إطلاق خدمة الدفع الإلكتروني الجديدة لطلاب الجامعات...', 
                    date: '2024-03-15', 
                    image: { data: { attributes: { url: '/images/news1.jpg' } } },
                    isPublished: true,
                    slug: 'bank-launches-epayment'
                } 
            },
            { 
                id: 2, 
                attributes: { 
                    title: 'افتتاح الفرع الجديد في حلب', 
                    description: 'ضمن خطة التوسع والانتشار، تم افتتاح فرع جديد في مدينة حلب...', 
                    date: '2024-02-20', 
                    image: { data: { attributes: { url: '/images/news2.jpg' } } },
                    isPublished: true,
                    slug: 'new-branch-aleppo'
                } 
            },
            { 
                id: 3, 
                attributes: { 
                    title: 'تطبيق بنك الشام يحصل على جائزة أفضل تطبيق مصرفي', 
                    description: 'حصل تطبيق بنك الشام للجوال على جائزة أفضل تطبيق مصرفي في مؤتمر التكنولوجيا المالية...', 
                    date: '2024-01-10', 
                    image: { data: { attributes: { url: '/images/news3.jpg' } } },
                    isPublished: true,
                    slug: 'app-award-fintech'
                } 
            }
        ],
        en: [
            { 
                id: 1, 
                attributes: { 
                    title: 'Cham Bank Launches E-Payment Service', 
                    description: 'Cham Bank announced the launch of the new electronic payment service for university students...', 
                    date: '2024-03-15', 
                    image: { data: { attributes: { url: '/images/news1.jpg' } } },
                    isPublished: true,
                    slug: 'bank-launches-epayment'
                } 
            },
            { 
                id: 2, 
                attributes: { 
                    title: 'New Branch Opening in Aleppo', 
                    description: 'As part of the expansion plan, a new branch was opened in Aleppo city...', 
                    date: '2024-02-20', 
                    image: { data: { attributes: { url: '/images/news2.jpg' } } },
                    isPublished: true,
                    slug: 'new-branch-aleppo'
                } 
            },
            { 
                id: 3, 
                attributes: { 
                    title: 'Cham Bank App Wins Best Banking App Award', 
                    description: 'Cham Bank mobile application received the Best Banking App award at the FinTech conference...', 
                    date: '2024-01-10', 
                    image: { data: { attributes: { url: '/images/news3.jpg' } } },
                    isPublished: true,
                    slug: 'app-award-fintech'
                } 
            }
        ]
    },
    exchangeRates: [
        { id: 1, currency: 'USD', buy: 14600, sell: 14750, trend: 'stable' },
        { id: 2, currency: 'EUR', buy: 15800, sell: 16000, trend: 'up' },
        { id: 3, currency: 'SAR', buy: 3890, sell: 3930, trend: 'stable' },
        { id: 4, currency: 'AED', buy: 3970, sell: 4010, trend: 'down' },
        { id: 5, currency: 'LBP', buy: 0.0097, sell: 0.0098, trend: 'stable' },
        { id: 6, currency: 'JOD', buy: 20650, sell: 20800, trend: 'up' }
    ],
    branches: [
        {
            id: 1,
            attributes: {
                name: 'فرع دمشق - وسط المدينة',
                address: 'شارعQueryable - دمشق',
                city: 'Damascus',
                phone: '+963 11 9392',
                latitude: 33.5138,
                longitude: 36.2765,
                isActive: true
            }
        },
        {
            id: 2,
            attributes: {
                name: 'فرع حلب - المركزية',
                address: 'شارع النصر - حلب',
                city: 'Aleppo',
                phone: '+963 21 9392',
                latitude: 36.2021,
                longitude: 37.1343,
                isActive: true
            }
        },
        {
            id: 3,
            attributes: {
                name: 'فرع حمص - التجاري',
                address: 'شارع الثورة - حمص',
                city: 'Homs',
                phone: '+963 31 9392',
                latitude: 34.7308,
                longitude: 36.7090,
                isActive: true
            }
        }
    ]
};

// Helper function to create Strapi-style response
function createStrapiResponse(data) {
    return {
        data: Array.isArray(data) ? data : [data],
        meta: {
            pagination: {
                page: 1,
                pageSize: Array.isArray(data) ? data.length : 1,
                pageCount: 1,
                total: Array.isArray(data) ? data.length : 1
            }
        }
    };
}

// API Routes

// Get sliders
app.get('/api/sliders', (req, res) => {
    try {
        const locale = validateLocale(req.query.locale);
        const data = MOCK_DATA.sliders[locale] || MOCK_DATA.sliders.ar;
        res.json(createStrapiResponse(data));
    } catch (error) {
        console.error('Error fetching sliders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get services
app.get('/api/services', (req, res) => {
    try {
        const locale = validateLocale(req.query.locale);
        const data = MOCK_DATA.services[locale] || MOCK_DATA.services.ar;
        res.json(createStrapiResponse(data));
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get products
app.get('/api/products', (req, res) => {
    try {
        const locale = validateLocale(req.query.locale);
        const category = validateCategory(req.query.category);
        
        if (category && MOCK_DATA.products[category]) {
            const data = MOCK_DATA.products[category][locale] || MOCK_DATA.products[category].ar;
            res.json(createStrapiResponse(data));
        } else {
            // Return all products if no category specified or invalid category
            const allProducts = [];
            Object.values(MOCK_DATA.products).forEach(categoryData => {
                allProducts.push(...(categoryData[locale] || categoryData.ar));
            });
            res.json(createStrapiResponse(allProducts));
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get news
app.get('/api/news', (req, res) => {
    try {
        const locale = validateLocale(req.query.locale);
        const limit = Math.min(Math.max(parseInt(req.query.pagination?.[0]?.limit) || 10, 1), 50); // Between 1 and 50
        const data = MOCK_DATA.news[locale] || MOCK_DATA.news.ar;
        const limitedData = data.slice(0, limit);
        res.json(createStrapiResponse(limitedData));
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get specific news item
app.get('/api/news/:slug', (req, res) => {
    try {
        const slug = sanitizeInput(req.params.slug);
        const locale = validateLocale(req.query.locale);
        
        if (!slug) {
            return res.status(400).json({ error: 'Invalid slug parameter' });
        }
        
        const data = MOCK_DATA.news[locale] || MOCK_DATA.news.ar;
        const newsItem = data.find(item => item.attributes.slug === slug);
        
        if (newsItem) {
            res.json(createStrapiResponse(newsItem));
        } else {
            res.status(404).json({ error: 'News item not found' });
        }
    } catch (error) {
        console.error('Error fetching news item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get exchange rates
app.get('/api/exchange-rates', (req, res) => {
    try {
        res.json({
            rates: MOCK_DATA.exchangeRates,
            lastUpdate: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get branches
app.get('/api/branches', (req, res) => {
    try {
        const data = MOCK_DATA.branches.filter(branch => branch.attributes.isActive);
        res.json(createStrapiResponse(data));
    } catch (error) {
        console.error('Error fetching branches:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get branches by city
app.get('/api/branches/:city', (req, res) => {
    try {
        const city = sanitizeInput(req.params.city);
        
        if (!city) {
            return res.status(400).json({ error: 'Invalid city parameter' });
        }
        
        const data = MOCK_DATA.branches.filter(branch => 
            branch.attributes.isActive &&
            branch.attributes.city.toLowerCase() === city.toLowerCase()
        );
        res.json(createStrapiResponse(data));
    } catch (error) {
        console.error('Error fetching branches by city:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: NODE_ENV,
        message: 'Mock API server for Cham Bank is running',
        version: '1.0.0'
    });
});

// 404 Handler for any unmatched /api routes
app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Mock API server running on port ${PORT}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🔒 Rate limiting: 100 requests per 15 minutes per IP`);
});

module.exports = app;