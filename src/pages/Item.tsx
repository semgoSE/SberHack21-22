import React from "react"
import { Grid, Typography, Box, Paper, Stack, Button, List } from "@mui/material";
import { Header } from "../components/header";
import { UserColumn } from "../components/profile/user-column/UserColumn";
import { Transaction } from "../components/profile/transaction/Transaction";
export const Item = () => {
    return (
        <Box component="main" sx={{ height: "100vh" }}>
            <Header />
            <Stack direction="row" spacing={2}>
                <div>
                    <Typography variant="h1" p={4} pt={8}>Test</Typography>
                    <Box sx={{ display: "flex" }}>
                        <Paper>
                            <Box component="img" src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" />
                        </Paper>
                    </Box>
                    <Typography variant="body1" p={1} pt={2}>teststewtsyudgsahfj;osfagbhsj</Typography>
                </div>
                <Grid container>
                    <Grid item>
                        <Box pt={8}>
                            <UserColumn />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Paper>
                            <Box p={2}>
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
            </Stack>
        </Box>
    );
}