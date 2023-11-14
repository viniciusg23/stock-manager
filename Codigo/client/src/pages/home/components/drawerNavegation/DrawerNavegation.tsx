import { useContext, useEffect, useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { drawerItens } from "./drawerItens";
import { Divider, ListItem, Stack, Switch } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

import FunctionalityRender from '../functionalityRender/FunctionalityRender';
import { ColorModeContext } from '../../../../context/ColorModeContext';

import { getFunctionality } from '../../utils/getFunctionality';
import Profile from '../../../components/Profile';
import DrawerItemButton from './DrawerItemButton';

const drawerMaxWidth: number = 300
export let drawerWidth: number = drawerMaxWidth;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function DrawerNavegation() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [functionality, setFunctionality] = useState<{ path: string, name: string }>({ path: "", name: "" });

  useEffect(() => {
    const lastFunctionality = getFunctionality();
    if(lastFunctionality){
      setFunctionality(JSON.parse(lastFunctionality))
    }
  }, []);

  const handleDrawerOpen = () => {
    drawerWidth = 300;
    setOpen(true);
  };

  const handleDrawerClose = () => {
    drawerWidth = 64;
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "primary.main" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{
            ...(!open && { display: "none" })
          }} />

          <Typography variant="h6" noWrap component="div">
            Nome do Sistema
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <Stack direction="row" spacing={0} alignItems="center">
              <LightMode />
              <Switch color="default" checked={mode === "light" ? false : true} onChange={toggleColorMode} />
              <DarkMode />
            </Stack>

            <Profile />
          </Box>


        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>

        <DrawerHeader sx={{
          // backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "space-between"
        }}>

          <Typography ml={"1em"} color={theme.palette.primary.contrastText}>Funcionalidades</Typography>

          <IconButton onClick={handleDrawerClose} >
            <ChevronLeftIcon />
          </IconButton>

        </DrawerHeader>

        <Divider />

        <List>
          {drawerItens.map((item, index) => (
            <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
              <DrawerItemButton open={open} item={item} handleFunctionality={setFunctionality} />
            </ListItem>
          ))}
        </List>

      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />

        <FunctionalityRender functionality={functionality.path} functionalityName={functionality.name} />

      </Box>

    </Box>
  );
}
