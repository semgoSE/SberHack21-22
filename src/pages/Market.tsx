import React from "react";
import { Avatar, Grid, Stack, Typography, Box, Autocomplete, TextField, Container } from "@mui/material";
import { Header } from "../components/header";
import { Search } from "../components/search";
import { CardItem } from "../components/CardItem/CardItem";

export const Market = () => {
    return (
        <Grid component="main" sx={{ height: '100vh' }}>
            <Header />
            <Search />
            <Box pt={8}>
                <Grid container spacing={4} sx={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    <Grid item>
                        <CardItem />
                    </Grid>
                    
                </Grid>
            </Box>
        </Grid>
    );
}