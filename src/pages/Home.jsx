import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Button, AppBar, Toolbar, Box, Grid } from '@mui/material';

import Filter from '../components/Filter';
import NewEntryForm from '../components/NewEntryForm';
import api from '../services/api'
import moment from 'moment';
import CustomAlert from '../components/CustomAlert';

const Home = () => {
    const [entries, setEntries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [showAlertError, setShowAlertError] = useState(false)
    const [msgAlert, setMsgAlert] = useState("")

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            setEntries([])
            const response = await api.get('/blog');
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    const handleFilter = async ({ filterBy, value }) => {
        try {
            if(!value){
                setMsgAlert("Se debe ingresar un valor de filtro");
                setShowAlertError(true);
                return
            }
            const response = await api.get(`/blog/search-by-${filterBy}/${value}`);
            setEntries(response.data);
            setMsgAlert("Nueva entrada guardada con exito."),
            setShowAlertSuccess(true);
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
                if (response.status === 201) {
                    setMsgAlert("Nueva entrada guardada con exito.")
                    setShowAlertSuccess(true)
                    fetchEntries();
                } else {
                    setMsgAlert('Hubo un problema al crear la entrada.')
                    setShowAlertError(true)
                }
                setIsModalOpen(false);
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
                alert('Hubo un problema al conectar con el servidor.');
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    const onCloseAlert = () => {
        setShowAlertError(false)
        setShowAlertSuccess(false)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" style={{
                backgroundColor: "rgba(16, 20, 24, 0.8)"
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
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
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                variant="outlined"
                                key="newBtn"
                                onClick={() => setIsModalOpen(true)}
                            >
                                New
                            </Button>
                        </Box>
                        <Filter onFilter={handleFilter} style={{ position: "flex", right: "0px" }} />
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="main" sx={{ p: 10 }}>
                <CustomAlert open= {showAlertSuccess} type="success" message= {msgAlert} onClose={onCloseAlert}></CustomAlert>
                <CustomAlert open= {showAlertError} type="error" message= {msgAlert} onClose={onCloseAlert}></CustomAlert>
                <Grid container spacing={2}>
                    {entries.map(entry => (
                        <Grid item xs={6}>
                            <Card key={entry.id} variant="outlined" style={{ marginBottom: '16px', width: "25em" }}>
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
                        </Grid>
                    ))}
                </Grid>
                <div>
                    <NewEntryForm
                        isOpen={isModalOpen}
                        onSubmit={newEntries}
                        onCancel={() => setIsModalOpen(false)}
                    ></NewEntryForm>
                </div>
            </Box>
        </Box>
    );
};

export default Home;