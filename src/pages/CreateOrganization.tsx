import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { Business, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const industries = [
  'Tecnologia',
  'Saúde',
  'Educação',
  'Finanças',
  'Varejo',
  'Manufatura',
  'Serviços',
  'Energia',
  'Transporte',
  'Outros',
];

export const CreateOrganization: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here
      console.log('Organization created:', formData);
      
      navigate('/organizations');
    } catch (err) {
      setError('Erro ao criar organização. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/organizations')}
          sx={{ mb: 2 }}
        >
          Voltar
        </Button>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Criar Organização
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure uma nova organização para gerenciar seus agentes e dados.
        </Typography>
      </Box>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 3,
              p: 2,
              borderRadius: 2,
              bgcolor: theme.palette.primary.main,
              color: 'white',
            }}
          >
            <Business sx={{ mr: 2, fontSize: 32 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Nova Organização
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Configure os detalhes da sua organização
              </Typography>
            </Box>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome da Organização"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              sx={{ mb: 3 }}
              disabled={loading}
              helperText="Descreva o propósito e objetivos da organização"
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Indústria</InputLabel>
              <Select
                name="industry"
                value={formData.industry}
                label="Indústria"
                onChange={(e) => handleChange(e as any)}
                disabled={loading}
              >
                {industries.map((industry) => (
                  <MenuItem key={industry} value={industry}>
                    {industry}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/organizations')}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !formData.name || !formData.industry}
                startIcon={loading ? <CircularProgress size={20} /> : <Business />}
              >
                {loading ? 'Criando...' : 'Criar Organização'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}; 
