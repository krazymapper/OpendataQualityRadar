# Guide de Contribution

Merci de votre intérêt pour contribuer à OpenData Quality Radar !

## 🚀 Démarrage rapide

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd opendata-quality-radar
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer en mode développement**
   ```bash
   npm run dev
   ```

## 📝 Standards de code

- **TypeScript** : Utiliser des types stricts
- **ESLint** : Respecter les règles de linting
- **Formatage** : Utiliser Prettier (si configuré)
- **Commits** : Messages clairs et descriptifs

## 🧪 Tests

```bash
npm run test  # À implémenter
```

## 📦 Build

```bash
npm run build
```

## 🐛 Signaler un bug

Créez une issue avec :
- Description du problème
- Étapes pour reproduire
- Comportement attendu vs réel
- Environnement (OS, navigateur, version)

## ✨ Proposer une fonctionnalité

1. Créez une issue pour discuter
2. Attendez l'approbation
3. Créez une branche feature
4. Soumettez une Pull Request

## 📚 Structure du code

- `src/components/` : Composants React réutilisables
- `src/lib/` : Utilitaires et logique métier
- `src/types/` : Définitions TypeScript
- `src/styles/` : Styles globaux

## 🎨 Design System

Respecter le design system défini dans `tailwind.config.js` et `src/styles/theme.css`.

