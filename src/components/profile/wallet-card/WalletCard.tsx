import { Box, Button, Link, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { AccountContext } from "../../../context/Account";

export const WalletCard = () => {
    const { wallet } = useContext(AccountContext);
    
    useEffect(()=>{
        console.log(wallet);
    },[])
    
    return (
        <Paper>
            <Box
                p={2}
                sx={{
                    borderRadius: 4,
                    background: "linear-gradient(to bottom right, #21BA72, #A0E720)",
                    height: 170,
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
                }}>
                    <Typography p={1} sx={{ color: "white" }} variant="h4">Текущий баланс</Typography>
                </Box>

                <Box sx={{
                    position: "absolute",
                    bottom: 8,
                    left: 16
                }}>
                    <Button variant="text" onClick={() => {}} sx={{ textTransform: "none", color: "white" }}>Подробнее</Button>
                </Box>

                <Typography color="white" variant="subtitle1">1000.02 РУБ</Typography>
                <Box sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 16
                }}>
                    <Typography p={1} color="white">*****fdshewhr</Typography>
                </Box>
            </Box>

            <Stack direction="row" justifyContent="center" p={1}>
                <Button>Пополнить</Button>
                <Button>Вывести</Button>
            </Stack>
        </Paper>
    );
}
