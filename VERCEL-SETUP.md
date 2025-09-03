# 🚀 Configuration Vercel - Guide Simple

## 📋 Étapes pour Configurer Vercel

### 1. **Aller sur Vercel**
- Ouvrez [vercel.com](https://vercel.com)
- Connectez-vous avec GitHub

### 2. **Importer votre projet**
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

### 4. **Récupérer les informations nécessaires**

#### **Vercel Token :**
1. Allez dans [Vercel Account Settings](https://vercel.com/account/tokens)
2. Cliquez **"Create"**
3. Donnez un nom (ex: "GitHub Actions")
4. Copiez le token

#### **Project ID :**
1. Dans votre projet Vercel
2. Allez dans **Settings**
3. Copiez le **Project ID**

#### **Org ID :**
1. Dans [Vercel Dashboard](https://vercel.com/dashboard)
2. Copiez l'**Org ID** depuis l'URL

### 5. **Ajouter les secrets GitHub**
Dans GitHub > Repository > Settings > Secrets > Actions :

```
VERCEL_TOKEN=votre_token_ici
VERCEL_ORG_ID=votre_org_id_ici
VERCEL_PROJECT_ID=votre_project_id_ici
```

## ✅ **Résultat**
- **Push sur main** → Build automatique + Déploiement Vercel
- **URL de production** : `https://cesizen-front.vercel.app`
- **Déploiement automatique** à chaque modification

---
**Note :** Une fois configuré, le workflow GitHub Actions déploiera automatiquement !
