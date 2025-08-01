import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
  Zoom,
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  Security,
  Speed,
  Analytics,
  Chat,
  Business,
  DataUsage,
  Rocket,

  AutoAwesome,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <Security sx={{ fontSize: 48, color: '#4CAF50' }} />,
    title: 'Autenticação Segura',
    description: 'WebAuthn para login sem senhas, usando biometria ou chaves de segurança.',
    color: '#4CAF50',
  },
  {
    icon: <Speed sx={{ fontSize: 48, color: '#2196F3' }} />,
    title: 'Performance Otimizada',
    description: 'PWA responsivo com carregamento rápido e experiência offline.',
    color: '#2196F3',
  },
  {
    icon: <Analytics sx={{ fontSize: 48, color: '#FF9800' }} />,
    title: 'Análise Inteligente',
    description: 'IA avançada para análise de dados e insights automáticos.',
    color: '#FF9800',
  },
  {
    icon: <Chat sx={{ fontSize: 48, color: '#9C27B0' }} />,
    title: 'Chat Inteligente',
    description: 'Interface de conversação estilo WhatsApp com IA integrada.',
    color: '#9C27B0',
  },
  {
    icon: <Business sx={{ fontSize: 48, color: '#607D8B' }} />,
    title: 'Gestão de Organizações',
    description: 'Crie e gerencie múltiplas organizações com facilidade.',
    color: '#607D8B',
  },
  {
    icon: <DataUsage sx={{ fontSize: 48, color: '#E91E63' }} />,
    title: 'Fontes de Dados',
    description: 'Conecte e gerencie diversas fontes de dados para sua IA.',
    color: '#E91E63',
  },
];

const stats = [
  { number: '99.9%', label: 'Uptime' },
  { number: '50ms', label: 'Latência' },
  { number: '10M+', label: 'Usuários' },
  { number: '24/7', label: 'Suporte' },
];

export const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 50%, #1a0b2e 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg">
                     <Grid container spacing={4} alignItems="center">
             <Grid size={{ xs: 12, md: 6 }}>
              <Fade in timeout={1000}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rocket sx={{ fontSize: 40, mr: 2, color: '#FFD700' }} />
                    <Typography
                      variant={isMobile ? 'h3' : 'h2'}
                      component="h1"
                      sx={{ 
                        fontWeight: 800, 
                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      }}
                    >
                      GoProject
                    </Typography>
                  </Box>
                  <Typography
                    variant={isMobile ? 'h6' : 'h5'}
                    sx={{ 
                      mb: 4, 
                      opacity: 0.95, 
                      lineHeight: 1.8,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    Plataforma de IA moderna com autenticação WebAuthn e experiência PWA completa.
                    Gerencie organizações, conecte dados e converse com IA de forma intuitiva.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/login')}
                      sx={{
                        bgcolor: '#FFD700',
                        color: '#1a0b2e',
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
                        '&:hover': {
                          bgcolor: '#FFA500',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(255, 215, 0, 0.6)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Entrar
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/register')}
                      sx={{
                        borderColor: '#FFD700',
                        color: '#FFD700',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: '#FFA500',
                          bgcolor: 'rgba(255, 215, 0, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Registrar
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
                         <Grid size={{ xs: 12, md: 6 }}>
              <Grow in timeout={1500}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: { xs: 300, md: 400 },
                  }}
                >
                  <Paper
                    elevation={12}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -50,
                        right: -50,
                        width: 100,
                        height: 100,
                        background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
                        borderRadius: '50%',
                      },
                    }}
                  >
                    <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                      <AutoAwesome sx={{ fontSize: 60, color: '#FFD700', mb: 2 }} />
                      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#FFD700' }}>
                        🚀 Próxima Geração
                      </Typography>
                      <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9, fontWeight: 500 }}>
                        Tecnologia WebAuthn + PWA + IA
                      </Typography>
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700 }}>WebAuthn</Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>Segurança</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700 }}>PWA</Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>Performance</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700 }}>IA</Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>Inteligência</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
                     <Grid container spacing={3}>
             {stats.map((stat, index) => (
               <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Zoom in timeout={1000 + index * 200}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: theme.palette.primary.main, mb: 1 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ 
              fontWeight: 800,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Recursos Principais
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
            Descubra como nossa plataforma revoluciona a experiência de IA com tecnologia de ponta
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
                         <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Grow in timeout={1000 + index * 200}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 40px rgba(0,0,0,0.15)`,
                      '& .feature-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${feature.color}, ${theme.palette.primary.main})`,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                    <Box
                      className="feature-icon"
                      sx={{
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="50" cy="50" r="3"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Fade in timeout={1000}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{ 
                  mb: 3, 
                  fontWeight: 800,
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Pronto para começar?
              </Typography>
            </Fade>
            <Fade in timeout={1200}>
              <Typography
                variant="h6"
                sx={{ 
                  mb: 6, 
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.9)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                Junte-se à revolução da IA com segurança e simplicidade.
                Transforme sua experiência digital hoje mesmo.
              </Typography>
            </Fade>
            <Fade in timeout={1400}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    px: 6, 
                    py: 2,
                    borderRadius: 3,
                    bgcolor: '#FFD700',
                    color: '#1a0b2e',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4)',
                    '&:hover': {
                      bgcolor: '#FFA500',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 25px rgba(255, 215, 0, 0.6)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Criar Conta
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{ 
                    px: 6, 
                    py: 2,
                    borderRadius: 3,
                    borderColor: '#FFD700',
                    color: '#FFD700',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#FFA500',
                      bgcolor: 'rgba(255, 215, 0, 0.1)',
                      transform: 'translateY(-3px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Fazer Login
                </Button>
              </Box>
            </Fade>
          </Box>
        </Container>
      </Box>

      {/* Footer com versão */}
      <Box
        sx={{
          py: 2,
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                opacity: 0.7,
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.5px'
              }}
            >
              v1.0.0.1 beta
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}; 