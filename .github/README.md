# 🚀 GitHub Actions - CI/CD Pipeline

Ce dossier contient les workflows GitHub Actions pour automatiser la CI/CD de votre projet CESIZen Frontend.

## 📁 Structure des fichiers

```
.github/
├── workflows/
│   ├── ci-cd.yml          
│  
└── README.md              
```

## 🔄 Workflows disponibles

### 1. **CI/CD Pipeline** (`ci-cd.yml`)
**Déclencheur :** Push sur `main`/`develop`, Pull Requests
**Fonctionnalités :**
- ✅ Tests et build de l'application
- 🐳 Build et push d'images Docker
- 🚀 Déploiement automatique (staging/production)
- 🔒 Scan de sécurité avec Trivy
- 📢 Notifications d'équipe

## 🎯 Utilisation

### **Déclenchement automatique**
- **Push sur `main`** → Build Docker + Déploiement production
- **Push sur `develop`** → Build Docker + Déploiement staging
- **Pull Request** → Vérifications complètes

### **Déclenchement manuel**
1. Allez dans l'onglet **Actions** de votre repo
2. Sélectionnez **Deploy Application**
3. Cliquez **Run workflow**
4. Choisissez l'environnement cible
5. Cliquez **Run workflow**

## 🔧 Configuration requise

### **Secrets GitHub**
Configurez ces secrets dans `Settings > Secrets and variables > Actions` :

```bash
# Pour le staging
STAGING_DEPLOY_KEY=your_staging_key
STAGING_DATABASE_URL=your_staging_db_url
STAGING_API_KEY=your_staging_api_key

# Pour la production
PRODUCTION_DEPLOY_KEY=your_production_key
PRODUCTION_DATABASE_URL=your_production_db_url
PRODUCTION_API_KEY=your_production_api_key
PRODUCTION_SSL_CERT=your_ssl_cert
```

### **Environnements**
Créez les environnements dans `Settings > Environments` :
- **staging** : Pour les tests et validations
- **production** : Pour la mise en production

## 📊 Monitoring

### **Actions Dashboard**
- Suivez l'exécution des workflows en temps réel
- Consultez les logs détaillés
- Identifiez les goulots d'étranglement

### **Security Tab**
- Résultats des scans Trivy
- Vulnérabilités détectées
- Recommandations de sécurité

### **Artifacts**
- Fichiers de build conservés 7 jours
- Rapports de sécurité conservés 30 jours
- Images Docker disponibles dans le registry

## 🚨 Dépannage

### **Workflow en échec**
1. **Vérifiez les logs** dans l'onglet Actions
2. **Identifiez l'étape** qui a échoué
3. **Consultez les artifacts** pour plus de détails
4. **Vérifiez les secrets** et variables d'environnement

### **Problèmes courants**
- **Build échoue** → Vérifiez les tests et le linting
- **Docker échoue** → Vérifiez le Dockerfile et .dockerignore
- **Déploiement échoue** → Vérifiez les clés et permissions
- **Sécurité échoue** → Mettez à jour les dépendances vulnérables

## 🔄 Personnalisation

### **Ajouter des étapes**
```yaml
- name: Custom Step
  run: |
    echo "Votre commande personnalisée"
    # Ajoutez vos scripts ici
```

### **Modifier les déclencheurs**
```yaml
on:
  push:
    branches: [ main, develop, feature/* ]
  pull_request:
    branches: [ main, develop ]
  schedule:
    - cron: '0 2 * * *'  # Tous les jours à 2h du matin
```

### **Ajouter des notifications**
```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## 📚 Ressources utiles

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Build Action](https://github.com/docker/build-push-action)
- [Trivy Security Scanner](https://github.com/aquasecurity/trivy-action)
- [Environment Protection Rules](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

---

**Note :** Ces workflows sont optimisés pour React + Docker. Adaptez-les selon vos besoins spécifiques.
