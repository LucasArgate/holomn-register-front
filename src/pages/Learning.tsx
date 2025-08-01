import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Grid,
} from '@mui/material';
import { School, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const mockModels = [
  {
    id: '1',
    name: 'Classificador de Texto',
    description: 'Modelo para classificação automática de documentos',
    status: 'trained',
    accuracy: 95,
    organization: 'TechCorp Solutions',
  },
  {
    id: '2',
    name: 'Preditor de Vendas',
    description: 'IA para previsão de vendas e leads',
    status: 'training',
    accuracy: 87,
    organization: 'HealthCare Plus',
  },
  {
    id: '3',
    name: 'Tutor Personalizado',
    description: 'Modelo de aprendizado adaptativo',
    status: 'trained',
    accuracy: 92,
    organization: 'EduTech Academy',
  },
];

export const Learning: React.FC = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'trained':
        return 'success';
      case 'training':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'trained':
        return 'Treinado';
      case 'training':
        return 'Treinando';
      case 'failed':
        return 'Falhou';
      default:
        return status;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Aprendizado
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie seus modelos de IA
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/learning/create')}
        >
          Novo Modelo
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockModels.map((model) => (
          <Grid item xs={12} md={4} key={model.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <School sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {model.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {model.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {model.organization}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Precisão
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {model.accuracy}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={model.accuracy} 
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={getStatusText(model.status)}
                    color={getStatusColor(model.status) as any}
                    size="small"
                  />
                  <Chip
                    label={`${model.accuracy}%`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 
