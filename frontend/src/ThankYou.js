import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <Container className="app-container" style={{ textAlign: 'center', marginTop: '20%' }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>Thank You!</Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>Your responses have been submitted successfully.</Typography>
            <Button variant="contained" color="primary" component={Link} to="/">Go to Home</Button>
        </Container>
    );
};

export default ThankYou;