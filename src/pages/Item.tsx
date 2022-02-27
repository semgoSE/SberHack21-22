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
                <Box p={2}>
                    <Typography variant="h1" p={4} pt={8}>Test</Typography>
                    <Box component="img" src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" />
                    <Typography variant="body1" p={1} pt={2}>teststewtsyudgsahfj;osfagbhsj</Typography>
                </Box>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16
                }}>
                    <Box pt={8}>
                        <UserColumn />
                    </Box>
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
                </div>
            </Stack>
        </Box>
    );
}