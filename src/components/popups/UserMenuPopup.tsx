import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import {
  usePopupState,
  bindPopover,
  bindTrigger,
} from 'material-ui-popup-state/hooks'
import { IconButton, ListItemIcon, Avatar, Popover, ListItemText, Box, Typography } from '@mui/material'
import { Icon28EditOutline, Icon28SettingsOutline, Icon28UserOutline } from "@vkontakte/icons"
import { useNavigate } from 'react-router-dom'

interface UserMenuPoput {
  user: any
}

const UserMenuPopup = ({ user }: UserMenuPoput) => {
  const nav = useNavigate() ;
  const popupState = usePopupState({ variant: 'popover', popupId: 'user-menu' })

  return (
    <div>
      <IconButton sx={{ p: 0 }} {...bindTrigger(popupState)}>
        <Avatar src={user?.image} />
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
        <Box sx={{
          padding: "0 20px",
          margin: "12px 0"
        }}>
          <Typography variant='subtitle2'>{user.name}</Typography>
          <Typography variant='body2'>{user.email}</Typography>
        </Box>
        <Box sx={{
          padding: 0.5
        }}>
          <MenuItem onClick={() => {
            nav("/myprofile");
            popupState.close();
          }}>
            <ListItemIcon>
              <Icon28UserOutline />
            </ListItemIcon>
            <ListItemText>
              Профиль
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={popupState.close}>
            <ListItemIcon>
              <Icon28EditOutline />
            </ListItemIcon>
            <ListItemText>
              Редактировать
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={popupState.close}>
            <ListItemIcon>
              <Icon28SettingsOutline />
            </ListItemIcon>
            <ListItemText>
              Настройки
            </ListItemText>
          </MenuItem>
        </Box>
      </Popover>
    </div>
  )
}

export default UserMenuPopup