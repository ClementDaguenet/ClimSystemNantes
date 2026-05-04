# Notes opérationnelles

## Modèle PostgreSQL + Prisma

- **`agencies`** : fiches agences (dont `isFeatured`, GPS).
- **`site_settings`** (`id = 1`) : `footerIntro`, `savFlyerImage`, `savFlyerPdf`, `savImageAlt`.
- **`content_blocks`** : textes et médias CMS (`key`, `value`, etc.).

Contenu JSON initial dans **`content/site/`** importé via **`prisma/seed.ts`**.

## Back-office `/admin`

- **`ADMIN_PASSWORD`**, **`ADMIN_JWT_SECRET`** : variables Netlify (documentées dans `.env.example`).
- Middleware JWT sur les routes `/admin` hors login.

### Netlify

- **`netlify.toml`** : `prisma migrate deploy` puis **`npm run build`**, plugin **`@netlify/plugin-nextjs`**, Node 22.
- **`NETLIFY=true`** sur la plateforme.
- Flyer (**Paramètres**) : pas d’upload ; chemins **`public/`** ou URLs externes. Photos de page (**Photos & médias**) : téléchargement stocké dans la base (data-URL ≤ 2 Mo) ou lien ; OG : URL **`https`** uniquement.
- **Seed** une fois contre la prod : **`netlify env:exec -- npx prisma db seed`** (avec `netlify link`).

### Fichiers utiles

| Fichier | Rôle |
|--------|------|
| `prisma/schema.prisma` | Schéma (`binaryTargets` pour Linux / build Netlify) |
| `prisma/seed.ts` | Import JSON + graine CMS |
| `src/lib/cms/` | loaders, `getContents`, `contentSeed.ts` |

## Formulaire contact

Envoi encore simulé côté client ; mise en prod : route API + prestataire mail.
