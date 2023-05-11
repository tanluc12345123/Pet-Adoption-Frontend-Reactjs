import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
// import assets from "../../assets";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import colorConfigs from '../config/colorsConfig';
import sizeConfigs from '../config/sizeConfig';

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: sizeConfigs.sidebar.width,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: sizeConfigs.sidebar.width,
                    boxSizing: "border-box",
                    borderRight: "0px",
                    backgroundColor: colorConfigs.sidebar.bg,
                    color: colorConfigs.sidebar.color
                }
            }}
        >
            <List disablePadding>
                <Toolbar sx={{ marginBottom: "20px" }}>
                    <Stack
                        sx={{ width: "100%" }}
                        direction="row"
                        justifyContent="center"
                    >
                        <Avatar src='/src/assets/ic_avatar.svg' />
                    </Stack>
                </Toolbar>
                {appRoutes.map((route, index) => (
                    route.sidebarProps ? (
                        route.child ? (
                            <SidebarItemCollapse item={route} key={index} />
                        ) : (
                            <SidebarItem item={route} key={index} />
                        )
                    ) : null
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
