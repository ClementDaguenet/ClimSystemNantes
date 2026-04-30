# Climsystem Nantes

Site web professionnel **Climsystem**, distributeur en génie climatique sur le Grand Ouest, réalisé dans le cadre d'un workshop Master 2.

## Stack technique

- [Next.js 16](https://nextjs.org/) — App Router
- TypeScript (strict)
- [PostgreSQL](https://www.postgresql.org/) + [Prisma 6](https://www.prisma.io/) — agences, paramètres site, textes CMS (`content_blocks`), back-office JWT
- [Tailwind CSS v4](https://tailwindcss.com/) — configuration CSS-first via `@theme`
- Hébergement cible **[Netlify](https://www.netlify.com/)** (plan gratuit : `netlify.toml` + plugin Next.js officiel)
- [Framer Motion](https://www.framer.com/motion/) — animations au scroll, respect de `prefers-reduced-motion`
- [lucide-react](https://lucide.dev/) — iconographie
- [React-Leaflet](https://react-leaflet.js.org/) + OpenStreetMap — carte interactive (`ssr: false`)
- [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/) — validation du formulaire de contact

## Démarrage

Prérequis : Node.js 20+, npm 10+, une base **PostgreSQL** et la variable **`DATABASE_URL`** (voir `.env.example`).

```bash
npm install
npx prisma migrate deploy   # ou prisma db push pour un test local rapide
npx prisma db seed          # importe content/site/*.json vers la base
npm run dev
```

Le site est ensuite disponible sur [http://localhost:3000](http://localhost:3000).

Sans base ni seed, les pages qui lisent les agences / le footer peuvent renvoyer une erreur.

### Back-office `/admin`

1. Dans `.env` (à partir de `.env.example`), définir **`ADMIN_PASSWORD`** et **`ADMIN_JWT_SECRET`**.
2. Appliquer les migrations puis le seed au moins une fois (la table **`content_blocks`** contient tous les textes par défaut) :
   `npx prisma migrate deploy` puis `npx prisma db seed`.
3. Ouvrir [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

Depuis le back-office vous pouvez gérer les **agences**, les **paramètres** (footer, flyer SAV ; **envoi direct de fichiers uniquement en local**, sur Netlify utiliser des URLs) et tous les **textes** éditoriaux du site groupés par zone.

### Déploiement Netlify (plan gratuit)

Le dépôt inclut **`netlify.toml`** avec le plugin officiel **`@netlify/plugin-nextjs`** (runtime OpenNext). Chaque build exécute **`prisma migrate deploy`** puis **`next build`** : il faut donc configurer **`DATABASE_URL`** (et le reste) dans le tableau de bord Netlify avant le premier déploiement.

1. Créer une base **PostgreSQL managée** gratuite (ex. [Neon](https://neon.tech), [Supabase](https://supabase.com)), copier l’URI de connexion.
2. Dans Netlify : **Site → Environment variables** : `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`, et optionnellement `NEXT_PUBLIC_SITE_URL` (URL définitive du site).
3. Connecter le dépôt Git (**Build & deploy**) : branche `main`, build laissé tel quel (déjà défini dans `netlify.toml`).
4. Après le premier déploiement réussi, **une fois** exécuter le seed si la base est vide (depuis ta machine : `DATABASE_URL=... npx prisma db seed`, ou via CI / script manuel).

Les **fichiers uploadés** depuis l’admin ne sont **pas persistés** sur Netlify (fonctions serverless sans disque writable) : gardez les visuels dans `public/` versionnés Git ou des **URLs externes**.

### Autres scripts

```bash
npm run build          # Build de production (après postinstall / prisma generate)
npm run start          # Sert le build de production
npm run lint           # ESLint
npm run db:studio      # Prisma Studio — éditer la base en local
npm run db:seed        # Rejoue le seed depuis content/site/*.json
```

## Architecture

Le dépôt contient notamment **`docker-compose.yml`** (PostgreSQL local) et **`netlify.toml`** (production sur Netlify).

```
src/
├── app/                    # App Router Next.js
│   ├── layout.tsx          # Layout global (Navbar + Footer + metadata SEO)
│   ├── page.tsx            # Page Accueil
│   ├── globals.css         # Tailwind v4 + thème (couleurs Climsystem)
│   ├── error.tsx           # Boundary d'erreur global
│   ├── not-found.tsx       # Page 404
│   ├── sitemap.ts          # Sitemap dynamique
│   ├── robots.ts           # Robots.txt
│   ├── solutions/page.tsx  # Page Solutions (6 catégories ancrées)
│   ├── agences/page.tsx    # Page Agences + carte Leaflet
│   ├── sav/page.tsx        # Page SAV + flyer (lightbox)
│   └── contact/page.tsx    # Page Contact + formulaire RHF/zod
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── home/               # Hero, AtoutsGrid, SolutionsPreview, BrandsCarousel, CtaBanner
│   ├── solutions/          # SolutionSection, SolutionsNav
│   ├── agences/            # AgencyCard, AgenciesMap, LeafletMap
│   ├── sav/                # FlyerLightbox
│   ├── contact/            # ContactForm
│   └── ui/                 # Button, Container, FadeIn, Logo, SectionHeading
├── data/                   # Données codées en dur (solutions, atouts, brands, navigation)
├── lib/
│   ├── cms/loaders.ts       # Lecture BDD (agences, footer, SAV)
│   ├── db.ts                # Client Prisma
│   └── ...
└── types/
```

Le dossier **`content/site/`** (JSON) sert de **source pour le seed Prisma** (`npx prisma db seed`), pas au runtime du site.

## Identité visuelle

Palette inspirée du logo Climsystem :

- **Bleu froid** (primaire) — sérieux, génie climatique
- **Rouge dynamique** (secondaire) — CTA, accents, urgence SAV
- **Blanc / gris très clair** — clarté du catalogue (inspiration ACR Distribution)

Toutes les couleurs sont définies en variables CSS dans `src/app/globals.css` (block `@theme`).

## Critères qualité

- **Responsive mobile-first** — breakpoints `sm/md/lg/xl`, navigation burger sous `md`
- **Accessibilité** — landmarks sémantiques, `aria-*`, focus visible, skip-link, respect de `prefers-reduced-motion`
- **SEO** — metadata par page, hiérarchie H1/H2/H3 cohérente, `sitemap.ts` + `robots.ts`
- **Validation formulaire** — schéma `zod`, messages d'erreur liés aux champs (`aria-invalid` + `aria-describedby`), états de chargement et de succès animés
- **Gestion d'erreurs** — `error.tsx` global + simulation d'échec d'envoi sur le formulaire de contact

## À remplacer (placeholders)

- Base **PostgreSQL** en production (`DATABASE_URL`), migrations, premier `db seed`
- Mentions légales / politique : champs `[...]` côté pages
- Formulaire contact : API + envoi mail
- Logos marques dans **`public/brands/`** (`src/data/brands.ts`), visuels **SolutionSection**

## Ordre d'exécution

Le formulaire de contact simule l'envoi avec un `console.log` (voir `ContactForm.tsx`).
À brancher sur une vraie API (`/api/contact`) pour la mise en production.
