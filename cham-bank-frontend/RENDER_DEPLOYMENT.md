# نشر مشروع بنك الشام على Render

## 📋 نظرة عامة

يوضح هذا الدليل كيفية نشر مشروع بنك الشام الإسلامي على منصة Render. المشروع يتكون من جزئين:
- **Frontend**: تطبيق Next.js
- **API Server**: خادم Express.js محاكي

## 🚀 طرق النشر

### الطريقة الأولى: النشر المتكامل (Multi-Service) - المفضلة

#### 1. إعداد المشروع على GitHub
```bash
# تأكد من رفع المشروع إلى GitHub
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

#### 2. إنشاء حساب على Render
- اذهب إلى [render.com](https://render.com)
- سجل حساب جديد أو سجل دخول

#### 3. ربط المشروع
- اضغط على "New" → "Blueprint"
- اربط حساب GitHub الخاص بك
- اختر repository المشروع
- Render سيكتشف ملف `render.yaml` تلقائياً

#### 4. تكوين الخدمات
Render سينشئ خدمتين تلقائياً:
- `cham-bank-frontend`: الواجهة الأمامية
- `cham-bank-api`: خادم API

#### 5. النشر
- اضغط "Create Blueprint"
- انتظر حتى يكتمل البناء والنشر
- ستحصل على رابطين:
  - Frontend: `https://cham-bank-frontend.onrender.com`
  - API: `https://cham-bank-api.onrender.com`

---

### الطريقة الثانية: النشر المنفصل (Separate Services)

#### نشر API Server أولاً

1. **إنشاء Web Service جديد**
   - اضغط "New" → "Web Service"
   - اربط repository المشروع
   - اختر Branch: `main`

2. **تكوين الخدمة**
   ```
   Name: cham-bank-api
   Runtime: Node
   Build Command: echo "No build required"
   Start Command: node mock-api-server.js
   ```

3. **متغيرات البيئة**
   ```
   NODE_ENV=production
   PORT=10000
   ALLOWED_ORIGINS=https://your-frontend-url.onrender.com
   ```

4. **اضغط "Create Web Service"**

#### نشر Frontend

1. **إنشاء Web Service جديد**
   - اضغط "New" → "Web Service"
   - اربط نفس repository المشروع

2. **تكوين الخدمة**
   ```
   Name: cham-bank-frontend
   Runtime: Node
   Build Command: npm run build
   Start Command: npm run start
   ```

3. **متغيرات البيئة**
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_BASE_URL=https://cham-bank-api.onrender.com
   NEXT_PUBLIC_STRAPI_URL=https://cham-bank-api.onrender.com
   APP_NAME=Cham Bank
   APP_URL=https://cham-bank-frontend.onrender.com
   ```

4. **اضغط "Create Web Service"**

---

## 🔧 تكوين متقدم

### متغيرات البيئة التفصيلية

#### للـ API Server
```env
NODE_ENV=production
PORT=10000
ALLOWED_ORIGINS=https://your-frontend-domain.onrender.com,https://www.your-domain.com
```

#### للـ Frontend
```env
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.onrender.com
NEXT_PUBLIC_STRAPI_URL=https://your-api-domain.onrender.com
APP_NAME=Cham Bank
APP_URL=https://your-frontend-domain.onrender.com
```

### تخصيص النطاق (Domain)

1. **في Render Dashboard**
   - اذهب إلى خدمة الـ Frontend
   - اضغط "Settings" → "Custom Domain"
   - أدخل نطاقك المخصص

2. **تحديث متغيرات البيئة**
   - حدث `APP_URL` ليطابق النطاق الجديد
   - حدث `ALLOWED_ORIGINS` في API Server

---

## 🐛 حل المشاكل الشائعة

### مشكلة: Build Failure
```
Error: Cannot find module 'express'
```
**الحل**: تأكد من أن `package.json` يحتوي على جميع dependencies المطلوبة.

### مشكلة: API Connection Failed
```
Failed to fetch from API
```
**الحل**:
- تحقق من `NEXT_PUBLIC_API_BASE_URL`
- تأكد من أن API Server يعمل
- تحقق من CORS settings

### مشكلة: Port Issues
```
Port already in use
```
**الحل**: استخدم Port المحدد في متغيرات البيئة (10000 للإنتاج).

### مشكلة: Memory Issues
إذا واجهت مشاكل ذاكرة:
- في Render Dashboard → Service Settings
- زد Instance Type إلى Starter أو أعلى

---

## 📊 مراقبة الأداء

### Logs
- في Render Dashboard → Service → Logs
- راقب logs للأخطاء والأداء

### Metrics
- CPU Usage
- Memory Usage
- Response Times

### Health Checks
- API Health: `https://your-api-domain.onrender.com/api/health`
- Frontend: تحقق من الصفحة الرئيسية

---

## 💰 التكاليف

### Free Tier
- 750 ساعة/شهر
- Static sites مجانية
- Web services: 750 ساعة

### Paid Plans
- Starter: $7/شهر
- Standard: $25/شهر
- Pro: $50/شهر

---

## 🔄 التحديثات

### تحديث الكود
```bash
git add .
git commit -m "Update: [وصف التغيير]"
git push origin main
```

Render سيقوم تلقائياً بإعادة البناء والنشر.

### Rollback
في حالة مشاكل:
- اذهب إلى Deployments
- اضغط "Rollback" للعودة للإصدار السابق

---

## ✅ قائمة المراجعة قبل النشر

- [ ] رفع الكود إلى GitHub
- [ ] إنشاء حساب Render
- [ ] تكوين متغيرات البيئة
- [ ] اختبار محلي للتأكد من العمل
- [ ] تحقق من build commands
- [ ] إعداد monitoring
- [ ] اختبار النشر

---

## 📞 الدعم

### Render Support
- [Render Documentation](https://docs.render.com)
- [Render Community](https://community.render.com)

### مشاكل المشروع
- تحقق من logs في Render
- اختبر API endpoints محلياً
- تحقق من متغيرات البيئة

---

**تاريخ التحديث**: ديسمبر 2024
**الحالة**: ✅ جاهز للنشر