import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, AppBar, Container } from '@mui/material';
import moment from 'moment';

import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

import api from '../services/api'

const EntryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await api.get('/blog/' + id);
        setEntry(response.data);
      } catch (error) {
        console.error('Error fetching entry:', error);
      }
    };

    fetchEntry();
  }, [id]);

  if (!entry) {
    return <div>Cargando...</div>;
  }

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" style={{
        backgroundColor: "rgba(16, 20, 24, 0.8)"
      }}>
        <Container>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Mi blog
          </Typography>
          <IconButton onClick={redirectToHome} color="secondary">
            <HomeIcon fontSize="large" />
          </IconButton>
        </Container>
      </AppBar>
      <Box component="main" sx={{ p: 10 }}>
        <Card variant="outlined" style={{ marginTop: '16px' }}>
          <CardContent>
            <Typography variant="h4" component="div">
              {entry.title}
            </Typography>
            <Typography variant="body1">{entry.content}</Typography>
            <Typography variant="body2">
              Autor: {entry.author}</Typography>
            <Typography variant="body2">
              Fecha de Publicación: {moment(new Date(entry.publicationDate)).format("DD/MM/YYYY")}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EntryDetail;