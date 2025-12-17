# سجل التغييرات - Cham Bank

## [1.1.0] - 2024-12-17

### 🔒 الأمان
- إضافة Rate Limiting للـ API Server (100 طلب/15 دقيقة)
- إضافة Rate Limiting للـ Chat API (20 طلب/دقيقة)
- تحسين CORS Configuration
- إضافة Security Headers
- Input Validation & Sanitization في جميع الـ endpoints

### ⚡ الأداء
- تحسين Image Optimization في Next.js
- إضافة Caching Headers للـ API responses
- تحسين Next.js Configuration

### 🔷 TypeScript
- إنشاء ملف `lib/types.ts` لأنواع مشتركة
- تحسين Type Safety في `StrapiAPI`
- إزالة `any` types

### 📦 Dependencies
- إضافة `express-rate-limit`
- إضافة `zod` (جاهز للاستخدام)
- إزالة `sqlite3` (غير مستخدم)
- إزالة `strapi` من Frontend (يوجد Mock API)

### 🛠️ تحسينات الكود
- تحسين Error Handling
- تحسين Code Organization
- إضافة Validation Functions

---

## [1.0.0] - 2024-12-16

### الإصدار الأولي
- Frontend: Next.js 16 + React 19
- Mock API Server
- دعم ثنائي اللغة (عربي/إنجليزي)
- صفحات متعددة للخدمات والمنتجات
- ويدجت الدردشة
- خريطة الفروع

