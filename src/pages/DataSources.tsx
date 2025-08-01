import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { DataUsage, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const mockDataSources = [
  {
    id: '1',
    name: 'CRM Database',
    type: 'database',
    status: 'connected',
    organization: 'TechCorp Solutions',
  },
  {
    id: '2',
    name: 'Sales API',
    type: 'api',
    status: 'connected',
    organization: 'HealthCare Plus',
  },
  {
    id: '3',
    name: 'Student Records',
    type: 'file',
    status: 'connected',
    organization: 'EduTech Academy',
  },
];

export const DataSources: React.FC = () => {
  const navigate = useNavigate();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'database':
        return 'primary';
      case 'api':
        return 'secondary';
      case 'file':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'success';
      case 'disconnected':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Fontes de Dados
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie suas conexões de dados
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/data-sources/create')}
        >
          Nova Fonte
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockDataSources.map((source) => (
          <Grid item xs={12} md={4} key={source.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DataUsage sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {source.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {source.organization}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={source.type.toUpperCase()} 
                    size="small" 
                    color={getTypeColor(source.type) as any}
                  />
                  <Chip
                    label={source.status === 'connected' ? 'Conectado' : source.status}
                    color={getStatusColor(source.status) as any}
                    size="small"
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
