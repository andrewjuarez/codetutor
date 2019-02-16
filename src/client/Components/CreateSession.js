import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Navbar from './Navbar';

import Background from '../bg.png';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});


class CreateSession extends Component {
  constructor(props) {
      super(props);
      this.state = { 
          description: '',
          sessionID: ''
        };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
        this.setState({description: event.target.value});
  } 



  handleSubmit = (event) => {
      
      event.preventDefault();

      var data = {
        description: this.state.description
      }
      axios.post("/api/new-session", data)
        .then((result) => {
            console.log("API return data!");
            console.log(result);


            this.setState({sessionID: result.data["sessionID"]});
        })
  }


  render() {
    if(this.state.sessionID == "") {
        return (
        <Grid container style={{ height: '100%', border: 'blue solid 4px' }}>
          <Grid item style={{ position: 'absolute', width: '100%', border: 'yellow solid 4px' }}>
            <Navbar />
          </Grid>
          <Grid container style={{ border: 'red solid 4px', backgroundImage: `url(${Background})`, backgroundSize: 'cover' }} justify="center" alignItems="center">
            <Grid container justify="center" style={{ height: '10%' }}>
              <Grid item xs={4}>
                <div style={{backgroundColor: "white"}}>
                    <h4>Description</h4>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.description} onChange={this.handleChange} placeholder="In lab assignment."/>
                        
                        <input type="submit" value="Create Session" />
                    </form>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        );
    } else {
        return (
            <Grid container style={{ height: '100%', border: 'blue solid 4px' }}>
              <Grid item style={{ position: 'absolute', width: '100%', border: 'yellow solid 4px' }}>
                <Navbar />
              </Grid>
              <Grid container style={{ border: 'red solid 4px', backgroundImage: `url(${Background})`, backgroundSize: 'cover' }} justify="center" alignItems="center">
                <Grid container justify="center" style={{ height: '10%' }}>
                  <Grid item xs={4}>
                    <div style={{backgroundColor: "white"}}>
                        <h2>Session Generated!</h2>
                        <h4>{this.state.sessionID}</h4>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            );
    }

  }
}

export default withStyles(styles)(CreateSession);
