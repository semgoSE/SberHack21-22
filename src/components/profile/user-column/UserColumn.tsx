import React from "react"
import { Grid, Typography, Box, Paper, Avatar } from "@mui/material";
import { Header } from "../../header";

export const UserColumn = () => {
    return (
        <Paper>
            <Box component="main" sx={{ flexDirection: "column", display: "flex", alignItems: "center" }}>
                <Typography variant="h4" p={1}>Test</Typography>
                <Avatar />
                <Typography variant="body1" p={1} pt={2}>teststewtsyudgsahfj;osfagbhsj</Typography>
            </Box>
        </Paper>
    );
}