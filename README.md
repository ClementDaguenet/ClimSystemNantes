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
2. **Vercel** — projet importé depuis **GitHub** : **Project → Settings → Environment Variables** pour **Production / Preview**. Définir au minimum :
   - **`DATABASE_URL`**
   - **`ADMIN_PASSWORD`**
   - **`ADMIN_JWT_SECRET`**
   - Facultatif : **`NEXT_PUBLIC_SITE_URL`** = URL définitive (ex. `https://www.climsystem.fr` ou `https://votre-projet.vercel.app`)
3. **Build** : Vercel lance **`npm run build`** (install + `postinstall` → Prisma Generate). Pas de fichier `vercel.toml` nécessaire pour ce projet.
4. **Migrations Prisma** (à faire une fois après un changement de schéma ou avant première prod) : en local, avec la même **`DATABASE_URL`** que sur Vercel :

   ```bash
   npx prisma migrate deploy
   ```

   Tu peux copier **`DATABASE_URL`** depuis Vercel, ou : **`vercel env pull .env.vercel`** (nécessite CLI + `vercel link`) puis lancer migrate avec ce fichier comme env.

5. **Seed données** (une fois si la base est vide) :

   ```bash
   npx prisma db seed
   ```

6. Connexion back-office : **`https://<ta-domaine>/admin/login`** (ou `https://<projet>.vercel.app/admin/login`).

### Domaine OVH ou autre

**Vercel → Project → Domains** : ajouter `www.example.com` / `example.com`. Puis dans la **zone DNS** chez OVH, suivre les enregistrements indiqués par Vercel (souvent **CNAME** vers `cname.vercel-dns.com`).

### Ce que permet l’admin

- **Agences**, **Photos & médias**, **Textes & contenus**, **Paramètres** (footer, flyer SAV).
- **Paramètres** (footer, flyer SAV) : uniquement chemins **`public/`** versionnés dans Git ou URLs **HTTPS**. Pas de bouton d’upload (ajouter les fichiers au dépôt ou héberger ailleurs). Les grandes images de page sont gérées dans **Photos & médias** (téléchargement ou lien), sauf **Open Graph** qui doit rester une URL **`https://…`**.

Les **fichiers versionnés** dans `public/` (logos marques sous `public/brands/`, etc.) font partie du déploiement Git comme d’habitude.

### Scripts npm (révision / CI)

```bash
npm install
npm run build          # même commande que Vercel
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
