import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box 
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: '25px',
                textAlign: 'center',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
            }}
        >
            <Typography variant="body1">
                &copy; 2024 Pillar Foundation
            </Typography>
            <Link href="/developer" variant="body2" color="primary">
                Developer Page
            </Link>
        </Box>
    );
};

export default Footer;
