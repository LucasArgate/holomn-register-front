import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link,
  useTheme,
} from '@mui/material';
import { Fingerprint, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro na autenticação');
    } finally {
      setLoading(false);
    }
  };





  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: theme.palette.primary.main,
              color: 'white',
              mx: 'auto',
            }}
          >
            <Fingerprint sx={{ fontSize: 40 }} />
          </Box>

          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Entrar
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Receba um link mágico por email para fazer login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 3 }}
              disabled={loading}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || !email}
              sx={{
                py: 1.5,
                mb: 3,
                position: 'relative',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  <Fingerprint sx={{ mr: 1 }} />
                  Enviar Link
                </>
              )}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Não tem uma conta?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/register')}
                  sx={{ textDecoration: 'none' }}
                >
                  Registrar
                </Link>
              </Typography>
            </Box>
          </form>

          <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Button
              variant="text"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
              sx={{ color: 'text.secondary' }}
            >
              Voltar ao início
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}; 
