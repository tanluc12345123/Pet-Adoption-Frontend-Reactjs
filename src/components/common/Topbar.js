import { AppBar, Toolbar, Typography, Avatar, Box, Tooltip, Menu, IconButton, MenuItem } from "@mui/material";
import colorConfigs from '../config/colorsConfig';
import sizeConfigs from '../config/sizeConfig';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Topbar = (props) => {
    const settings = ['Account', 'Logout'];
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.clear()
        navigate('/', { replace: true })
    }

    const handleClick = (value) => {
        if (value === 'Logout') {
            handleLogout()
        } else {
            navigate('/home')
            handleCloseUserMenu()
        }
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${sizeConfigs.sidebar.width})`,
                ml: sizeConfigs.sidebar.width,
                boxShadow: "unset",
                backgroundColor: colorConfigs.topbar.bg,
                color: colorConfigs.topbar.color
            }}
        >
            <Toolbar sx={{
                justifyContent: 'flex-end',
                boxShadow: 1
            }}>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar src='/src/assets/ic_avatar.svg' />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={() => handleClick(setting)}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
