import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PixelBoardCard from "../pixelBoard/PixelBoardCard";
import axios from "axios";
import { Container, Typography, Button, Grid } from "@mui/material";

const AdminPage = () => {
    const [pixelboards, setPixelboards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/api/canvas")
            .then(response => {
                setPixelboards(response.data);
            })
            .catch(error => {
                console.error("Error fetching pixelboards:", error);
            });
    }, []);

    const handleCreate = () => {
        navigate("/admin/newpixelboard");
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Page
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCreate}>
                New Pixel Board
            </Button>
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
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

export default AdminPage;