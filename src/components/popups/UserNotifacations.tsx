import * as React from 'react';
import {
  usePopupState,
  bindPopover,
  bindTrigger,
} from 'material-ui-popup-state/hooks'
import { IconButton, Avatar, Popover, ListItemText, Box, Typography, List, ListSubheader, ListItemButton } from '@mui/material'
import { Icon28EditOutline, Icon28Notification, Icon28SettingsOutline, Icon28UserOutline } from "@vkontakte/icons"
import Notification from '../notification/Notification';

interface UserMenuPoput {
  user: any
}

const UserNotifacations = ({ user }: UserMenuPoput) => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'user-menu' })


  return (
    <div>
      <IconButton {...bindTrigger(popupState)}>
        <Icon28Notification />
      </IconButton>
      <Popover
        {...bindPopover(popupState)}
        sx={{
          mt: 1
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List
          subheader={
            <ListSubheader>
              Новые
            </ListSubheader>
          }
        >
          <ListItemButton>
            <Notification header={"Test"} description={"test"} />
          </ListItemButton>
        </List>

        <List
          subheader={
            <ListSubheader>
              Старые
            </ListSubheader>
          }
        >

        </List>
      </Popover>
    </div>
  )
}

export default UserNotifacations;