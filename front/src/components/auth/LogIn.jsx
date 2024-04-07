// components/LogIn.jsx
import React, {useState} from 'react';
import {TextField, Button, Container, Typography, Box, Link} from '@mui/material';
import setupAxiosConfig from "../../axiosConfig";
import {useAuth} from "../../AuthContext";
import {useNavigate} from "react-router-dom";

const LogIn = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const { logIn } = useAuth();
    const navigate = useNavigate();

    const validateField = (name, value) => {
        if (!value.trim()) {
            setErrors(prev => ({...prev, [name]: 'Ce champ est requis.'}));
        } else {
            setErrors(prev => ({...prev, [name]: ''}));
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials(prev => ({...prev, [name]: value}));
        if (touched[name]) {
            validateField(name, value);
        }
    };

    const handleBlur = (e) => {
        const {name, value} = e.target;
        setTouched(prev => ({...prev, [name]: true}));
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!credentials.email.trim() || !credentials.password.trim()) {
            alert("Email et mot de passe sont requis.");
            return;
        }

        console.log(credentials);
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'La connexion a échoué.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            logIn();
            //props.onLoginSuccess();
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    const handleSignupLink = () => {
        navigate("/signup", { replace: true });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography component="h1" variant="h5">Log In</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal" required fullWidth id="email" label="Email Address" name="email"
                        autoComplete="email" autoFocus value={credentials.email} onChange={handleChange}
                        onBlur={handleBlur} error={!!errors.email} helperText={errors.email}
                    />
                    <TextField
                        margin="normal" required fullWidth name="password" label="Password" type="password"
                        id="password" autoComplete="current-password" value={credentials.password}
                        onChange={handleChange} onBlur={handleBlur} error={!!errors.password}
                        helperText={errors.password}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Log In</Button>
                </Box>
                <Link onClick={handleSignupLink}>You're not registered yet? Sign up!</Link>
            </Box>
        </Container>
    );
};

export default LogIn;
