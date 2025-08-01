import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  useTheme,

} from '@mui/material';
import {
  Send,
  AttachFile,
  MoreVert,
  Search,
} from '@mui/icons-material';
import type { ChatMessage } from '../types';

interface ChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  loading?: boolean;
}

export const Chat: React.FC<ChatProps> = ({ messages, onSendMessage, loading = false }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && !loading) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f0f2f5',
      }}
    >
      {/* Header */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          bgcolor: theme.palette.primary.main,
          color: 'white',
          borderRadius: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: 'white',
              color: theme.palette.primary.main,
              width: 40,
              height: 40,
            }}
          >
            AI
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              GoProject AI
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {loading ? 'Digitando...' : 'Online'}
            </Typography>
          </Box>
          <IconButton color="inherit" size="small">
            <Search />
          </IconButton>
          <IconButton color="inherit" size="small">
            <MoreVert />
          </IconButton>
        </Box>
      </Paper>

      {/* Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 1,
            }}
          >
            <Box
              sx={{
                maxWidth: '70%',
                minWidth: 120,
                p: 2,
                borderRadius: 2,
                bgcolor: message.sender === 'user' ? theme.palette.primary.main : 'white',
                color: message.sender === 'user' ? 'white' : 'text.primary',
                boxShadow: 1,
                position: 'relative',
              }}
            >
              <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                {message.content}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 1,
                  opacity: 0.7,
                  textAlign: message.sender === 'user' ? 'right' : 'left',
                }}
              >
                {formatTime(message.timestamp)}
              </Typography>
            </Box>
          </Box>
        ))}
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'white',
                boxShadow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.main,
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.3 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.main,
                  animation: 'pulse 1.5s infinite 0.2s',
                }}
              />
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.main,
                  animation: 'pulse 1.5s infinite 0.4s',
                }}
              />
            </Box>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          bgcolor: 'white',
          borderRadius: 0,
        }}
      >
        <form onSubmit={handleSendMessage}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" disabled={loading}>
              <AttachFile />
            </IconButton>
            <TextField
              fullWidth
              placeholder="Digite uma mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: '#f0f2f5',
                },
              }}
            />
            <IconButton
              type="submit"
              color="primary"
              disabled={!newMessage.trim() || loading}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: 'white',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
                '&:disabled': {
                  bgcolor: 'grey.300',
                  color: 'grey.500',
                },
              }}
            >
              <Send />
            </IconButton>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}; 