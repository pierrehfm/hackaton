import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box
} from '@mui/material';

const GraphCard = ({ title, imagePath }) => (
  <Paper 
    elevation={3} 
    sx={{ 
      p: 2, 
      height: 'auto', 
      maxWidth: '100%' 
    }}
  >
    <Typography variant="h6" align="center" gutterBottom>
      {title}
    </Typography>
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
      sx={{
        height: 'auto',
        overflow: 'hidden'
      }}
    >
      <img 
        src={imagePath} 
        alt={title} 
        style={{ 
          width: '100%', 
          height: 'auto', 
          objectFit: 'contain'
        }} 
      />
    </Box>
  </Paper>
);

const TraficPollutionDashboard = () => {
  const graphs = [
    { title: 'Corrélation Trafic-Pollution', imagePath: '/chart/correlation_trafic.png' },
    { title: 'Pics de Trafic', imagePath: '/chart/pics_trafic.png' },
    { title: 'Distribution Spatiale', imagePath: '/chart/distribution_spatiale.png' },
    { title: 'Tendances de Pollution', imagePath: '/chart/tendances_pollution.png' }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ mb: 4, fontSize: '2rem' }}
      >
        Tableau de bord Trafic et Pollution
      </Typography>
      <Grid container spacing={2}>
        {graphs.map((graph, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            key={index} 
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <GraphCard title={graph.title} imagePath={graph.imagePath} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TraficPollutionDashboard;
