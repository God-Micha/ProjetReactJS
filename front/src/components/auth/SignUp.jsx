import React, { useState } from 'react';
import {TextField, Button, Container, Typography, Box, Link} from '@mui/material';
import {useAuth} from "../../AuthContext";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const { logIn } = useAuth();
    const navigate = useNavigate();
    const validateField = (name, value) => {
        if (!value.trim()) {
            setErrors(prev => ({ ...prev, [name]: 'Ce champ est requis.' }));
        } else {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    const handleBlur = (e) => {
        const {name, value} = e.target;
        setTouched(prev => ({...prev, [name]: true}));
        validateField(name, value);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        Object.keys(user).forEach(key => validateField(key, user[key]));
        if (Object.values(errors).some(error => error)) return;

        console.log(user);
        try {
            const response = await fetch('http://localhost:3001/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'L’inscription a échoué.');
            }

            const data = await response.json();
            console.log(data);
            localStorage.setItem('token', data.token);
            logIn();
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    const handleLoginLink = () => {
        navigate("/login", { replace: true });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Sign Up</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal" required fullWidth id="email" label="Email Address" name="email"
                        autoComplete="email" autoFocus value={user.email} onChange={handleChange}
                        error={!!errors.email} onBlur={handleBlur} helperText={errors.email}
                    />
                    <TextField
                        margin="normal" required fullWidth name="password" label="Password" type="password"
                        id="password" autoComplete="current-password" value={user.password}
                        onChange={handleChange} onBlur={handleBlur} error={!!errors.password} helperText={errors.password}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                </Box>
                <Link onClick={handleLoginLink}>Already registered? Log in!</Link>
            </Box>
        </Container>
    );
};

export default SignUp;
