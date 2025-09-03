# 🚀 Déploiement Vercel - Guide Simple

## 📋 Étapes rapides

### 1. **Aller sur Vercel**
- Ouvrez [vercel.com](https://vercel.com)
- Connectez-vous avec GitHub

### 2. **Importer le projet**
- Cliquez **"New Project"**
- Sélectionnez **"Import Git Repository"**
- Choisissez `mehdilb8/cesizen-front`
- Cliquez **"Import"**

### 3. **Configuration automatique**
- **Framework Preset** : Create React App (détecté)
- **Root Directory** : `./`
- **Build Command** : `npm run build`
- **Output Directory** : `build`
- Cliquez **"Deploy"**

## 🔑 Secrets GitHub (pour CI/CD)

Dans GitHub > Repository > Settings > Secrets > Actions :

```
VERCEL_TOKEN=votre_token_vercel
VERCEL_ORG_ID=votre_org_id
VERCEL_PROJECT_ID=votre_project_id
```

## 🌐 URLs
- **Production** : `https://cesizen-front.vercel.app`
- **Preview** : `https://cesizen-front-git-feature-xyz.vercel.app`

## ✅ Vérification
- Le projet se déploie automatiquement
- Les tests passent sur GitHub Actions
- Le déploiement Vercel se déclenche sur push main

---
**Note** : Vercel détecte automatiquement React et configure tout !
