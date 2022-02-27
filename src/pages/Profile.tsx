import React, { useContext, useState, useEffect } from "react";
import { Grid, Box, Paper, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText, Button, Stack, TextField } from "@mui/material";
import { Header } from "../components/header";
import { AccountContext } from "../context/Account";
import { WalletCard } from "../components/profile/wallet-card/WalletCard";
import { Transaction } from "../components/profile/transaction/Transaction";
import { UserCard } from "../components/profile/user-card/UserCard";
import { CardItem } from "../components/CardItem/CardItem";


export const Profile = () => {

    const { user } = useContext(AccountContext);

    return (
        <Box component="main" sx={{ height: "100vh" }}>
            <Header />
            <Typography pl={4} pt={8} variant="h2">Ваш аккаунт</Typography>
            <Box p={4} component="div">
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                >
                    <Grid item>
                        <UserCard />
                    </Grid>
                    <Grid item>
                        <WalletCard />
                    </Grid>
                    {/* <Grid item>
                        <Paper>
                            <Box
                                p={2}
                            >
                                <Typography color={"black"} variant="h4">Последние транзакции</Typography>
                                <List>
                                    <Transaction />
                                    <Transaction />
                                </List>
                                <Button variant="text">Показать все</Button>
                            </Box>
                        </Paper>
                    </Grid> */}
                </Grid>
            </Box >
            <Typography pl={4} variant="h2">Ваши активы</Typography>
            <Box p={4} sx={{ display: "flex", maxWidth: 600 }}>
                <List>
                    {/* <CardItem isProfile={true} /> */}
                </List>
            </Box>
            <Typography pl={4} variant="h2">Токенезация недвижимости(admin)</Typography>
            <Box maxWidth={400} p={2}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Street"
                    name="email"
                    autoComplete="email"
                    autoFocus
                // onChange={(event) => {
                //     setEmail(event.target.value);
                // }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Area"
                    type="text"
                    id="area"
                    autoComplete="current-password"
                // onChange={(event) => {
                //     setPassword(event.target.value);
                // }}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="knumber"
                    label="KNumber"
                    id="knumber"
                // onChange={(event) => {
                //     setPassword(event.target.value);
                // }}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="count"
                    label="Count"
                    type="number"
                    id="count"
                // onChange={(event) => {
                //     setPassword(event.target.value);
                // }}
                />
                <Button size="large" variant="contained">Создать</Button>
            </Box>
        </Box >
    );
}