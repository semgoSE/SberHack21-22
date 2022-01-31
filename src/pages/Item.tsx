import React from "react"
import { Grid, Typography, Box, Paper } from "@mui/material";
import { Header } from "../components/header";
export const Item = () => {
    return(
        <Box component="main" sx={{ height: "100vh" }}>
            <Header />
            <Typography variant="h1" p={4} pt={8}>Test</Typography>
            <Box sx={{ display: "flex" }}>
                <Paper>
                    <Box>
                    
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}