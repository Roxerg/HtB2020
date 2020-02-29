import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Login from './views/LoginInterface/LoginInterface.js'
import Main from './views/MainInterface/MainInterface.js'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { register, login } from './utils'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#18637b',
    },
  },
});


function App() {

  const [profile, setProfile] = useState(null)
  const [loginError, setLoginError] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const login_handler = (username, password) => {
    login(username, password)
      .then(response => {
        if (response.error == false) {
          setProfile(response.data)
          setLoginSuccess(true)
        }
        else {
          setLoginError(true)
        }
      })
  }


  return (
    <ThemeProvider theme={theme}>
      {
        profile != null ? (
          <Main profile={profile} />
        ) : (
            <Login login={login_handler} register={register} />
          )
      }
      <Snackbar open={loginError} autoHideDuration={3000} onClose={() => setLoginError(false)}>
        <Alert onClose={() => setLoginError(false)} severity="error">
          Login credentials incorrect!
            </Alert>
      </Snackbar>
      <Snackbar open={loginSuccess} autoHideDuration={3000} onClose={() => setLoginSuccess(false)}>
        <Alert onClose={() => setLoginSuccess(false)} severity="success">
          Login successful!
            </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;