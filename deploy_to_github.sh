#!/bin/bash

# ألوان للرسائل
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}بدء عملية تحديث ونشر المشروع على GitHub...${NC}"

# التأكد من وجود مجلدات المشروع
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}خطأ: لم يتم العثور على مجلدات backend أو frontend. تأكد من وجود الكود.${NC}"
    exit 1
fi

# تهيئة الجيت إذا لم يكن مهيأ
if [ ! -d ".git" ]; then
    echo "تهيئة مستودع Git جديد..."
    git init
fi

# إضافة جميع الملفات
echo "جاري إضافة الملفات..."
git add .

# عمل كوميت للتغييرات
echo "جاري حفظ التغييرات..."
git commit -m "feat: تحديث الهيكلية الاحترافية (Backend + Frontend)"

# ربط الريبو (في حال لم يكن مربوطاً)
echo "ربط المستودع بـ GitHub..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/youssefX09/zackxx0.git

# جلب آخر التحديثات من الريبو البعيد لتجنب التعارضات
echo "جلب آخر التحديثات من السيرفر..."
git fetch origin

# محاولة الدمج إذا كانت هناك تغييرات بعيدة
git pull origin main --allow-unrelated-histories --no-edit || true

# الدفع إلى الفرع الرئيسي
echo -e "${GREEN}جاري رفع الملفات إلى GitHub...${NC}"
echo "ملاحظة: سيطلب منك إدخال اسم المستخدم وكلمة المرور (أو التوكن) هنا."
git push -u origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}تم النشر بنجاح! انتقل إلى الرابط التالي لرؤية التحديثات:${NC}"
    echo "https://github.com/youssefX09/zackxx0"
else
    echo -e "${RED}حدث خطأ أثناء الرفع. تأكد من صحة بيانات الدخول وصلاحيات التوكن.${NC}"
fi
