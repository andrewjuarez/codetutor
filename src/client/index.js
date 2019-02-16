// Material UI Theme
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

//Components
import StudentEditor from './Components/StudentEditor'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33a095',
      main: '#00897b',
      dark: '#005f56',
      contrastText: '#fff',
    },
    secondary: {
      light: '#51b7ae',
      main: '#26a69a',
      dark: '#1a746b',
      contrastText: '#fff',
    },
  },
});

function AppWithTheme() {
  return (
      <Router>
        <div>
            <Route exact path = '/' component = {App} />
            <Route path = '/student2' component = {StudentEditor} />
        </div>        
      </Router>
    
  );
}

ReactDOM.render(<AppWithTheme />, document.getElementById('root'));
