import React from "react";
import { Box, Button, Typography } from "@mui/material";

export const CardItem = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column' },
                alignItems: 'center',
                bgcolor: 'background.paper',
                overflow: 'hidden',
                borderRadius: '25px',
                boxShadow: 1,
                fontWeight: 'bold',
                maxWidth: 300,
            }}
        >
            <Box
                component="img"
                sx={{
                    width: "100%",
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                }}
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                alt="The house from the offer."
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 1
                }}
            >
                <Typography align="center" component="span" sx={{ fontSize: 22 }}>
                    123 Main St, Phoenix AZ
                </Typography>
                <Typography align="center" component="span" sx={{ fontSize: 18 }}>
                    $280,000
                </Typography>
            </Box>
            <Box component="div" mb={1}>
                <Button>Подробнее</Button>
            </Box>
        </Box>
    );
}