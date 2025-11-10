# Authentication & Dashboard Task

این پروژه یک سیستم احراز هویت و داشبورد با نقش‌های مختلف کاربری است.

## تکنولوژی‌های استفاده شده

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon) + Prisma ORM
- **Authentication**: JWT (JSON Web Tokens) with httpOnly cookies

### صفحه لاگین

- طراحی تمیز با shadcn/ui
- فرم با validation (React Hook Form + Zod)
- مدیریت خطاها:
  - 401: نمایش پیام "نام کاربری یا رمز عبور نامعتبر"
  - 500: نمایش پیام خطای سرور با دکمه retry
  - خطای شبکه: نمایش پیام قطع اینترنت با دکمه retry
- Loading state با اسپینر

### صفحه داشبورد

- محافظت شده با middleware (redirect به login اگر کاربر لاگین نکرده)
- نمایش کارت‌های متفاوت بر اساس نقش:
  - Admin: 5 کارت
  - Owner: 10 کارت
- مدیریت حالات:
  - Loading: نمایش skeleton cards
  - Success: نمایش grid کارت‌ها
  - Error: نمایش پیام خطا با دکمه retry
  - Empty: نمایش پیام "هیچ کارتی یافت نشد"
- دکمه Refresh برای بارگذاری مجدد داده‌ها
- دکمه Logout برای خروج از حساب

### مدیریت State

- React Query برای caching و state management
- Automatic refetch و retry logic
- Optimistic updates

## نحوه اجرا

### 1. نصب وابستگی‌ها

\`\`\`bash
npm install
\`\`\`

### 2. تنظیم متغیرهای محیطی

فایل `.env` را ایجاد کنید:
\`\`\`env
DATABASE_URL=
JWT_SECRET=
\`\`\`

### 3. راه‌اندازی دیتابیس

# ایجاد migration

npx prisma migrate dev --name init

# ایجاد Prisma Client

npx prisma generate

# <CHANGE> اجرای seeder برای ایجاد کاربران تستی

npx prisma db seed
\`\`\`

### 4. اجرای پروژه

\`\`\`bash
npm run dev
\`\`\`

پروژه روی `http://localhost:3000` اجرا می‌شود.

## کاربران تستی

// <CHANGE> پسوردهای جدید با bcrypt hash شده‌اند

- **Admin**:

  - Username: `admin`
  - Password: `admin123`
  - دسترسی: 5 کارت

- **Owner**:
  - Username: `owner`
  - Password: `owner123`
  - دسترسی: 10 کارت

## دیزاین انتخابی از روی سایت dribbble

https://dribbble.com/shots/26352934-Login-Page-Design-Concepts-Future-Ready-UI?utm_source=Clipboard_Shot&utm_campaign=thisuix&utm_content=Login%20Page%20Design%20Concepts%20%E2%80%93%20Future-Ready%20UI&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=thisuix&utm_content=Login%20Page%20Design%20Concepts%20%E2%80%93%20Future-Ready%20UI&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=thisuix&utm_content=Login%20Page%20Design%20Concepts%20%E2%80%93%20Future-Ready%20UI&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=thisuix&utm_content=Login%20Page%20Design%20Concepts%20%E2%80%93%20Future-Ready%20UI&utm_medium=Social_Share
