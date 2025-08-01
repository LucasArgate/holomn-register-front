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
import { SmartToy, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const mockAgents = [
  {
    id: '1',
    name: 'Analista de Dados',
    description: 'Agente especializado em análise e processamento de dados',
    status: 'active',
    organization: 'TechCorp Solutions',
  },
  {
    id: '2',
    name: 'Assistente de Vendas',
    description: 'IA para otimização de vendas e leads',
    status: 'active',
    organization: 'HealthCare Plus',
  },
  {
    id: '3',
    name: 'Tutor Educacional',
    description: 'Agente de aprendizado personalizado',
    status: 'active',
    organization: 'EduTech Academy',
  },
];

export const Agents: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Agentes
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie seus agentes de IA
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/agents/create')}
        >
          Novo Agente
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockAgents.map((agent) => (
          <Grid item xs={12} md={4} key={agent.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SmartToy sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {agent.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {agent.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip label={agent.organization} size="small" variant="outlined" />
                  <Chip
                    label={agent.status === 'active' ? 'Ativo' : 'Inativo'}
                    color={agent.status === 'active' ? 'success' : 'default'}
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
