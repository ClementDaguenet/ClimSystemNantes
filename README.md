# Climsystem Nantes

Site web professionnel **Climsystem**, distributeur en génie climatique sur le Grand Ouest, réalisé dans le cadre d’un workshop Master 2.

## Stack technique

- [Next.js 16](https://nextjs.org/) - App Router
- TypeScript (strict)
- [PostgreSQL](https://www.postgresql.org/) (OVH Web Cloud Databases) + [Prisma 6](https://www.prisma.io/) - agences, paramètres site, textes CMS (`content_blocks`), back-office JWT
- [Tailwind CSS v4](https://tailwindcss.com/) - configuration CSS-first via `@theme`
- Hébergement **[Vercel](https://vercel.com)** (compatible Next sans config obligatoire)
- [Framer Motion](https://www.framer.com/motion/) - animations au scroll, respect de `prefers-reduced-motion`
- [lucide-react](https://lucide.dev/) - iconographie
- [React-Leaflet](https://react-leaflet.js.org/) + OpenStreetMap - carte interactive (`ssr: false`)
- [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/) - validation du formulaire de contact

## Déploiement sur Vercel + PostgreSQL OVH

1. Créer une instance **Web Cloud Databases PostgreSQL** et une base ; récupérer hôte, **port**, nom de base, utilisateur, mot de passe.
2. Onglet **IPs autorisées** : ajouter l’IP de ta machine (migrations / import). Pour Vercel, prévoir aussi un accès depuis le réseau public (voir `docs/operations.md`).
3. **Vercel** - **Project → Settings → Environment Variables** (Production / Preview) :
   - **`DATABASE_URL`** = `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require`
   - **`ADMIN_PASSWORD`**, **`ADMIN_JWT_SECRET`**
   - **`NEXT_PUBLIC_SITE_URL`** = `https://climsystem.com` (domaine principal **sans www** ; utilisé pour SEO, sitemap, JSON-LD ; `www` redirige vers l’apex si le DNS existe)
   - **`RESEND_API_KEY`**, **`CONTACT_FROM_EMAIL`**, **`CONTACT_TO_EMAIL`** - envoi du formulaire de contact
   - **`NEXT_PUBLIC_GA_MEASUREMENT_ID`** (facultatif) - Google Analytics 4, activé uniquement après consentement cookies
4. En **local**, mets **`DATABASE_URL`** comme dans `.env.example`.
5. **Build** sur Vercel : `npm install` → `postinstall` exécute **`prisma generate`**.
6. **Migrations** (depuis ta machine, une fois la PostgreSQL OVH joignable) :

   ```bash
   npx prisma migrate deploy
   ```

7. **Données de production** (ne pas se contenter du seed JSON) :

   ```bash
   npm run db:import-prod
   ```

   Le dump local `tmp/prod-dump.json` (non versionné) reprend agences, paramètres et blocs CMS exportés depuis l’ancienne base. Pour un nouvel environnement vide uniquement : `npx prisma db seed`.

8. Connexion back-office : **`https://climsystem.com/admin/login`**.

### Domaine OVH + Vercel

**Vercel → Project → Domains** : domaine principal **`climsystem.com`**. Si tu crées plus tard un `www`, le middleware redirige `www.climsystem.com` vers l’apex. Dans la **zone DNS OVH**, coller les enregistrements **A** (et éventuellement AAAA) indiqués par Vercel pour l’apex. Ne pas modifier les MX / SPF du mail `@climsystem.com`.

L’ancien domaine `www.climsystem-distribution-atlantique.fr` peut rester en redirection 301 tant qu’il n’est pas retiré.

### Sécurité (rendu / production)

- **En-têtes HTTP** (`next.config.ts`) : `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, etc. ; `/admin` en `noindex` + `no-store`.
- **`robots.txt`** : interdit l’indexation de `/admin`.
- **Back-office** : cookie JWT `httpOnly` + `secure` + `SameSite=Strict` ; limitation des tentatives de connexion (8 essais / 15 min).
- **Secrets** : jamais dans Git (`.env` ignoré) ; mots de passe forts sur Vercel (`ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`).
- **Base** : PostgreSQL OVH Web Cloud Databases.

### Ce que permet l’admin

- **Agences**, **Photos & médias**, **Textes & contenus**, **Paramètres** (footer, flyer SAV).
- **Paramètres** (footer, flyer SAV) : uniquement chemins **`public/`** versionnés dans Git ou URLs **HTTPS**. Pas de bouton d’upload (ajouter les fichiers au dépôt ou héberger ailleurs). Les grandes images de page sont gérées dans **Photos & médias** (téléchargement ou lien), sauf **Open Graph** qui doit rester une URL **`https://…`**.

Les **fichiers versionnés** dans `public/` (logos marques sous `public/brands/`, etc.) font partie du déploiement Git comme d’habitude.

### Scripts npm (révision / CI)

```bash
npm install
npm run build
npm run lint
npm run test           # Vitest - unit + integration
npm run test:coverage  # rapport de couverture
npm run test:e2e       # Playwright - e2e (démarre next dev si besoin)
npm run test:all       # Vitest + Playwright
npm run db:migrate     # prisma migrate deploy (DATABASE_URL requis)
npm run db:seed        # prisma db seed (base vide uniquement)
npm run db:export-prod # dump vers tmp/prod-dump.json
npm run db:import-prod # import du dump vers la PostgreSQL courante
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

- Mentions légales / politique : données légales renseignées (CLIMSYSTEM SAS) ; faire valider le directeur de publication si besoin.
- Analytics : configurer `NEXT_PUBLIC_GA_MEASUREMENT_ID` sur Vercel pour activer GA4 après consentement.
