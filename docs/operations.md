# Notes opérationnelles

## Modèle PostgreSQL + Prisma

- **`agencies`** : fiches agences (dont `isFeatured`, GPS).
- **`site_settings`** (`id = 1`) : `footerIntro`, `savFlyerImage`, `savFlyerPdf`, `savImageAlt`.
- **`content_blocks`** : textes et médias CMS (`key`, `value`, etc.).

Contenu JSON initial dans **`content/site/`** importé via **`prisma/seed.ts`**.

## Back-office `/admin`

- **`ADMIN_PASSWORD`**, **`ADMIN_JWT_SECRET`** : variables Vercel (voir `.env.example`).
- Middleware JWT sur les routes `/admin` hors login ; rate-limit login (8 tentatives / 15 min).

### Vercel

- **Build** : `npm run build` (défaut projet Next sur Vercel). Node selon **`engines`** / réglages projet (**Settings → Node.js Version** si besoin).
- **URL canonique** : `NEXT_PUBLIC_SITE_URL` → `src/lib/siteUrl.ts` (défaut `https://www.climsystem-distribution-atlantique.fr`).
- **Migrations** : pas dans le pipeline par défaut ; **`prisma migrate deploy`** en local (ou CI). Avec **Supabase** : **`DATABASE_URL`** = pooler, **`DIRECT_URL`** = session pooler ou direct pour migrer. **Neon** : **`DIRECT_URL`** = même valeur que **`DATABASE_URL`**.
- **Sécurité** : en-têtes `next.config.ts`, `robots.txt` (`/admin` disallow), cookie admin `SameSite=Strict`.
- Flyer (**Paramètres**) : pas d’upload ; chemins **`public/`** ou URLs externes. Photos de page (**Photos & médias**) : téléchargement stocké dans la base (data-URL ≤ 2 Mo) ou lien ; OG : URL **`https`** uniquement.

### Fichiers utiles

| Fichier | Rôle |
|--------|------|
| `prisma/schema.prisma` | Schéma (`binaryTargets` : `native` + `rhel-openssl-3.0.x` pour Linux / Lambda Vercel) |
| `prisma/seed.ts` | Import JSON + graine CMS |
| `src/lib/cms/` | loaders, `getContents`, `contentSeed.ts` |

## Formulaire contact

Route **`POST /api/contact`** (JSON) - validation Zod, honeypot, rate-limit cookie (5 envois / h).

Variables Vercel :
- **`RESEND_API_KEY`**
- **`CONTACT_FROM_EMAIL`** - expéditeur (domaine vérifié chez Resend)
- **`CONTACT_TO_EMAIL`** - destinataire (ex. `contact44@climsystem.com`)

## Cookies et analytics

Bandeau de consentement (`CookieConsent`) - préférence stockée en `localStorage` (`clims_cookie_consent`).

Google Analytics 4 chargé uniquement si l'utilisateur accepte et si **`NEXT_PUBLIC_GA_MEASUREMENT_ID`** est défini.

Microsoft Clarity chargé uniquement si l'utilisateur accepte et si **`NEXT_PUBLIC_CLARITY_PROJECT_ID`** est défini.
