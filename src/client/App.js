import React, { Component } from 'react';
import './app.css';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Navbar from './Components/Navbar';

import Background from './bg.png';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

//Components
import StudentJoinSession from './Components/studentJoinSession'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});


class App extends Component {
  state = {};

  submitTest = () => {
    console.log("submitTest called!");
    
    
  }

  render() {
    const { classes } = this.props;

    return (
        <Grid container style={{ height: '100%'}}>
          <Grid item style={{ position: 'absolute', width: '100%'}}>
            <Navbar />
          </Grid>
          <Grid container style={{backgroundImage: `url(${Background})`, backgroundSize: 'cover' }} justify="center" alignItems="center">
            <Grid container justify="center" style={{ height: '10%' }}>
              <Grid item xs={4}>
                <Link to="/create-session" style={{textDecoration: 'none'}}><Button fullWidth variant="contained" color="primary" size="large" style={{ fontSize: 30 }} onClick={this.submitTest}>
                  New Session
                </Button></Link>
                <Grid style={{ display: 'flex', flexDirection: 'row', color: 'white' }}>
                  <hr style={{ width: 150, weight: 10 }} />
                  <hr style={{ width: 150, weight: 10 }} />
                </Grid>
                  <StudentJoinSession/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    );
  }
}

export default withStyles(styles)(App);