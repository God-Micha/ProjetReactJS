import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import PixelBoardCard from "../admin/PixelBoardCard";
import { useAuth } from "../../AuthContext";
import { Button, Grid, Typography, Container } from '@mui/material';

const Homepage = () => {
    const api = 'http://localhost:3001/api/';
    const [pixelboards, setPixelboards] = useState([]);
    const navigate = useNavigate();
    const { logOut } = useAuth();

    const disconnect = () => {
        logOut();
        navigate('/login');
    }

    const redirectToAdmin = () => {
        navigate('/admin');
    }

    useEffect(() => {
        axios.get(`${api}canvas`)
            .then(response => {
                setPixelboards(response.data);
            })
            .catch(error => {
                console.error("Error fetching pixelboards:", error);
            });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Home Page
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Button variant="contained" color="primary" onClick={redirectToAdmin}>
                        Admin
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="secondary" onClick={disconnect}>
                        Log Out
                    </Button>
                </Grid>
            </Grid>
            <Typography variant="body1" gutterBottom>
                Actuellement, {pixelboards.length} pixelboards ont été créés.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Pixelboards
            </Typography>
            <Grid container spacing={3}>
                {pixelboards.map((board) => (
                    <Grid item xs={12} sm={6} md={4} key={board._id}>
                        <PixelBoardCard
                            id={board._id}
                            title={board.name}
                            status={board.status}
                            creationDate={board.createdAt}
                            endDate={board.endDate}
                            userId={board.creator}
                            collaborationDelay={board.editDelay}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Homepage;