import {
  AppBar,
  IconButton,
  fade,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
}));

const Navbar = () => {
  const classes = useStyles();
  const globalContext = useGlobal();
  const [isChecked, setIsChecked] = useState(false);
  const [innerSearchText, setInnerSearchText] = useState('wizeline');
  const history = useHistory();

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
          <IconButton color="inherit" aria-label="menu" className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
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
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
};

export default Navbar;
