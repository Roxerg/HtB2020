import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Login from './views/LoginInterface/LoginInterface.js'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {register, login} from './utils'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#18637b',
    },
  },
});


function App() {

  return (
    <ThemeProvider theme={theme}>
      <Login login={login} register={register} />
    </ThemeProvider>
  );
}

export default App;