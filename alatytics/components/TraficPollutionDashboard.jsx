import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import API_CONFIG from './config';

const API_BASE_URL = 'http://localhost:5000/api';

const GraphCard = ({ title, imageData, loading, error }) => (
  <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {loading ? (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    ) : error ? (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <Alert severity="error">{error}</Alert>
      </Box>
    ) : (
      <img 
        src={`data:image/png;base64,${imageData}`} 
        alt={title}
        style={{ width: '100%', height: 'auto' }}
      />
    )}
  </Paper>
);

const TraficPollutionDashboard = () => {
  const [graphs, setGraphs] = useState({
    correlation: { data: null, loading: true, error: null },
    pics: { data: null, loading: true, error: null },
    spatial: { data: null, loading: true, error: null },
    tendances: { data: null, loading: true, error: null }
  });
  const [globalError, setGlobalError] = useState(null);

  const fetchGraphs = async () => {
    setGlobalError(null);
    try {
      const [correlation, pics, spatial, tendances] = await Promise.all([
        axios.get(`${API_CONFIG.BASE_URL}/graphs/correlation`, { timeout: API_CONFIG.TIMEOUT }),
        axios.get(`${API_CONFIG.BASE_URL}/graphs/pics`, { timeout: API_CONFIG.TIMEOUT }),
        axios.get(`${API_CONFIG.BASE_URL}/graphs/spatial`, { timeout: API_CONFIG.TIMEOUT }),
        axios.get(`${API_CONFIG.BASE_URL}/graphs/tendances`, { timeout: API_CONFIG.TIMEOUT })
      ]);

      setGraphs({
        correlation: { data: correlation.data.image, loading: false, error: null },
        pics: { data: pics.data.image, loading: false, error: null },
        spatial: { data: spatial.data.image, loading: false, error: null },
        tendances: { data: tendances.data.image, loading: false, error: null }
      });
    } catch (error) {
      console.error('Erreur lors du chargement des graphiques:', error);
      setGlobalError('Impossible de charger les graphiques. Veuillez vérifier la connexion à l\'API.');
      
      // Marquer tous les graphiques comme ayant une erreur
      setGraphs(prev => ({
        correlation: { ...prev.correlation, loading: false, error: 'Erreur de chargement' },
        pics: { ...prev.pics, loading: false, error: 'Erreur de chargement' },
        spatial: { ...prev.spatial, loading: false, error: 'Erreur de chargement' },
        tendances: { ...prev.tendances, loading: false, error: 'Erreur de chargement' }
      }));
    }
  };

  useEffect(() => {
    fetchGraphs();
  }, []);

  const handleRetry = () => {
    // Réinitialiser l'état de chargement pour tous les graphiques
    setGraphs(prev => ({
      correlation: { ...prev.correlation, loading: true, error: null },
      pics: { ...prev.pics, loading: true, error: null },
      spatial: { ...prev.spatial, loading: true, error: null },
      tendances: { ...prev.tendances, loading: true, error: null }
    }));
    
    // Réessayer de charger les données
    fetchGraphs();
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord Trafic et Pollution
      </Typography>
      
      {globalError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {globalError}
          <Button 
            color="inherit" 
            size="small" 
            onClick={handleRetry}
            sx={{ ml: 2 }}
          >
            Réessayer
          </Button>
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <GraphCard
            title="Corrélation Trafic-Pollution"
            imageData={graphs.correlation.data}
            loading={graphs.correlation.loading}
            error={graphs.correlation.error}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <GraphCard
            title="Pics de Trafic"
            imageData={graphs.pics.data}
            loading={graphs.pics.loading}
            error={graphs.pics.error}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <GraphCard
            title="Distribution Spatiale"
            imageData={graphs.spatial.data}
            loading={graphs.spatial.loading}
            error={graphs.spatial.error}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <GraphCard
            title="Tendances de Pollution"
            imageData={graphs.tendances.data}
            loading={graphs.tendances.loading}
            error={graphs.tendances.error}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TraficPollutionDashboard; 