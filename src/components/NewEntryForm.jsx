import { Box, Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import Modal from 'react-modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const NewEntryForm = ({ isOpen, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || author.trim() === '' || content.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    onSubmit({ title, author, content });

    setTitle('');
    setAuthor('');
    setContent('');
  };

  return (
    <Modal
      isOpen={isOpen}
    >
      <Box sx={style}>
        <h2 className="text-2xl font-bold mb-4">Nueva Entrada</h2>
        <form onSubmit={handleSubmit} style={{paddingTop:20}}>
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <TextField
                id="titulo"
                tabIndex="1"
                required
                fullWidth
                label="Titulo"
                defaultValue="Mi titulo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} style={{paddingTop:10}}>
              <TextField
                id="autor"
                tabIndex="2"
                required
                fullWidth
                label="Autor"
                defaultValue="Jhonny Deep"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} style={{paddingTop:10}}>
              <TextField
                id="contenido"
                tabIndex="3"
                required
                fullWidth
                label="Contenido"
                defaultValue="Mi contenido"
                multiline
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} style={{paddingTop:10}}>
              <Button type="submit" variant="outlined">Guardar Entrada</Button>
            </Grid>
            <Grid item xs={4} style={{paddingTop:10}}>
              <Button onClick={onCancel} style={{color:"red"}} >Cancelar</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default NewEntryForm;