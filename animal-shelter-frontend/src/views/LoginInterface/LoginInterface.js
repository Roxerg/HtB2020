import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DogPawIcon from './images/dog-paw-icon.png';
import CatPawIcon from './images/cat-paw-icon.png'
import Collapse from '@material-ui/core/Collapse';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Switch from '@material-ui/core/Switch';
import {register} from '../../utils.js'
import citiesInUK from './cities.json'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Animal Shelter Social Media '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random/?corgi,samoyed)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  dogpaw: {
    width: '100%',
    marginLeft: '-1px',
    userSelect: 'none'
  },
  registerLink: {
    cursor: 'pointer'
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

export default function LoginInterface(props) {


  const classes = useStyles();
  const [loginView, setLoginView] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ email: '', password: '', name: '', description: '', location: '', is_organisation: false })
  const [errorRequest, setErrorRequest] = useState(false)
  const [successRequest, setSuccessRequest] = useState(false)

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div>
          <Collapse in={loginView}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <img className={classes.dogpaw} src={DogPawIcon} />
              </Avatar>
              <Typography component="h1" variant="h5">Sign In</Typography>
              <form className={classes.form} onSubmit={e => {
                e.preventDefault();
                props.login(loginData.email, loginData.password)
              }}
              noValidate
              >
                <TextField
                  variant="outlined"
                  margin="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={loginData.email}
                  onChange={obj => setLoginData({ ...loginData, email: obj.target.value })}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={obj => setLoginData({ ...loginData, password: obj.target.value })}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
            </Button>
                <Grid container>
                  <Grid item>
                    <Link className={classes.registerLink} onClick={() => setLoginView(false)} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Collapse>
          <Collapse in={!loginView}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <img className={classes.dogpaw} src={CatPawIcon} />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e) => {
            e.preventDefault();
            register(registerData)
            .then(response => {
              if (response.error) {
                setErrorRequest(true)
              }
              else {
                setSuccessRequest(true)
                setLoginView(true)
              }
            })

          }}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  value={registerData.email}
                  onChange={obj => setRegisterData({ ...registerData, email: obj.target.value })}
                  id="email-signup"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  value={registerData.password}
                  onChange={obj => setRegisterData({ ...registerData, password: obj.target.value })}
                  name="password"
                  label="Password"
                  type="password"
                  id="password-signup"
                  autoComplete="current-password"
                />
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  value={registerData.name}
                  onChange={obj => setRegisterData({ ...registerData, name: obj.target.value })}
                  id="name-signup"
                  label={registerData.is_organisation ? "Organisation Name" : "Full Name"}
                  name="name"
                  autoFocus
                />
                <TextField
                  id="description-signup"
                  label={registerData.is_organisation ? "Organisation Description" : "Bio"}
                  multiline
                  fullWidth
                  value={registerData.description}
                  onChange={obj => setRegisterData({ ...registerData, description: obj.target.value })}

                  margin="dense"
                  rows="4"
                  variant="outlined"
                />
                <Autocomplete
                  id="location-signup"
                  options={citiesInUK}
                  classes={{
                    option: classes.option,
                  }}
                  autoHighlight
                  value={registerData.location}
                  onChange={(obj, newval) => setRegisterData({ ...registerData, location: newval })}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Location"
                      margin="dense"
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={registerData.is_organisation}
                      onChange={() => setRegisterData({...registerData, is_organisation: !registerData.is_organisation})}
                      value={registerData.is_organisation}
                      color="primary"
                    />
                  }
                  label={registerData.is_organisation ? "Animal Shelter 🏤" : "Animal Lover ❤️"}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Register
            </Button>
                <Grid container>
                  <Grid item>
                    <Link className={classes.registerLink} onClick={() => setLoginView(true)} variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Collapse>
          <Box>
            <Copyright />
          </Box>
          <Snackbar open={errorRequest} autoHideDuration={5000} onClose={() => setErrorRequest(false)}>
            <Alert onClose={() => setErrorRequest(false)} severity="error">
              Form not completed correctly!
            </Alert>
          </Snackbar>
          <Snackbar open={successRequest} autoHideDuration={5000} onClose={() => setSuccessRequest(false)}>
            <Alert onClose={() => setSuccessRequest(false)} severity="success">
              Account successfully created!
            </Alert>
          </Snackbar>

        </div>
      </Grid>
    </Grid>
  );
}