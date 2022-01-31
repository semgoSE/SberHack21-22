import React, { useContext } from "react";
import { Grid, Box, Paper, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText, Button, Stack } from "@mui/material";
import { Header } from "../components/header";
import { AccountContext } from "../context/Account";
import { WalletCard } from "../components/profile/wallet-card/WalletCard";
import { Transaction } from "../components/profile/transaction/Transaction";
import { UserCard } from "../components/profile/user-card/UserCard";


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
                    <Grid item>
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
                    </Grid>
                </Grid>
            </Box >
            <Typography pl={4} variant="h2">Ваши активы</Typography>
            <Box p={4}>
                <Grid container spacing={4}>
                    <Grid item>
                        <Paper>
                            <Box component="img" src="" sx={{ borderTopRightRadius: 16, borderTopLeftRadius: 16 }} />
                            <Typography>Ntrcn</Typography>
                            <Box>
                                <Button>Подробнее</Button>
                                <Button variant="contained">Выставить на продажу</Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
}