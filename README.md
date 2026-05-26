# Climsystem Nantes

Site web professionnel **Climsystem**, distributeur en génie climatique sur le Grand Ouest, réalisé dans le cadre d’un workshop Master 2.

## Stack technique

- [Next.js 16](https://nextjs.org/) - App Router
- TypeScript (strict)
- [PostgreSQL](https://www.postgresql.org/) + [Prisma 6](https://www.prisma.io/) - agences, paramètres site, textes CMS (`content_blocks`), back-office JWT
- [Tailwind CSS v4](https://tailwindcss.com/) - configuration CSS-first via `@theme`
- Hébergement **[Vercel](https://vercel.com)** (compatible Next sans config obligatoire)
- [Framer Motion](https://www.framer.com/motion/) - animations au scroll, respect de `prefers-reduced-motion`
- [lucide-react](https://lucide.dev/) - iconographie
- [React-Leaflet](https://react-leaflet.js.org/) + OpenStreetMap - carte interactive (`ssr: false`)
- [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/) - validation du formulaire de contact

## Déploiement sur Vercel

1. Créer une base **PostgreSQL managée** (ex. [Neon](https://neon.tech), [Supabase](https://supabase.com)) et récupérer l’URI.
2. **Vercel** — **Project → Settings → Environment Variables** (Production / Preview) :
   - **`DATABASE_URL`** — sur **Supabase**, utiliser la connexion **pooler** « Transaction » (port **6543**) pour l’app (compatible **Vercel**, souvent IPv4).
   - **`DIRECT_URL`** — sur **Supabase**, l’URI **Direct** (`db.<ref>.supabase.co:5432`) pour les **migrations** et `prisma generate` ; l’app utilise toujours **`DATABASE_URL`**. Sur **Neon** (ou tout Postgres sans pool dédié), mets **la même** chaîne que **`DATABASE_URL`** dans **`DIRECT_URL`**.
   - **`ADMIN_PASSWORD`**, **`ADMIN_JWT_SECRET`**
   - **`NEXT_PUBLIC_SITE_URL`** = `https://www.climsystem-distribution-atlantique.fr` (domaine principal **www** ; utilisé pour SEO, sitemap, JSON-LD et redirection apex → www)
3. En **local**, mets **`DATABASE_URL`** + **`DIRECT_URL`** comme dans `.env.example` (`DIRECT_URL` = connexion Direct Supabase avec ton mot de passe).
4. **Build** sur Vercel : `npm install` → `postinstall` exécute **`prisma generate`** (qui exige désormais les deux URLs si présentes dans `schema.prisma`).
5. **Migrations** (depuis ta machine, une fois ou après changement du dossier `prisma/migrations/`) :

   ```bash
   npx prisma migrate deploy
   ```

   Prisma prend automatiquement **`directUrl`** pour les migrations même si **`DATABASE_URL`** pointe vers le pooler — plus de blocage sur le pooler.

6. **Seed** :

   ```bash
   npx prisma db seed
   ```

7. Connexion back-office : **`https://www.climsystem-distribution-atlantique.fr/admin/login`**.

### Domaine OVH + Vercel

**Vercel → Project → Domains** : domaine principal **`www.climsystem-distribution-atlantique.fr`**, redirection du **apex** (`climsystem-distribution-atlantique.fr`) vers **www** (également gérée côté app via middleware si DNS configuré). Dans la **zone DNS OVH**, suivre les enregistrements indiqués par Vercel (CNAME `www` → `….vercel-dns-….com`).

### Sécurité (rendu / production)

- **En-têtes HTTP** (`next.config.ts`) : `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, etc. ; `/admin` en `noindex` + `no-store`.
- **`robots.txt`** : interdit l’indexation de `/admin`.
- **Back-office** : cookie JWT `httpOnly` + `secure` + `SameSite=Strict` ; limitation des tentatives de connexion (8 essais / 15 min).
- **Secrets** : jamais dans Git (`.env` ignoré) ; mots de passe forts sur Vercel (`ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`).
- **Base** : accès Postgres via Supabase (pooler sur Vercel, `DIRECT_URL` pour migrations).

### Ce que permet l’admin

- **Agences**, **Photos & médias**, **Textes & contenus**, **Paramètres** (footer, flyer SAV).
- **Paramètres** (footer, flyer SAV) : uniquement chemins **`public/`** versionnés dans Git ou URLs **HTTPS**. Pas de bouton d’upload (ajouter les fichiers au dépôt ou héberger ailleurs). Les grandes images de page sont gérées dans **Photos & médias** (téléchargement ou lien), sauf **Open Graph** qui doit rester une URL **`https://…`**.

Les **fichiers versionnés** dans `public/` (logos marques sous `public/brands/`, etc.) font partie du déploiement Git comme d’habitude.

### Scripts npm (révision / CI)

```bash
npm install
npm run build          
npm run lint
npm run db:migrate    # prisma migrate deploy (DATABASE_URL requis)
npm run db:seed       # prisma db seed (DATABASE_URL requis)
```

## Architecture

```
src/
├── app/                    # App Router Next.js
│   ├── layout.tsx          # Layout global + metadata SEO
│   ├── page.tsx            # Accueil
│   ├── globals.css         # Tailwind v4 + thème
│   ├── solutions/page.tsx  # Catalogue (6 blocs + médias CMS)
│   ├── agences/page.tsx    # Agences + carte Leaflet
│   ├── sav/page.tsx        # SAV + flyer
│   └── contact/page.tsx    # Contact + formulaire
├── components/
├── data/                   # solutions, brands, navigation
├── lib/cms/                # contenu, seed, loaders
└── types/
```

Le dossier **`content/site/`** (JSON) sert de **source au seed Prisma**, pas au runtime du site public.

## Identité visuelle

Palette inspirée du logo Climsystem : bleu froid (primaire), rouge dynamique (secondaire), blanc / gris clair. Variables dans `src/app/globals.css` (`@theme`).

## Critères qualité

- Responsive mobile-first, accessibilité, SEO (`sitemap.ts`, `robots.ts`), validation formulaire zod, boundary d’erreur globale.

## Placeholders / prolongements

- Formulaire contact : envoi réel (API + mail). Aujourd’hui démo côté client.
- Mentions légales / politique : champs à finaliser si besoin.
