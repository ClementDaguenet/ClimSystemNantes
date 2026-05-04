# Climsystem Nantes

Site web professionnel **Climsystem**, distributeur en génie climatique sur le Grand Ouest, réalisé dans le cadre d’un workshop Master 2.

## Stack technique

- [Next.js 16](https://nextjs.org/) - App Router
- TypeScript (strict)
- [PostgreSQL](https://www.postgresql.org/) + [Prisma 6](https://www.prisma.io/) - agences, paramètres site, textes CMS (`content_blocks`), back-office JWT
- [Tailwind CSS v4](https://tailwindcss.com/) - configuration CSS-first via `@theme`
- Hébergement **[Netlify](https://www.netlify.com/)** (`netlify.toml` + plugin Next.js officiel)
- [Framer Motion](https://www.framer.com/motion/) - animations au scroll, respect de `prefers-reduced-motion`
- [lucide-react](https://lucide.dev/) - iconographie
- [React-Leaflet](https://react-leaflet.js.org/) + OpenStreetMap - carte interactive (`ssr: false`)
- [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/) - validation du formulaire de contact

## Déploiement sur Netlify

1. Créer une base **PostgreSQL managée** (ex. [Neon](https://neon.tech), [Supabase](https://supabase.com)) et récupérer l’URI.
2. **Netlify** - **Site configuration → Environment variables** : **`DATABASE_URL`**, **`ADMIN_PASSWORD`**, **`ADMIN_JWT_SECRET`**. Facultatif : **`NEXT_PUBLIC_SITE_URL`** (URL publique définitive).
3. Connecter le **dépôt Git** ; le build défini dans `netlify.toml` enchaîne **`npx prisma migrate deploy`** puis **`npm run build`**. Node **22** (voir `netlify.toml`).
4. **Premier remplissage de la base** (une fois, si elle est vide) : depuis une machine où le projet est lié au site (`netlify link`), exécuter :

   ```bash
   netlify env:exec -- npx prisma db seed
   ```

   (Les variables sont injectées comme sur la plateforme.) Alternative : exporter **`DATABASE_URL`** puis **`npx prisma db seed`** pour une exécution ponctuelle.

5. Connexion au back-office : **`https://<votre-site>/admin/login`**.

### Ce que permet l’admin

- **Agences**, **Photos & médias**, **Textes & contenus**, **Paramètres** (footer, flyer SAV).
- **Paramètres** (footer, flyer SAV) : uniquement chemins **`public/`** versionnés dans Git ou URLs **HTTPS**. Pas de bouton d’upload (ajouter les fichiers au dépôt ou héberger ailleurs). Les grandes images de page sont gérées dans **Photos & médias** (téléchargement ou lien), sauf **Open Graph** qui doit rester une URL **`https://…`**.

Les **fichiers versionnés** dans `public/` (logos marques sous `public/brands/`, etc.) font partie du déploiement Git comme d’habitude.

### Scripts npm (révision / CI)

```bash
npm install
npm run build          # vérifiation build (après prisma generate automatique au postinstall)
npm run lint
npm run db:seed        # nécessite DATABASE_URL défini dans l’environnement courant
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
