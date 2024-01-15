import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

import Filter from '../components/Filter';
import NewEntryForm from '../components/NewEntryForm';
import api from '../services/api'
import moment from 'moment';

const Home = () => {
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await api.get('/blog');
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    const handleFilter = async ({ filterBy, value }) => {
        try {
            const response = await api.get(`/blog/search-by-${filterBy}/${value}`);
            setFilteredEntries(response.data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }

    };

    const newEntries = async ({ title, author, content }) => {
        try {
            // Verificar si todos los campos están llenos
            if (!title || !author || !content) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            // Construir el objeto de entrada
            const entry = {
                title,
                author,
                content,
                publicationDate: moment(new Date()).format('DD/MM/YYYY')
            };

            try {
                // Realizar la solicitud POST al backend con Axios
                const response = await api.post('/blog', entry);

                // Verificar si la solicitud fue exitosa (código de estado 200)
                if (response.status === 200) {
                    fetchEntries();
                } else {
                    alert('Hubo un problema al crear la entrada.');
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
                alert('Hubo un problema al conectar con el servidor.');
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    const handleNewEntry = (newEntry) => {
        setEntries([...entries, newEntry]);
        setIsModalOpen(false);
    };

    return (
        <div>
            <Container maxWidth="xl">
                <div>
                    <div style={{display:"flex"}}>
                        <Typography variant="h1" gutterBottom>Mi blog</Typography>
                        <IconButton
                            onClick={() =>
                                setIsModalOpen(true)}
                            color="secondary"
                            style={{right:10}}
                        >
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </div>
                    <Typography variant="h6" gutterBottom>Aqui puedes crear: artículos, opiniones, noticias, tutoriales, historias personales y cualquier otro tipo de contenido que desees compartir.</Typography>
                    <Divider light />
                    <Filter onFilter={handleFilter} />

                    {(filteredEntries.length > 0 ? filteredEntries : entries).map(entry => (
                        <Card key={entry.id} variant="outlined" style={{ marginBottom: '16px' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {entry.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {entry.content.substring(0, 70)}
                                </Typography>
                                <a href={`/entries/${entry.id}`}>Leer más</a>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div>
                    <NewEntryForm
                        isOpen={isModalOpen}
                        onRequestClose={handleNewEntry}
                        onSubmit={newEntries}
                        onCancel={() => setIsModalOpen(false)}
                    ></NewEntryForm>
                </div>
            </Container>
        </div>
    );
};

export default Home;