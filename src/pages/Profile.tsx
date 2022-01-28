import React, { useContext } from "react";
import { Grid, Box, Paper, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText, Button } from "@mui/material";
import { Header } from "../components/header";
import { AccountContext } from "../context/Account";


export const Profile = () => {

    const { user } = useContext(AccountContext);

    return (
        <Grid component="main" sx={{ height: "100vh" }}>
            <Header />
            <Box p={4} pt={8}>
                <Grid
                    container
                    spacing={4}
                >

                    <Grid item>
                        <Paper
                        >
                            <Box
                                p={2}
                                sx={{
                                    borderRadius: 4,
                                    backgroundImage: "url(https://assets.unenvironment.org/decadeonrestoration/2020-03/nature-3294681_1280%20%281%29.jpg)",
                                    backgroundSize: 400,
                                    backgroundRepeat: "no-repeat",
                                    backdropFilter: "20px",
                                    height: 180,
                                    display: "flex",
                                    position: "relative",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: 360,
                                }}
                            >
                                <Box sx={{
                                    position: "absolute",
                                    top: 8,
                                    left: 16
                                }}>                                <Typography variant="h4">Текущий баланс</Typography></Box>

                                <Typography color="white" variant="body1">1000.02 РУБ</Typography>
                                <Box sx={{
                                    position: "absolute",
                                    bottom: 8,
                                    right: 16
                                }}>
                                    <Typography color="white">*****fdshewhr</Typography>
                                </Box>
                            </Box>
                        </Paper>

                        <Box>
                            <Button>Пополнить</Button>
                            <Button>Вывести</Button>
                        </Box>
                    </Grid>


                    <Grid item>
                        <Paper>
                            <Box
                                p={4}
                                justifyContent="center"
                                sx={{
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
                    </Grid>

                    <Grid item>
                        <Paper>
                            <Box
                                p={2}
                            >
                                <Typography color={"black"} variant="h4">История транзакций</Typography>
                                <List>
                                    <ListItem sx={{ width: 340 }}>
                                        <ListItemAvatar>
                                            <Avatar />
                                        </ListItemAvatar>
                                        <ListItemText primary="test" secondary="test" />
                                    </ListItem>
                                </List>
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
        </Grid >
    );
}