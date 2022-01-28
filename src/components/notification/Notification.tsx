import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

interface NotificationProps {
    image?: string,
    header: string,
    description: string
}

const Notification = ({
    image,
    header,
    description
}: NotificationProps) => {
    return(
        <ListItem sx={{
            minWidth: 300
        }}>
            <ListItemAvatar>
                <Avatar src={image} />
            </ListItemAvatar>
            <ListItemText primary={header} secondary={description} />
        </ListItem>
    );
}

export default Notification;
