import React, { useContext, useState } from "react";
import { Autocomplete, Box, Stack, TextField, Typography, Avatar, Divider, backdropClasses, Menu, MenuItem, Popover, Popper, Paper, Button, IconButton } from "@mui/material";
import { AccountContext } from "../../context/Account";
import UserMenuPopup from "../popups/UserMenuPopup";
import UserNotifacations from "../popups/UserNotifacations";
import { Link } from "react-router-dom";


export const Header = () => {
    const { user } = useContext(AccountContext);
    return (
        <Box component="header" sx={{
            width: "100%",
            p: 1,
            position: "fixed",
            backdropFilter: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}>
            <Stack direction="row" justifyContent="space-between">
                <Box
                    component="img"
                    sx={{
                        height: 40
                    }}
                    src="https://www.sberbank.com/common/img/uploaded/_new_site/com/bnr/investor_day.png"
                />
               <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
                    <Typography p={1} variant="h3">СБЕР актив</Typography>
               </Link>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    pr={4}
                >
                    <UserNotifacations user={user} />
                    <UserMenuPopup user={user} />
                </Stack>
            </Stack>
        </Box>
    );
}