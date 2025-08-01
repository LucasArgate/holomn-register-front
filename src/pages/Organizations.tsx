import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material';
import { Grid } from '@mui/material';
import { Business, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const mockOrganizations = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    description: 'Empresa de tecnologia focada em soluções inovadoras',
    industry: 'Tecnologia',
    status: 'active',
  },
  {
    id: '2',
    name: 'HealthCare Plus',
    description: 'Sistema de saúde integrado com IA',
    industry: 'Saúde',
    status: 'active',
  },
  {
    id: '3',
    name: 'EduTech Academy',
    description: 'Plataforma educacional com aprendizado personalizado',
    industry: 'Educação',
    status: 'active',
  },
];

export const Organizations: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Organizações
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie suas organizações e configurações
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/organizations/create')}
        >
          Nova Organização
        </Button>
      </Box>

      <Grid container spacing={3}>
                 {mockOrganizations.map((org) => (
           <Grid size={{ xs: 12, md: 4 }} key={org.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Business sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {org.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {org.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip label={org.industry} size="small" />
                  <Chip
                    label={org.status === 'active' ? 'Ativo' : 'Inativo'}
                    color={org.status === 'active' ? 'success' : 'default'}
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
