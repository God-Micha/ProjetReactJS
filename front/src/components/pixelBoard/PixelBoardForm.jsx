import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const PixelBoardForm = () => {
    const [title, setTitle] = useState('NewPixelBoard');
    const [titleError, setTitleError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title.trim() === '') {
            setTitleError('Le champ Titre ne peut pas être vide.');
            return;
        }
        setTitleError('');
        const userId = localStorage.getItem("userId");
        const data = {
            creator: userId,
            name: title,
        };
        try {
            await axios.post('http://localhost:3001/api/canvas', data);
            console.log("Creating canvas");
            navigate("/admin");
        } catch (error) {
            console.error("Erreur lors de la création du canvas:", error);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (e.target.value.trim() === '') {
            setTitleError('Le champ Titre ne peut pas être vide.');
        } else {
            setTitleError('');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Créer un nouveau PixelBoard
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Titre"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        value={title}
                        onChange={handleTitleChange}
                        error={!!titleError}
                        helperText={titleError}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Soumettre
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default PixelBoardForm;