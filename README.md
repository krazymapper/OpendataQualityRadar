# OpenData Quality Radar

Application moderne de surveillance et d'analyse de la qualité des données ouvertes, intégrant Wikidata et OpenStreetMap.

## 🚀 Technologies

- **React 18** avec TypeScript
- **Vite** pour le build
- **Tailwind CSS** pour le design
- **Leaflet** pour les cartes interactives
- **Recharts** pour les visualisations
- **TanStack Query** pour la gestion des données
- **Zustand** pour l'état global
- **Framer Motion** pour les animations

## 📦 Installation

```bash
npm install
```

## 🏃 Démarrage

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 🏗️ Build

```bash
npm run build
```

## 📁 Structure du projet

```
src/
├── app/              # Layout et page principale
├── components/       # Composants React
│   ├── ui/          # Composants UI de base
│   ├── map/         # Composants de carte
│   ├── dashboard/   # Widgets du tableau de bord
│   ├── data/        # Composants de données
│   ├── filters/     # Composants de filtrage
│   ├── navigation/  # Navigation
│   └── feedback/    # États de chargement/erreur
├── lib/             # Utilitaires et logique métier
│   ├── api/         # Clients API
│   ├── hooks/       # Hooks personnalisés
│   ├── stores/      # Stores Zustand
│   ├── utils/       # Fonctions utilitaires
│   └── constants/   # Constantes
├── styles/          # Styles globaux
└── types/           # Définitions TypeScript
```

## 🎨 Design System

L'application utilise un design system moderne avec :
- Palette de couleurs professionnelle
- Typographie Inter
- Espacement basé sur 8px
- Animations fluides
- Support de l'accessibilité

## 📝 Fonctionnalités

- ✅ Tableau de bord avec statistiques
- ✅ Carte interactive avec clustering
- ✅ Tableau de données avec tri et filtrage
- ✅ Export de données (CSV, JSON, XML, QuickStatements)
- ✅ Filtres avancés
- ✅ Détails des problèmes avec données Wikidata/OSM
- ✅ Timeline d'activité
- ✅ Visualisations de données

## 🔧 Configuration

Les constantes de configuration sont dans `src/lib/constants/config.ts`

## 🧪 Tests

```bash
npm run type-check  # Vérification TypeScript
npm run lint        # Vérification ESLint
```

## 🚀 Déploiement

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`.

## 📚 Documentation

- [Guide de contribution](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## 🔮 Prochaines étapes

- [ ] Tests unitaires avec Vitest
- [ ] Tests E2E avec Playwright
- [ ] Optimisation des performances (code splitting)
- [ ] Mode sombre
- [ ] Internationalisation (i18n)
- [ ] Service Worker pour le mode offline
- [ ] Intégration continue (CI/CD)

## 📄 Licence

MIT

