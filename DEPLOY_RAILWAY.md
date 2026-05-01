# 🚀 دليل النشر على Railway

هذا الدليل يشرح كيفية نشر مشروع **ZackXX0** (Backend + Frontend) على منصة **Railway** بشكل احترافي.

## 📋 المتطلبات المسبقة
1. حساب على [Railway](https://railway.app).
2. مستودع GitHub متصل بـ Railway.
3. قاعدة بيانات PostgreSQL (يمكن إنشاؤها من داخل Railway).

---

## 🟢 الجزء الأول: نشر الـ Backend وقاعدة البيانات

### 1. إعداد قاعدة البيانات على Railway
1. اذهب إلى لوحة تحكم Railway وأنشئ مشروعاً جديداً (`New Project`).
2. اضغط على `New` > `PostgreSQL`.
3. انتظر حتى يتم إنشاء قاعدة البيانات.
4. اضغط على الخدمة الجديدة، ثم اذهب إلى تبويب `Variables`.
5. انسخ قيمة `DATABASE_URL` (سنحتاجها لاحقاً).

### 2. ربط ونشر الـ Backend
1. في نفس المشروع، اضغط `New` > `GitHub Repo` واختر مستودع `zackxx0`.
2. **مهم جداً**: يجب إخبار Railway أن الجذر (Root) هو مجلد `backend`.
   - اذهب إلى إعدادات الخدمة (Settings).
   - ابحث عن `Root Directory` واكتب: `backend`.
3. أضف متغيرات البيئة (Environment Variables) في تبويب `Variables`:
   ```bash
   DATABASE_URL=<الرابط_الذي_نسخته_من_قاعدة_البيانات>
   JWT_SECRET=super_secret_key_change_this_in_production
   NODE_ENV=production
   PORT=5000
   ```
4. سيتم البناء والنشر تلقائياً. انتظر حتى تظهر الحالة `Deployed`.

### 3. ملاحظة هامة حول Prisma
تم إعداد ملف `railway.json` ليقوم تلقائياً بتشغيل:
- `npx prisma migrate deploy`: لتطبيق الجداول على قاعدة البيانات الإنتاجية.
- `npx prisma generate`: لتوليد عميل Prisma.
- `npm run start`: لتشغيل السيرفر.

---

## 🔵 الجزء الثاني: نشر الـ Frontend

### الخيار أ: نشر الـ Frontend كخدمة منفصلة على Railway (موصى به للسهولة)
1. في نفس المشروع على Railway، اضغط `New` > `GitHub Repo` (نفس المستودع).
2. في الإعدادات (Settings):
   - حدد `Root Directory`: `frontend`.
   - حدد `Build Command`: `npm run build`.
   - حدد `Start Command`: `npx serve dist -l $PORT`.
     *(ملاحظة: نستخدم `serve` لتقديم ملفات الـ Build الثابتة)*.
3. أضف متغير البيئة التالي في تبويب `Variables`:
   ```bash
   VITE_API_URL=https://<رابط_الباك_إند_الخاص_بك>.railway.app/api
   ```
   *(استبدل `<رابط_الباك_إند_الخاص_بك>` بالرابط الفعلي الذي حصلت عليه من خدمة الـ Backend).*
4. احفظ وسيتم النشر.

### الخيار ب: نشر الـ Frontend على Netlify (الأفضل للأداء)
إذا فضلت استخدام Netlify للواجهة (كما ناقشنا سابقاً):
1. اربط حساب GitHub بـ Netlify.
2. اختر المستودع `zackxx0`.
3. الإعدادات:
   - **Base Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. في متغيرات البيئة (Environment Variables) على Netlify، أضف:
   ```bash
   VITE_API_URL=https://<رابط_الباك_إند_الخاص_بك>.railway.app/api
   ```

---

## 🔗 ربط الواجهتين ببعضهما

بعد نشر الـ Backend، ستحصل على رابط عام (مثلاً: `https://zackxx0-backend-production.up.railway.app`).
تأكد من نسخ هذا الرابط ووضعه في متغير `VITE_API_URL` في إعدادات الـ Frontend (سواء على Railway أو Netlify).

**مثال للرابط النهائي:**
```
VITE_API_URL=https://zackxx0-backend-production.up.railway.app/api
```

---

## ✅ التحقق من النجاح

1. افتح رابط الـ Frontend في المتصفح.
2. جرب تسجيل الدخول (بيانات الأدمن الافتراضية: `admin` / `admin123`).
3. تأكد من ظهور البيانات وعدم وجود أخطاء في الشبكة (Network Tab).

## ⚠️ استكشاف الأخطاء

- **خطأ في الاتصال بقاعدة البيانات**: تأكد من صحة `DATABASE_URL` في متغيرات بيئة الـ Backend.
- **خطأ CORS**: تأكد من أن الـ Backend يسمح بنطاق الـ Frontend (تم ضبطه ليقبل جميع النطاقات في وضع التطوير، وقد تحتاج لتقييده في الإنتاج).
- **صفحة بيضاء**: تحقق من `VITE_API_URL` في إعدادات الـ Frontend وتأكد من أنه يشير للرابط الصحيح للـ Backend.

---

## 🎉 مبروك!
مشروعك الآن يعمل بكامل طاقته على السحابة!
