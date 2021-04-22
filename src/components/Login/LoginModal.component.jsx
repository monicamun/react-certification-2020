import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { useGlobal } from '../../providers/GlobalContext/GlobalContext';
import loginApi from '../../services/login.api';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    width: 400,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const globalContext = useGlobal();
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let loginErrorMessage;
  if (loginError) {
    loginErrorMessage = <Alert severity="error">Username or password invalid</Alert>;
  }

  const closeModal = () => {
    globalContext.setOpenLogin(false);
  };

  const loginUser = async () => {
    try {
      const user = await loginApi(username, password);
      setLoginError();
      globalContext.setUser(user);
      closeModal();
    } catch (err) {
      setLoginError(err);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={globalContext.openLogin}
        onClose={() => globalContext.setOpenLogin(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={globalContext.openLogin}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Login</h2>
            {loginErrorMessage}
            <div>
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                fullWidth
              />
            </div>
            <div>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="Password"
                fullWidth
              />
            </div>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Button onClick={closeModal}>Cancel</Button>
              <Button onClick={loginUser}>Login</Button>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
