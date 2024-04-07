import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Paper, Box } from "@mui/material";

const UserSpacePage = () => {
    const [email, setEmail] = useState("");
    const [nbPixel, setNbPixel] = useState(0);
    const [nbPixelboards, setNbPixelboards] = useState(0);

    useEffect(() => {
        // Remplacer "userId" par l'ID utilisateur réel stocké
        const userId = localStorage.getItem("userId");
        axios.get(`http://localhost:3001/api/user/${userId}`)
            .then(response => {
                setEmail(response.data.email);
                setNbPixel(response.data.numberOfPixels);
                setNbPixelboards(response.data.pixelActions.length);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    User Space
                </Typography>
                <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                    <Typography variant="h5">{email}</Typography>
                    <Typography>Number of pixels placed: {nbPixel}</Typography>
                    <Typography>Number of pixelboards edited: {nbPixelboards}</Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default UserSpacePage;