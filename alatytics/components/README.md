# Composants React pour l'Analyse du Trafic et de la Pollution

Ce dossier contient les composants React nécessaires pour afficher les analyses de trafic et de pollution.

## Prérequis

- Node.js et npm installés
- L'API Flask en cours d'exécution sur `http://localhost:5000`
- Les dépendances suivantes dans votre `package.json` :
  ```json
  {
    "dependencies": {
      "@mui/material": "^5.x.x",
      "@emotion/react": "^11.x.x",
      "@emotion/styled": "^11.x.x",
      "axios": "^1.x.x",
      "react": "^18.x.x",
      "react-dom": "^18.x.x"
    }
  }
  ```

## Configuration

Le fichier `config.js` contient les paramètres de configuration pour l'API :

```javascript
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000, // 10 secondes
  RETRY_ATTEMPTS: 3
};
```

Vous pouvez personnaliser ces paramètres ou utiliser des variables d'environnement pour les configurer.

## Composants Disponibles

### 1. TraficPollutionDashboard

Le composant principal qui affiche tous les graphiques d'analyse dans un tableau de bord.

```jsx
import TraficPollutionDashboard from './components/TraficPollutionDashboard';

function App() {
  return (
    <div>
      <TraficPollutionDashboard />
    </div>
  );
}
```

Caractéristiques :
- Affichage des 4 graphiques d'analyse
- Gestion des erreurs de chargement
- Bouton de réessai en cas d'échec
- Design responsive

### 2. DataTable

Un composant qui affiche les données brutes sous forme de tableaux interactifs.

```jsx
import DataTable from './components/DataTable';

function App() {
  return (
    <div>
      <DataTable />
    </div>
  );
}
```

Caractéristiques :
- Onglets pour basculer entre les données de trafic et de pollution
- Pagination des données
- Gestion des erreurs de chargement
- Bouton de réessai en cas d'échec

## Utilisation

1. Assurez-vous que l'API Flask est en cours d'exécution
2. Importez les composants dans votre application React
3. Utilisez-les comme montré dans les exemples ci-dessus

## Structure des Données

Les composants s'attendent à recevoir les données dans le format suivant de l'API :

### Données de Trafic
```json
{
  "positions": string[],
  "trafic_moyen": number[],
  "debit_horaire": number[],
  "heures": string[]
}
```

### Données de Pollution
```json
{
  "dates": string[],
  "types_polluants": string[],
  "etats": string[],
  "zones": string[]
}
```

### Graphiques
```json
{
  "image": string // Base64 encoded PNG image
}
```

## Personnalisation

Les composants utilisent Material-UI et peuvent être personnalisés en modifiant les props ou en surchargeant les styles.

## Gestion des Erreurs

Les composants incluent une gestion robuste des erreurs :
- Affichage des messages d'erreur
- Boutons de réessai
- États de chargement
- Timeouts configurables 