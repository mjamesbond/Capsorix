# Capsorix — Premium Digital Product Agency Website

[![Website](https://img.shields.io/badge/Website-capsorix.tech-111111?style=flat&logo=googlechrome&logoColor=white)](https://capsorix.tech)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-Proprietary-1c1c1c?style=flat)

**Language / اللغة / Langue:** [EN](#en) · [AR](#ar) · [FR](#fr)

---

<a id="en"></a>
## EN

### TL;DR
A premium, dark-first agency website for luxury digital product development and high-end client acquisition.

Capsorix philosophy: **“We don’t ship apps. We build systems that move businesses forward.”**  
Tagline: **“Code without limits — Your next digital move.”**

### Highlights
- Selective by design: focused client intake, senior attention, high accountability.
- Obsessive precision in product thinking, design, and engineering.
- Built for long-term impact, not short-term launches.
- Integrated senior team across iOS, Android, Web, and internal systems.
- Process cadence: **Understand → Think → Test**.
- Personal response in **24–48 hours**.
- **NDA on request**.

### Tech Stack
- **Frontend:** React 18, TypeScript, Vite 5
- **Routing:** React Router 6
- **Styling:** Tailwind CSS, PostCSS, tailwindcss-animate
- **UI Foundations:** Radix UI primitives, custom UI components (`src/components/ui`)
- **Data / Integrations:** Supabase JS client, TanStack Query
- **Quality:** ESLint, Vitest, Testing Library
- **Build output:** Static assets in `dist/`

### Architecture
- SPA architecture bootstrapped by `src/main.tsx`.
- App shell in `src/App.tsx` with provider composition:
  - Query client
  - i18n provider
  - theme provider
  - router + lazy routes
- Landing and service routes (`/`, `/ios`, `/android`, `/web`) are component-driven.
- Heavy/secondary sections are lazy-loaded to keep first paint lean.
- Contact flow integrates Supabase client via Vite env vars.

### Content map
```text
.
├─ public/                     # Static public assets
├─ src/
│  ├─ assets/                  # Images and brand assets
│  ├─ components/
│  │  ├─ capsorix/             # Agency-specific sections and UX blocks
│  │  └─ ui/                   # Reusable UI primitives/components
│  ├─ hooks/                   # Custom React hooks
│  ├─ i18n/                    # Language provider + dictionaries
│  ├─ integrations/supabase/   # Supabase client + generated types
│  ├─ lib/                     # Utilities and shared logic
│  ├─ pages/                   # Route-level pages (Index, iOS, Android, Web, 404)
│  ├─ test/                    # Vitest setup and tests
│  ├─ theme/                   # Theme provider
│  ├─ App.tsx                  # App composition and routing
│  └─ main.tsx                 # App entry point
├─ supabase/migrations/        # Database migrations
├─ vite.config.ts
├─ tailwind.config.ts
├─ eslint.config.js
└─ package.json
```

### Deployment
Current repository setup uses **Vite static build** and a **GitHub Pages workflow** (`.github/workflows/pages.yml`).

#### Install / run
```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run preview
```

#### Environment variables
Used by `src/integrations/supabase/client.ts`:

```bash
# Replace with your actual Supabase project values
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_value_here
VITE_SUPABASE_PROJECT_ID=your_value_here
```

Replace these example values with your real Supabase project settings from the Supabase dashboard.

> Keep secrets out of git history. Use `.env.local` for local development and CI/CD variables for deployments.

#### Contact form email delivery (production)
The contact form posts to a Supabase Edge Function: `contact-email`.

- Recipient is fixed to: `team@capsorix.tech`
- Payload is validated/sanitized server-side
- Anti-spam: honeypot + IP throttling
- Origin allowlist check is enforced
- Email is sent via **Resend** from the server only (no provider secret in frontend)
- `reply_to` is set to the visitor email

Required Supabase Edge Function secrets:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_FROM_EMAIL="Capsorix Contact <noreply@capsorix.tech>"
# Optional override (comma-separated); defaults include capsorix.tech + localhost
CONTACT_ALLOWED_ORIGINS=https://capsorix.tech,https://www.capsorix.tech,http://localhost:5173
```

Deploy function:

```bash
supabase functions deploy contact-email --project-ref <your-project-ref>
supabase secrets set --project-ref <your-project-ref> \
  SUPABASE_URL=... \
  SUPABASE_SERVICE_ROLE_KEY=... \
  RESEND_API_KEY=... \
  CONTACT_FROM_EMAIL="Capsorix Contact <noreply@capsorix.tech>" \
  CONTACT_ALLOWED_ORIGINS="https://capsorix.tech,https://www.capsorix.tech,http://localhost:5173"
```

Manual verification:
1. Run the site locally and submit the contact form with valid data.
2. Confirm success UI appears and a row is added in `public.project_requests`.
3. Confirm delivery to `team@capsorix.tech` and `Reply-To` matches the sender email.
4. Submit repeatedly (>5 requests/minute from same IP) and confirm rate-limit behavior.
5. Fill honeypot field in dev tools and confirm request is silently ignored.

#### Hosting notes
- **GitHub Pages:** already configured in this repository.
- **Vercel (optional):** deploy as a **Vite static site**, using `npm run build` and output directory `dist`.

### SEO essentials (static)
- `public/robots.txt` allows crawling and points search engines to `https://capsorix.tech/sitemap.xml`.
- `public/sitemap.xml` is a static sitemap served at `/sitemap.xml`.
- Keep sitemap URLs aligned with route definitions in `src/App.tsx` (currently: `/`, `/ios`, `/android`, `/web`).
- When adding/removing first-class routes, update `public/sitemap.xml` in the same PR.

### Roadmap
- Expand case studies with measurable business outcomes.
- Strengthen multilingual content consistency (EN/AR/FR).
- Add deeper technical proof points for enterprise/internal systems.
- Continue performance/accessibility refinement across premium motion layers.

### Contact
- Website: https://capsorix.tech
- Founder: [founder@capsorix.tech](mailto:founder@capsorix.tech)
- Team: [team@capsorix.tech](mailto:team@capsorix.tech)

---

<a id="ar"></a>
## AR

### TL;DR
موقع وكالة فاخرة بنمط داكن أولًا، مخصص لتطوير المنتجات الرقمية عالية المستوى وجذب العملاء النوعيين.

فلسفة كابسوريكس: **«نحن لا نُسلّم تطبيقات فقط. نحن نبني أنظمة تدفع الأعمال إلى الأمام.»**  
الشعار: **«برمجة بلا حدود — حركتك الرقمية القادمة.»**

### Highlights
- انتقائية مقصودة في اختيار المشاريع والعملاء.
- دقة صارمة في التفكير المنتجّي والتصميم والهندسة.
- تركيز على أثر طويل المدى، لا إطلاقات سريعة قصيرة الأجل.
- فريق كبير الخبرة يعمل بشكل متكامل عبر iOS وAndroid وWeb والأنظمة الداخلية.
- إيقاع التنفيذ: **نفهم → نفكّر → نختبر**.
- رد شخصي خلال **24–48 ساعة**.
- **اتفاقية NDA عند الطلب**.

### Tech Stack
- **الواجهة الأمامية:** React 18 + TypeScript + Vite 5
- **التوجيه:** React Router 6
- **التصميم:** Tailwind CSS + PostCSS + tailwindcss-animate
- **أساس واجهات المستخدم:** Radix UI ومكونات مخصصة (`src/components/ui`)
- **البيانات والتكامل:** Supabase JS + TanStack Query
- **الجودة:** ESLint + Vitest + Testing Library
- **الناتج:** ملفات ثابتة داخل `dist/`

### Architecture
- بنية SPA تبدأ من `src/main.tsx`.
- تجميع مزوّدات التطبيق في `src/App.tsx`:
  - Query client
  - مزوّد الترجمة i18n
  - مزوّد الثيم
  - الراوتر والمسارات المؤجلة التحميل
- المسارات الأساسية: `/` و`/ios` و`/android` و`/web`.
- الأقسام الثقيلة تُحمّل عند الحاجة للحفاظ على سرعة أول ظهور.
- نموذج التواصل متكامل مع Supabase عبر متغيرات بيئة Vite.

### Content map
```text
.
├─ public/                     # ملفات عامة ثابتة
├─ src/
│  ├─ assets/                  # الصور وهوية العلامة
│  ├─ components/
│  │  ├─ capsorix/             # أقسام وتجارب الموقع الخاصة بالوكالة
│  │  └─ ui/                   # مكونات واجهة قابلة لإعادة الاستخدام
│  ├─ hooks/                   # React hooks مخصصة
│  ├─ i18n/                    # مزود اللغة والقواميس
│  ├─ integrations/supabase/   # عميل Supabase والأنواع
│  ├─ lib/                     # أدوات ومنطق مشترك
│  ├─ pages/                   # صفحات المسارات
│  ├─ test/                    # إعداد واختبارات Vitest
│  ├─ theme/                   # مزود الثيم
│  ├─ App.tsx                  # تركيب التطبيق والمسارات
│  └─ main.tsx                 # نقطة الدخول
├─ supabase/migrations/        # ترحيلات قاعدة البيانات
├─ vite.config.ts
├─ tailwind.config.ts
├─ eslint.config.js
└─ package.json
```

### Deployment
الإعداد الحالي يعتمد على **Vite static build** مع سير عمل **GitHub Pages** في `.github/workflows/pages.yml`.

#### أوامر التشغيل
```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run preview
```

#### Environment variables
المتغيرات المستخدمة داخل `src/integrations/supabase/client.ts`:

```bash
# استبدلها بقيم مشروع Supabase الفعلية
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_value_here
VITE_SUPABASE_PROJECT_ID=your_value_here
```

استبدل هذه القيم التجريبية بإعدادات مشروع Supabase الفعلية من لوحة Supabase.

> لا تضع أي أسرار داخل المستودع. استخدم `.env.local` محليًا ومتغيرات CI/CD في النشر.

#### ملاحظات النشر
- **GitHub Pages:** مُجهّز بالفعل داخل المستودع.
- **Vercel (اختياري):** نشر كموقع ثابت مبني بـ Vite باستخدام `npm run build` ومجلد خرج `dist`.

### Roadmap
- توسيع دراسات الحالة بنتائج أعمال قابلة للقياس.
- رفع اتساق المحتوى متعدد اللغات (EN/AR/FR).
- إضافة أدلة تقنية أعمق لمشاريع المؤسسات والأنظمة الداخلية.
- مواصلة تحسين الأداء وقابلية الوصول مع الحفاظ على الهوية البصرية الراقية.

### Contact
- الموقع: https://capsorix.tech
- المؤسس: [founder@capsorix.tech](mailto:founder@capsorix.tech)
- الفريق: [team@capsorix.tech](mailto:team@capsorix.tech)

---

<a id="fr"></a>
## FR

### TL;DR
Site d’agence premium, dark-first, conçu pour le développement de produits digitaux haut de gamme et l’acquisition de clients qualifiés.

Philosophie Capsorix : **« Nous ne livrons pas simplement des apps. Nous construisons des systèmes qui font avancer les entreprises. »**  
Signature : **« Code without limits — Your next digital move. »**

### Highlights
- Sélectif par design : peu de projets, forte implication senior.
- Précision obsessionnelle en stratégie produit, design et ingénierie.
- Impact long terme plutôt que livraisons opportunistes.
- Équipe senior intégrée (iOS, Android, Web, systèmes internes).
- Rythme d’exécution : **Comprendre → Penser → Tester**.
- Réponse personnelle sous **24–48 h**.
- **NDA sur demande**.

### Tech Stack
- **Frontend :** React 18, TypeScript, Vite 5
- **Routing :** React Router 6
- **Styling :** Tailwind CSS, PostCSS, tailwindcss-animate
- **UI :** primitives Radix UI + composants réutilisables (`src/components/ui`)
- **Data / intégrations :** Supabase JS, TanStack Query
- **Qualité :** ESLint, Vitest, Testing Library
- **Sortie build :** assets statiques dans `dist/`

### Architecture
- Architecture SPA initialisée depuis `src/main.tsx`.
- Composition applicative dans `src/App.tsx` avec providers :
  - Query client
  - i18n
  - thème
  - routeur + routes lazy
- Routes principales : `/`, `/ios`, `/android`, `/web`.
- Les sections lourdes sont chargées à la demande pour préserver le first paint.
- Le flux contact s’appuie sur Supabase via variables d’environnement Vite.

### Content map
```text
.
├─ public/                     # Ressources statiques publiques
├─ src/
│  ├─ assets/                  # Médias et assets de marque
│  ├─ components/
│  │  ├─ capsorix/             # Sections métier du site
│  │  └─ ui/                   # Composants UI réutilisables
│  ├─ hooks/                   # Hooks React custom
│  ├─ i18n/                    # Provider langue + dictionnaires
│  ├─ integrations/supabase/   # Client Supabase + types
│  ├─ lib/                     # Utilitaires partagés
│  ├─ pages/                   # Pages de routes
│  ├─ test/                    # Setup et tests Vitest
│  ├─ theme/                   # Provider de thème
│  ├─ App.tsx                  # Composition globale et routing
│  └─ main.tsx                 # Point d’entrée
├─ supabase/migrations/        # Migrations base de données
├─ vite.config.ts
├─ tailwind.config.ts
├─ eslint.config.js
└─ package.json
```

### Deployment
Le dépôt est actuellement configuré pour un **build statique Vite** + déploiement **GitHub Pages** (`.github/workflows/pages.yml`).

#### Commandes
```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run preview
```

#### Variables d’environnement
Variables utilisées par `src/integrations/supabase/client.ts` :

```bash
# Remplacez par les valeurs réelles de votre projet Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_value_here
VITE_SUPABASE_PROJECT_ID=your_value_here
```

Remplacez ces valeurs d’exemple par les paramètres réels de votre projet Supabase (dashboard Supabase).

> Ne versionnez aucun secret. Utilisez `.env.local` en local et des variables CI/CD en production.

#### Notes de déploiement
- **GitHub Pages :** déjà configuré dans le repo.
- **Vercel (optionnel) :** déployer comme site statique Vite avec `npm run build` et `dist` en dossier de sortie.

### Roadmap
- Enrichir les case studies avec des indicateurs business mesurables.
- Renforcer la cohérence éditoriale multilingue (EN/AR/FR).
- Ajouter des preuves techniques plus profondes pour les systèmes internes/enterprise.
- Continuer l’optimisation performance/accessibilité sans compromettre la direction premium.

### Contact
- Site : https://capsorix.tech
- Founder : [founder@capsorix.tech](mailto:founder@capsorix.tech)
- Team : [team@capsorix.tech](mailto:team@capsorix.tech)
