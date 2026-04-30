# Notes opérationnelles

## Contenu éditable (PostgreSQL + Prisma)

Le site lit **agences**, **paramètres pied de page / SAV**, **textes CMS** en base, plus les **fichiers seed** dans `content/site/*.json` pour l’import initial.

### Modèle

- Table **`agencies`** : une ligne par agence (`id` slug, coordonnées GPS, `isFeatured`, `sortOrder`, etc.).
- Table **`site_settings`** (ligne `id = 1`) : `footerIntro`, `savFlyerImage`, `savFlyerPdf`, `savImageAlt`.
- Table **`content_blocks`** : textes CMS (clé primaire `key`, `label`, `group`, `value`).

### Back-office `/admin`

- Variables **`ADMIN_PASSWORD`** et **`ADMIN_JWT_SECRET`** dans `.env` (voir `.env.example`).
- Connexion : `/admin/login` ; le middleware protège toutes les routes `/admin` sauf la page de connexion.
- Fonctionnalités : gestion **agences**, **paramètres** (footer + SAV ; uploads disque **hors Netlify uniquement**), édition des **textes** par groupe.

### Fichiers utiles

| Fichier | Rôle |
|--------|------|
| `prisma/schema.prisma` | Schéma (dont `binaryTargets` pour builds Linux Netlify) |
| `prisma/migrations/` | Historique SQL |
| `prisma/seed.ts` | Import depuis `content/site/*.json` + création initiale des lignes CMS (`src/lib/cms/contentSeed.ts`) |
| `src/lib/cms/loaders.ts` | `getAgencies()`, `getFeaturedAgency()`, `getFooterContent()`, `getSavContent()` |
| `src/lib/cms/content.ts` | `getContents(keys)` pour les chaînes des pages publiques |
| `src/middleware.ts` | Protection JWT des routes `/admin` |
| `src/lib/db.ts` | Client Prisma (singleton) |
| `netlify.toml` | Netlify : plugin Next.js, build + `prisma migrate deploy` |

### Première installation

1. Créer une base PostgreSQL et définir **`DATABASE_URL`**, **`ADMIN_PASSWORD`** et **`ADMIN_JWT_SECRET`** (voir `.env.example`).
2. Appliquer le schéma : `npx prisma migrate deploy` (ou `npx prisma db push` en prototypage rapide).
3. Remplir les données : `npx prisma db seed` (lit `content/site/*.json`, crée / met à jour les `content_blocks` sans écraser les valeurs déjà éditées en base).

Ensuite : **`npm run dev`** — le build exécute **`prisma generate`** via `postinstall` / script `build`.

### Mise à jour du contenu sans Git CMS

- Modifier les lignes en base (pgAdmin, **Prisma Studio** : `npm run db:studio`, interface admin maison, ou outil type **Retool** / **Directus** branché sur la même DB).
- Pas de déploiement obligatoire après un simple UPDATE en base (pages concernées sont rendues dynamiquement côté serveur).

### Déploiement Netlify

- **`netlify.toml`** : pendant le build, **`npx prisma migrate deploy`** puis **`npm run build`** ; Node **22** ; plugin **`@netlify/plugin-nextjs`**.
- Variables Netlify (**Site configuration → Environment variables**) : **`DATABASE_URL`**, **`ADMIN_PASSWORD`**, **`ADMIN_JWT_SECRET`**. Optionnel : **`NEXT_PUBLIC_SITE_URL`**.
- Le **`prisma db seed`** n’est pas exécuté sur Netlify : à lancer **une fois** manuellement (local ou script) contre la prod si besoin des données JSON initiales.
- Sur Netlify, **`NETLIFY=true`** : pas d’upload fichier persistant dans l’admin (utiliser des **URL** ou des fichiers sous **`public/`** dans Git).

### Ancien automate Vercel (GitHub Actions)

- Workflow **Vercel** retiré : déploiement via **connexion du dépôt Git** dans l’UI Netlify.

## Formulaire contact

Toujours en **démo** côté envoi : voir `ContactForm.tsx` ; branchement futur `POST /api/contact` + fournisseur mail.

---

*Ancienne piste Decap + OAuth GitHub sur le dépôt : retirée au profit de la base de données.*
