import { Container, Grid, Button } from '@mui/material';
import React, { useState } from 'react';

const Filter = ({ onFilter }) => {
  const [value, setValue] = useState('');
  const [filterBy, setFilterBy] = useState('title');

  const onChange = (e) => {
    setFilterBy(e.target.value.toLowerCase());
  };

  const handleFilter = () => {
    onFilter({ filterBy, value });
  };

  return (
    <Container style={{margin:"10px", width:"40em"}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <label htmlFor="filterBy" className="block text-gray-600 mb-2">Filtrar por: </label>
          <select
            id="filterBy"
            onChange={onChange}
            value={filterBy}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="title">Título</option>
            <option value="content">Contenido</option>
            <option value="author">Autor</option>
          </select>
        </Grid>
        <Grid item xs={4}>
          <input type="text" placeholder="ingresa un valor" value={value} onChange={e => setValue(e.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <Button onClick={handleFilter} variant="outlined">Filtrar</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Filter;