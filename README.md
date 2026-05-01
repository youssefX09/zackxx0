# 🎮 Zack System - Gaming Mode

نظام محاسبة وإدارة مخزون احترافي بتصميم Gaming Mode عصري

## 🚀 التقنيات المستخدمة

### Backend
- **Node.js** + **TypeScript**
- **Express.js** للإطار العمل
- **PostgreSQL** لقاعدة البيانات
- **Prisma ORM** للتعامل مع البيانات
- **JWT** للمصادقة
- **Zod** للـ Validation
- **Winston** للتسجيل

### Frontend
- **React 19** + **TypeScript**
- **Vite** للبناء السريع
- **Tailwind CSS** + **Bootstrap 5**
- **Framer Motion** للأنيميشن
- **Zustand** لإدارة الحالة
- **React Hook Form** + **Zod** للنماذج
- **Axios** للاتصالات

## 🎨 مميزات التصميم

- **Glassmorphism Effect** - تأثير الزجاج العصري
- **Neon Glow Effects** - إضاءات نيون ملونة
- **Gaming Mode Theme** - ثيم الألعاب الاحترافي
- **Smooth Animations** - أنيميشن سلس باستخدام Framer Motion
- **Responsive Design** - متجاوب مع جميع الأجهزة
- **Dark Theme** - الوضع الداكن الافتراضي

## 📦 التثبيت والتشغيل

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔐 بيانات الدخول التجريبية

```
Username: admin
Password: admin123
```

## 📁 هيكلية المشروع

```
zackxx0/
├── backend/
│   ├── src/
│   │   ├── config/          # إعدادات قاعدة البيانات والـ Logger
│   │   ├── controllers/     # معالجة الطلبات
│   │   ├── middleware/      # Middleware (Auth, Error Handling)
│   │   ├── routes/          # تعريف الـ Routes
│   │   ├── services/        # منطق الأعمال
│   │   ├── validators/      # Validation Schemas
│   │   └── server.ts        # نقطة البداية
│   ├── prisma/
│   │   └── schema.prisma    # Schema قاعدة البيانات
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # مكونات React
│   │   ├── pages/           # صفحات التطبيق
│   │   ├── hooks/           # Custom Hooks
│   │   ├── store/           # Zustand Stores
│   │   ├── styles/          # ملفات CSS
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## 🎯 المميزات الرئيسية

### نظام الصلاحيات
- **ADMIN**: صلاحيات كاملة
- **MANAGER**: إدارة الأصناف والمخزون
- **ACCOUNTANT**: عرض التقارير المالية
- **USER**: صلاحيات محدودة

### الأقسام
- 📊 **Dashboard**: لوحة التحكم الرئيسية
- 📦 **Items**: إدارة الأصناف
- 💰 **Sales**: تسجيل المبيعات
- 🛒 **Purchases**: تسجيل المشتريات
- 📈 **Reports**: التقارير والإحصائيات

## 🔧 الإعدادات

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/zack_system"
JWT_SECRET="your-secret-key"
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🌟 ملاحظات التطوير

- الكود يتبع أفضل الممارسات (Clean Code)
- معالجة شاملة للأخطاء
- Validation كامل للبيانات
- Logging متكامل
- جاهز للنشر على الإنتاج

## 📝 الترخيص

MIT License

---

**تم التطوير بواسطة ❤️**
