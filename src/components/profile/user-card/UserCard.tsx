import { Stack, Box, Avatar, Typography, Card, Paper, Button } from "@mui/material";
import { Icon28EditOutline } from "@vkontakte/icons";
import React, { useContext, useEffect, useState } from "react"
import { AccountContext } from "../../../context/Account"

export const UserCard = () => {
    const { user } = useContext(AccountContext);
    const [walletId, setWalletId] = useState("")

    useEffect(()=>{
        const getWallet = async () => {
            const wId = await user?.cls.wallet._get_wallet_id();
            setWalletId(wId);
            console.log(walletId);
            console.log(user);
        }
        getWallet()
    },[])

    return (
        <Box sx={{ display: "flex" }}>
            <Paper>
                <Box sx={{
                    height: 254,
                    width: 392,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <Avatar sx={{ width: 100, height: 100 }} src={user?.image} />
                    <Typography p={1}>{user?.name}</Typography>
                    <Typography >WalletID: ****{walletId.slice(-10)}</Typography>
                    <Button startIcon={<Icon28EditOutline />}>Редактировать</Button>
                </Box>
            </Paper>    
        </Box>
    );
}