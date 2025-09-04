# 🧪 Tests Unitaires - Cesizen Frontend

## 📋 Vue d'ensemble

Ce projet inclut une suite complète de tests unitaires pour assurer la qualité et la fiabilité du code.

## 🏗️ Structure des Tests

```
src/
├── __tests__/
│   └── App.test.js                    # Tests du composant principal
├── components/
│   ├── auth/__tests__/
│   │   └── AuthGuard.test.js          # Tests de protection des routes
│   └── common/__tests__/
│       └── Header.test.js             # Tests du header
├── contexts/__tests__/
│   └── AuthContext.test.js            # Tests du contexte d'authentification
├── services/__tests__/
│   └── authService.test.js            # Tests des services API
├── utils/__tests__/
│   └── helpers.test.js                # Tests des fonctions utilitaires
└── setupTests.js                      # Configuration des tests
```

## 🚀 Commandes de Test

### **Exécuter tous les tests**
```bash
npm test
```

### **Tests avec couverture**
```bash
npm run test:coverage
```

### **Tests en mode watch**
```bash
npm test -- --watch
```

### **Tests d'un fichier spécifique**
```bash
npm test -- AuthContext.test.js
```

## 📊 Couverture de Code

Les tests couvrent :

✅ **Services** - Configuration API et formatage des données  
✅ **Utilitaires** - Fonctions helper (validation, formatage, admin)  
✅ **Tests de base** - Fonctions utilitaires simples  
✅ **Configuration** - Headers, endpoints, tokens  

## 🧪 Types de Tests

### **1. Tests de Services (authServiceSimple)**
- ✅ Configuration des URLs API
- ✅ Formatage des headers de requête
- ✅ Formatage des données de connexion
- ✅ Formatage des données d'inscription
- ✅ Gestion des tokens localStorage

### **2. Tests d'Utilitaires (helpers)**
- ✅ Formatage des dates
- ✅ Validation d'email
- ✅ Capitalisation de texte
- ✅ Troncature de texte
- ✅ Détection des administrateurs

### **3. Tests Simples (simple)**
- ✅ Fonctions utilitaires de base
- ✅ Validation d'email
- ✅ Formatage de dates
- ✅ Détection des rôles admin

## 🔧 Configuration

### **setupTests.js**
- Mock de localStorage
- Mock de fetch
- Mock de react-router-dom
- Configuration Jest

### **Mocks**
- Services API
- Composants de pages
- Navigation
- Contexte d'authentification

## 📈 Métriques de Qualité

### **Objectifs de Couverture**
- **Statements** : > 80%
- **Branches** : > 75%
- **Functions** : > 80%
- **Lines** : > 80%

### **Bonnes Pratiques**
- ✅ Tests isolés et indépendants
- ✅ Mocks appropriés
- ✅ Assertions claires
- ✅ Noms de tests descriptifs
- ✅ Setup/teardown propre

## 🚨 CI/CD Integration

Les tests sont automatiquement exécutés dans :

- **GitHub Actions** - À chaque push/PR
- **Vercel** - Avant déploiement
- **GitHub Pages** - Avant déploiement

## 🔍 Dépannage

### **Tests qui échouent**
```bash
# Voir les détails
npm test -- --verbose

# Tests spécifiques
npm test -- --testNamePattern="AuthContext"
```

### **Problèmes de mocks**
- Vérifier les imports dans setupTests.js
- S'assurer que les mocks sont correctement configurés
- Vérifier les dépendances des composants

### **Problèmes de timing**
- Utiliser `waitFor` pour les opérations asynchrones
- Utiliser `act` pour les mises à jour d'état
- Vérifier les timeouts Jest

## 📚 Ressources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**🎯 Objectif : Maintenir une couverture de tests élevée pour assurer la qualité du code !**
