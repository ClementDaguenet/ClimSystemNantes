# Notes opérationnelles

## Modèle PostgreSQL + Prisma

- **`agencies`** : fiches agences (dont `isFeatured`, GPS).
- **`site_settings`** (`id = 1`) : `footerIntro`, `savFlyerImage`, `savFlyerPdf`, `savImageAlt`.
- **`content_blocks`** : textes et médias CMS (`key`, `value`, etc.).

Contenu JSON initial dans **`content/site/`** importé via **`prisma/seed.ts`**.

## Back-office `/admin`

- **`ADMIN_PASSWORD`**, **`ADMIN_JWT_SECRET`** : variables Vercel (voir `.env.example`).
- Middleware JWT sur les routes `/admin` hors login.

### Vercel

- **Build** : `npm run build` (défaut projet Next sur Vercel). Node selon **`engines`** / réglages projet (**Settings → Node.js Version** si besoin).
- **Migrations** : pas dans le pipeline par défaut ; exécuter **`prisma migrate deploy`** en local (ou CI) avec la **`DATABASE_URL`** de prod — voir README.
- **`VERCEL`** : présent automatiquement sur la plateforme (comme autres `VERCEL_*`) si nécessaire un jour dans le code.
- Flyer (**Paramètres**) : pas d’upload ; chemins **`public/`** ou URLs externes. Photos de page (**Photos & médias**) : téléchargement stocké dans la base (data-URL ≤ 2 Mo) ou lien ; OG : URL **`https`** uniquement.

### Fichiers utiles

| Fichier | Rôle |
|--------|------|
| `prisma/schema.prisma` | Schéma (`binaryTargets` : `native` + `rhel-openssl-3.0.x` pour Linux / Lambda Vercel) |
| `prisma/seed.ts` | Import JSON + graine CMS |
| `src/lib/cms/` | loaders, `getContents`, `contentSeed.ts` |

## Formulaire contact

Envoi encore simulé côté client ; mise en prod : route API + prestataire mail.
