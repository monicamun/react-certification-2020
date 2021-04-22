import {
  AppBar,
  IconButton,
  fade,
  makeStyles,
  Toolbar,
  Typography,
  Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import LoginModal from '../Login';
import { useGlobal } from '../../providers/GlobalContext/GlobalContext';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Navbar = () => {
  const classes = useStyles();
  const globalContext = useGlobal();
  const [isChecked, setIsChecked] = useState(false);
  const [innerSearchText, setInnerSearchText] = useState('wizeline');
  const history = useHistory();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (event, opnDrawer) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(opnDrawer);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    globalContext.setUser(null);
    handleClose();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = ({ target }) => {
    setIsChecked(target.checked);
    globalContext.themeDispatch({
      type: target.checked ? 'setDarkTheme' : 'setLightTheme',
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      globalContext.searchTextDispatch({ type: 'set', payload: innerSearchText });
      history.push({ pathname: '/' });
    }
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={(e) => toggleDrawer(e, true)}
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={openDrawer} onClose={(e) => toggleDrawer(e, false)}>
            <div
              className={classes.list}
              role="presentation"
              onClick={(e) => toggleDrawer(e, false)}
              onKeyDown={(e) => toggleDrawer(e, false)}
            >
              <List>
                <ListItem
                  button
                  onClick={() => history.push({ pathname: '/' })}
                  key="Home"
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </List>
              <Divider />
              {globalContext.user ? (
                <List>
                  <ListItem
                    button
                    key="Favorites"
                    onClick={() => history.push({ pathname: '/favorites' })}
                  >
                    <ListItemIcon>
                      <FavoriteSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Favorites" />
                  </ListItem>
                </List>
              ) : (
                ''
              )}
            </div>
          </Drawer>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{
                'aria-label': 'search',
                value: innerSearchText,
                onChange: (e) => setInnerSearchText(e.target.value),
                onKeyDown: handleKeyDown,
              }}
            />
          </div>
          <Typography className={classes.title} />
          <Switch
            checked={isChecked}
            onChange={handleChange}
            color="primary"
            name="checked"
            inputProps={{
              'aria-label': 'primary checkbox',
            }}
          />
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {globalContext.user ? (
                  <Avatar src={globalContext.user.avatarUrl} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {globalContext.user ? (
                  <MenuItem onClick={logout}>Cerrar Sesion</MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      globalContext.setOpenLogin(true);
                      handleClose();
                    }}
                  >
                    Iniciar Sesion
                  </MenuItem>
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
      <LoginModal />
    </div>
  );
};

export default Navbar;
