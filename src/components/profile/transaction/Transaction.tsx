import React from "react";
import { ListItem, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, Typography } from "@mui/material";

export const Transaction = () => {
    return (
        <ListItem sx={{ width: 360 }}>
            <ListItemAvatar>
                <Avatar src={"https://cdn-icons-png.flaticon.com/512/158/158776.png"} />
            </ListItemAvatar>
            <ListItemText primary="Вы продали актив" secondary="2 часа назад" />
            <ListItemSecondaryAction>
                <Typography sx={{ color: "#A0E720" }} variant="subtitle2">+50000 руб</Typography>
            </ListItemSecondaryAction>
        </ListItem>
    );
}