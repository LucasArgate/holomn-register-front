import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,

  useTheme,
} from '@mui/material';
import {
  Business,
  SmartToy,
  DataUsage,
  School,
  TrendingUp,
  Add,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const stats = [
  {
    title: 'Organizações',
    value: '3',
    icon: <Business />,
    color: '#361962',
    path: '/organizations',
  },
  {
    title: 'Agentes Ativos',
    value: '12',
    icon: <SmartToy />,
    color: '#2196f3',
    path: '/agents',
  },
  {
    title: 'Fontes de Dados',
    value: '8',
    icon: <DataUsage />,
    color: '#4caf50',
    path: '/data-sources',
  },
  {
    title: 'Modelos Treinados',
    value: '5',
    icon: <School />,
    color: '#ff9800',
    path: '/learning',
  },
];

const recentActivities = [
  {
    title: 'Novo agente criado',
    description: 'Agente de análise de dados foi configurado',
    time: '2 horas atrás',
    type: 'agent',
  },
  {
    title: 'Fonte de dados conectada',
    description: 'API do CRM foi integrada com sucesso',
    time: '4 horas atrás',
    type: 'data',
  },
  {
    title: 'Modelo atualizado',
    description: 'Modelo de classificação foi retreinado',
    time: '1 dia atrás',
    type: 'learning',
  },
];

export const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'agent':
        return <SmartToy fontSize="small" />;
      case 'data':
        return <DataUsage fontSize="small" />;
      case 'learning':
        return <School fontSize="small" />;
      default:
        return <TrendingUp fontSize="small" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'agent':
        return theme.palette.primary.main;
      case 'data':
        return theme.palette.success.main;
      case 'learning':
        return theme.palette.warning.main;
      default:
        return theme.palette.info.main;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bem-vindo de volta! Aqui está um resumo das suas atividades.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8],
                },
              }}
              onClick={() => navigate(stat.path)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      color: stat.color,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Ações Rápidas
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => navigate('/organizations/create')}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Criar Organização
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<SmartToy />}
                  onClick={() => navigate('/agents/create')}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Criar Agente
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DataUsage />}
                  onClick={() => navigate('/data-sources/create')}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Conectar Fonte de Dados
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Atividades Recentes
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentActivities.map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 1,
                      bgcolor: 'grey.50',
                    }}
                  >
                    <Box
                      sx={{
                        color: getActivityColor(activity.type),
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {getActivityIcon(activity.type)}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {activity.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.description}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Performance dos Agentes
          </Typography>
          <Box
            sx={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.50',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Gráfico de performance será exibido aqui
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}; 
