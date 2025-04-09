import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
  Tabs,
  Tab,
  Alert,
  Button,
  Pagination
} from '@mui/material';
import API_CONFIG from './config';

const DataTable = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [traficData, setTraficData] = useState({ loading: true, data: [], error: null });
  const [pollutionData, setPollutionData] = useState({ loading: true, data: [], error: null });
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [globalError, setGlobalError] = useState(null);

  const fetchData = async () => {
    setGlobalError(null);
    try {
      const [trafic, pollution] = await Promise.all([
        axios.get(`${API_CONFIG.BASE_URL}/data/trafic`, { timeout: API_CONFIG.TIMEOUT }),
        axios.get(`${API_CONFIG.BASE_URL}/data/pollution`, { timeout: API_CONFIG.TIMEOUT })
      ]);

      setTraficData({
        loading: false,
        error: null,
        data: trafic.data.positions.map((pos, index) => ({
          position: pos,
          traficMoyen: trafic.data.trafic_moyen[index],
          debitHoraire: trafic.data.debit_horaire[index],
          heure: trafic.data.heures[index]
        }))
      });

      setPollutionData({
        loading: false,
        error: null,
        data: pollution.data.dates.map((date, index) => ({
          date,
          typePolluant: pollution.data.types_polluants[index],
          etat: pollution.data.etats[index],
          zone: pollution.data.zones[index]
        }))
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setGlobalError('Impossible de charger les données. Veuillez vérifier la connexion à l\'API.');
      
      setTraficData(prev => ({ ...prev, loading: false, error: 'Erreur de chargement' }));
      setPollutionData(prev => ({ ...prev, loading: false, error: 'Erreur de chargement' }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1); // Réinitialiser la pagination lors du changement d'onglet
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRetry = () => {
    setTraficData(prev => ({ ...prev, loading: true, error: null }));
    setPollutionData(prev => ({ ...prev, loading: true, error: null }));
    fetchData();
  };

  // Calculer les données paginées
  const getPaginatedData = () => {
    const data = activeTab === 0 ? traficData.data : pollutionData.data;
    const startIndex = (page - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  };

  // Calculer le nombre total de pages
  const getTotalPages = () => {
    const data = activeTab === 0 ? traficData.data : pollutionData.data;
    return Math.ceil(data.length / rowsPerPage);
  };

  if (traficData.loading || pollutionData.loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {globalError && (
        <Alert severity="error" sx={{ m: 2 }}>
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
      
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Données Trafic" />
        <Tab label="Données Pollution" />
      </Tabs>

      {activeTab === 0 && (
        <>
          {traficData.error ? (
            <Box p={3}>
              <Alert severity="error">{traficData.error}</Alert>
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Position</TableCell>
                      <TableCell>Trafic Moyen</TableCell>
                      <TableCell>Débit Horaire</TableCell>
                      <TableCell>Heure</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getPaginatedData().map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.position}</TableCell>
                        <TableCell>{row.traficMoyen}</TableCell>
                        <TableCell>{row.debitHoraire}</TableCell>
                        <TableCell>{row.heure}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box display="flex" justifyContent="center" p={2}>
                <Pagination 
                  count={getTotalPages()} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                />
              </Box>
            </>
          )}
        </>
      )}

      {activeTab === 1 && (
        <>
          {pollutionData.error ? (
            <Box p={3}>
              <Alert severity="error">{pollutionData.error}</Alert>
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type de Polluant</TableCell>
                      <TableCell>État</TableCell>
                      <TableCell>Zone</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getPaginatedData().map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.typePolluant}</TableCell>
                        <TableCell>{row.etat}</TableCell>
                        <TableCell>{row.zone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box display="flex" justifyContent="center" p={2}>
                <Pagination 
                  count={getTotalPages()} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                />
              </Box>
            </>
          )}
        </>
      )}
    </Paper>
  );
};

export default DataTable; 