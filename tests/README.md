# Tests automatisés - Climsystem Nantes

## Scripts npm

| Commande | Description |
|----------|-------------|
| `npm run test` | Vitest - **254 tests** unitaires + intégration (28 fichiers) |
| `npm run test:watch` | Vitest en mode watch |
| `npm run test:unit` | Uniquement `tests/unit/` |
| `npm run test:unit:lib` | Libs (`siteUrl`, `seo`, `jwt`, `contact`, `admin`…) |
| `npm run test:unit:data` | Données statiques (`brands`, `solutions`, `navigation`…) |
| `npm run test:unit:cms` | CMS (`contentSeed`, `content`, `loaders`) |
| `npm run test:unit:app` | Routes metadata (`sitemap`, `robots`) |
| `npm run test:unit:admin` | Auth admin (`session`, `jwt`, rate-limit) |
| `npm run test:unit:contact` | Schéma et validation contact |
| `npm run test:integration` | Uniquement `tests/integration/` |
| `npm run test:coverage` | Rapport de couverture (`coverage/`) |
| `npm run test:e2e` | Playwright - **69 scénarios** navigateur |
| `npm run test:e2e:smoke` | Smoke test (nav + SEO + accueil) |
| `npm run test:e2e:contact` | Formulaire contact |
| `npm run test:e2e:legal` | Pages légales |
| `npm run test:e2e:cookies` | Bandeau cookies |
| `npm run test:e2e:admin` | Protection admin |
| `npm run test:e2e:a11y` | Accessibilité de base |
| `npm run test:e2e:ui` | Playwright UI mode |
| `npm run test:all` | Vitest + Playwright |
| `npm run test:ci` | CI : couverture + e2e chromium |

## Structure

```
tests/
├── setup.ts                 # Reset mocks après chaque test
├── fixtures/                # Données de test partagées
├── unit/
│   ├── lib/                 # siteUrl, seo, jwt, contact, analytics, animations…
│   │   ├── admin/           # session, jwt, constants, loginRateLimit
│   │   ├── contact/         # schema, schema-edge-cases, sendContactEmail
│   │   ├── analytics/       # consent
│   │   └── legal/           # company, company-extended
│   ├── data/                # brands, solutions, navigation, atouts, cross-integrity
│   ├── cms/                 # contentSeed, content, loaders
│   └── app/                 # sitemap, robots
└── integration/
    └── api/                 # POST /api/contact

e2e/
├── helpers.ts
├── accessibility.spec.ts    # h1, skip-link, lang, alt images (21 scénarios)
├── admin-protection.spec.ts
├── contact-page.spec.ts
├── cookie-consent.spec.ts
├── header-footer.spec.ts
├── home-page.spec.ts
├── legal-pages.spec.ts
├── pages-content.spec.ts
├── public-navigation.spec.ts
├── responsive.spec.ts
└── seo-files.spec.ts
```

## Prérequis e2e

- `.env` configuré (DB pour pages dynamiques)
- Playwright Chromium : `npx playwright install chromium`
- Le serveur dev démarre automatiquement (`playwright.config.ts`)

## Lien avec la recette workshop

Les tests automatisés complètent [`rendu/03-realisation-technique/RECETTAGE/`](../rendu/03-realisation-technique/RECETTAGE/) :
- **Vitest** = non-régression code (schemas, lib, API)
- **Playwright** = parcours utilisateur (navigation, contact, admin, cookies)
- **Matrice manuelle** = validation client + cas non automatisés (email Resend réel, OG LinkedIn…)
