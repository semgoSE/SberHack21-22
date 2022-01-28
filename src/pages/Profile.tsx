import React, { useContext } from "react";
import { Grid, Box, Paper, Avatar, Typography } from "@mui/material";
import { Header } from "../components/header";
import { AccountContext } from "../context/Account";


export const Profile = () => {

    const { user } = useContext(AccountContext);

    return(
        <Grid component="main" sx={{ height: "100vh" }}>
            <Header />
            <Box p={4} pt={8}>
                <Paper>
                    <Box
                        justifyContent="center"
                        sx={{
                            height: 245,
                            borderRadius: 4,
                            backgroundColor: "#21BA72",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }}
                    >
                        <Avatar sx={{ width: 120, height: 120 }} src={user?.image} />
                        <Typography variant="h4" mt={2}>
                            {user?.name}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Grid>
    );    
}