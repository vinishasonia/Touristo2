import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CommentIcon from '@mui/icons-material/Comment';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import GroupIcon from '@mui/icons-material/Group';
import { Icon } from '@iconify/react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import the ExitToAppIcon
//import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ListIcon from '@mui/icons-material/List';
import { PhotoAlbum, Update } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#fff',
  color: theme.palette.text.primary,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#fff',
  color: theme.palette.text.primary,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
  backgroundColor: '#ff69b4', // Pink color for AppBar
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

const Navigation = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For menu anchor
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    // Close drawer on initial load to avoid obstructing view unnecessarily
    setOpen(false);
  }, []);

  useEffect(() => {
    const currentRoute = location.pathname;
    if (currentRoute.includes('/admin/manage-packages')) {
      setActiveItem('Manage Packages');
    } else if (currentRoute.includes('/admin/packages-list')) {
      setActiveItem('Package List');
    } else if (currentRoute.includes('/admin/requests')) {
      setActiveItem('Manage Request');
    } else if (currentRoute.includes('/admin/add-gallery')) {
      setActiveItem('Manage Gallery');
    } else if (currentRoute.includes('/admin/gallery-list')) {
      setActiveItem('Gallery List');
    } else if (currentRoute.includes('/admin/payments')) {
      setActiveItem('Payments');
    } else if (currentRoute.includes('/admin/feedback')) {
      setActiveItem('Feedback');
    } else if (currentRoute.includes('/admin/users')) {
      setActiveItem('User');
    } else {
      setActiveItem('Dashboard'); // Default item or leave as empty if none matched
    }
  }, [location.pathname]);


  const sideBarList = [
    { title: 'Dashboard', path: '/admin/', icon: <DashboardIcon sx={{ fontSize: '20px' }} /> },
    { title: 'Manage Packages', path: '/admin/manage-packages', icon: <AssignmentTurnedInIcon sx={{ fontSize: '20px' }} /> },
    { title: 'Package List', path: '/admin/packages-list', icon: <ListIcon sx={{ fontSize: '20px' }} /> },
    { title: 'Manage Gallery', path: '/admin/add-gallery', icon: <PhotoLibraryIcon sx={{ fontSize: '20px' }} /> },
    { title: 'Gallery List', path: '/admin/gallery-list', icon: <PhotoAlbum sx={{ fontSize: '20px' }} /> },
    { title: 'Manage Request', path: '/admin/requests', icon: <AssignmentIcon sx={{ fontSize: '20px' }} /> },
    { title: 'Payments', path: '/admin/payments', icon: <PaymentIcon sx={{ fontSize: '20px' }} /> },
    { title: 'Feedback', path: '/admin/feedback', icon: <CommentIcon sx={{ fontSize: '20px' }} /> },
    { title: 'User', path: '/admin/users', icon: <GroupIcon sx={{ fontSize: '20px' }} /> },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const ListItemStyled = styled(ListItem)(({ theme, hover }) => ({
    '&:hover': {
      boxShadow: hover ? '0 4px 8px rgba(255, 105, 180, 0.65)' : 'none',
      backgroundColor: hover ? 'rgba(255, 182, 193, 0.25)' : 'transparent',
      transform: hover ? 'scale(1.03)' : 'scale(1)',
      transition: 'all 0.3s ease-in-out',
      filter: hover ? 'none' : 'blur(0.5px)',
      zIndex: hover ? 1 : 'auto',
    },
  }));

  const handleLogout = () => {
    // Clear authentication tokens or perform logout operations here
    // Redirect to the login page or another route
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <>
      <CssBaseline />
      <AppBar elevation={0} sx={{
        boxShadow: '0 4px 8px #ff69b165',
      }}
        position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: '#fff',
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: '#fff' }}>
            Admin Dashboard
          </Typography>

          <IconButton
            disableRipple
            edge="end"
          >
            <Icon icon="carbon:flight-international" width="39" height="39" color="white" />
          </IconButton>

        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box className="sidebar-body">
          <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '15px' }}>
              <Icon icon={"carbon:flight-international"} width="30" height="30" color="#ff69b4" />
              {/* add image here instead of icons */}
              <Typography variant="h6" sx={{ ml: 1 }}>Touristo</Typography>
            </Box>
            <IconButton onClick={handleDrawerClose} sx={{ color: '#ff69b4' }}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <List>
            {sideBarList.map((item) => (
              <ListItemStyled key={item.title} disablePadding
                sx={{
                  display: 'block',
                  backgroundColor: activeItem === item.title ? 'rgba(255, 105, 180, 0.15)' : 'transparent',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >

                <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: '#ff69b4',
                        backgroundColor: 'rgba(255, 182, 193, 0.12)', // Light pink background
                        padding: '4px',
                        borderRadius: '3px',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{ opacity: open ? 1 : 0, color: activeItem === item.title ? '#ff69b4' : 'inherit' }}
                    />
                  </ListItemButton>
                </Link>
              </ListItemStyled>
            ))}


                {/* Logout Button */}
                <ListItemStyled disablePadding sx={{ display: 'block', marginTop: 'auto' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: '#ff69b4',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#d32f2f',
                  },
                }}
                onClick={handleLogout}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItemStyled>



          </List>
          
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation;
