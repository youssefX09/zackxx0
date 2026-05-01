# 🚀 تشغيل المشروع محلياً باستخدام PM2

هذا الملف يشرح كيفية تشغيل مشروع **ZackXX0** (Backend + Frontend) باستخدام مدير العمليات **PM2** لإدارة السيرفرات بكفاءة عالية.

## 📋 المتطلبات المسبقة

تأكد من تثبيت التالي على جهازك:
- **Node.js** (الإصدار 18 أو أحدث)
- **npm** أو **yarn**
- **PostgreSQL** (قاعدة البيانات)
- **PM2** (مدير العمليات)

### تثبيت PM2 عالمياً:
```bash
npm install -g pm2
```

## ⚙️ إعداد قاعدة البيانات

قبل التشغيل، تأكد من إعداد قاعدة البيانات:

1. أنشئ ملف `.env` في مجلد `backend`:
   ```bash
   cd backend
   cp .env.example .env
   ```
2. عدل ملف `.env` وأضف رابط قاعدة البيانات:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/zackxx0_db"
   JWT_SECRET="your_super_secret_key"
   PORT=5000
   NODE_ENV=development
   ```
3. قم بتشغيل ترحيلات Prisma:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

## 🏁 تشغيل المشروع

### الطريقة 1: تشغيل كل شيء بأمر واحد (موصى به)

من الجذر الرئيسي للمشروع (`/workspace`):

```bash
pm2 start ecosystem.config.js
```

هذا الأمر سيقوم بتشغيل:
- **Backend** على البورت 5000
- **Frontend** على البورت 3000

### الطريقة 2: تشغيل كل خدمة على حدة

إذا أردت التحكم بكل خدمة بشكل منفصل:

```bash
# تشغيل الباك إند
pm2 start ecosystem.config.js --only zackxx0-backend

# تشغيل الفرونت إند
pm2 start ecosystem.config.js --only zackxx0-frontend
```

## 🔍 مراقبة الحالة

لعرض حالة الخدمات المشغلة:
```bash
pm2 status
```

لمشاهدة السجلات (Logs) مباشرة:
```bash
pm2 logs
```

لمشاهدة سجلات خدمة محددة:
```bash
pm2 logs zackxx0-backend
pm2 logs zackxx0-frontend
```

لمراقبة استخدام الموارد (CPU/RAM):
```bash
pm2 monit
```

## 🛑 إيقاف المشروع

لإيقاف جميع الخدمات:
```bash
pm2 stop all
```

لإيقاف خدمة محددة:
```bash
pm2 stop zackxx0-backend
```

## 🔄 إعادة التشغيل

لإعادة تشغيل جميع الخدمات:
```bash
pm2 restart all
```

لإعادة تحميل بدون توقف (Zero Downtime Reload):
```bash
pm2 reload all
```

## 🗑️ حذف الخدمات من قائمة PM2

لحذف جميع الخدمات:
```bash
pm2 delete all
```

لحذف خدمة محددة:
```bash
pm2 delete zackxx0-backend
```

## 🚀 التشغيل عند إقلاع النظام (Production)

إذا كنت تريد تشغيل المشروع تلقائياً عند تشغيل السيرفر:

1. احفظ قائمة العمليات الحالية:
   ```bash
   pm2 save
   ```

2. أنشئ سكريبت الإقلاع التلقائي:
   ```bash
   pm2 startup
   ```
   (انسخ والصق الأمر الذي سيظهر لك في التيرمينال)

## 📊 مميزات استخدام PM2 في هذا المشروع

- ✅ **إعادة التشغيل التلقائي** في حال توقف الخدمة.
- ✅ **إدارة السجلات** في ملفات منفصلة (`logs/`).
- ✅ **مراقبة الموارد** وتحديد حد أقصى للذاكرة.
- ✅ **تشغيل متوازي** للباك إند والفرونت إند.
- ✅ **سهولة التوسع** بإضافة المزيد من النسخ (Cluster Mode).

## 🌐 الوصول للتطبيق

بعد التشغيل الناجح:
- **الواجهة الأمامية**: [http://localhost:3000](http://localhost:3000)
- **الواجهة الخلفية (API)**: [http://localhost:5000/api](http://localhost:5000/api)

## ⚠️ ملاحظات هامة

1. تأكد من أن قاعدة بيانات PostgreSQL تعمل قبل تشغيل المشروع.
2. في بيئة الإنتاج، غيّر `args` في `ecosystem.config.js` من `run dev` إلى `run start`.
3. قم بتغيير `JWT_SECRET` إلى قيمة قوية وآمنة قبل النشر.
4. راجع ملفات السجل في مجلد `logs/` عند حدوث أي أخطاء.

---
**تم الإنشاء بواسطة مساعدك الذكي 🤖**
