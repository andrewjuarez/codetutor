import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Navbar from './Navbar';

import Background from '../bg.png';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import color from '@material-ui/core/colors/blue';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});


class CreateSession extends Component {
  constructor(props) {
      super(props);
      this.state = {
          sessionID: '', 
          sessionName: '',
          mailingList: '',
          problem: '',
        };

      this.handleSessionName = this.handleSessionName.bind(this);
      this.handleMailingList = this.handleMailingList.bind(this);
      this.handleProblem = this.handleProblem.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSessionName(event) {
    this.setState({sessionName: event.target.value});
  } 

  handleMailingList(event) {
    this.setState({mailingList: event.target.value});
} 

handleProblem(event) {
  this.setState({problem: event.target.value});
} 

  handleSubmit = (event) => {
      
      event.preventDefault();

      var data = {
        sessionName: this.state.sessionName,
        mailingList: this.state.mailingList,
        problem: this.state.problem
      }
      axios.post("/api/new-session", data)
        .then((result) => {
            console.log("API return data!");
            console.log(result);
            
            this.setState({sessionID: result.data["sessionID"]})
            this.setState({sessionName: result.data["sessionName"]});
            this.setState({mailingList: result.data["mailingList"]});
            this.setState({problem: result.data["problem"]});
        })
  }


  render() {
    if(this.state.sessionID === "") {
        return (
        <div>
          <h1 style={{textAlign: "center", color: "#3F51B5", fontSize: 60, fontFamily: 'Roboto', marginTop: '7.5%'}}> New Session </h1>
          <div className="container" style={{textAlign: 'center'}}>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextField id="outlined-name" label="Session Name" defaultValue="In-Lab Assignment" value={this.state.sessionName} onChange={this.handleSessionName} margin="normal" style={{width: '45%'}}
                variant="outlined"/>
              </div>
              <div className="form-group">
                <TextField multiline="true" id="outlined-name" label="Mailing List" defaultValue="In-Lab Assignment" value={this.state.mailingList} onChange={this.handleMailingList} margin="normal"
                variant="outlined" style={{width: '45%', height: '25%'}}/>
              </div>
              <div className="form-group">
                <TextField multiline="true" id="outlined-name" label="Problem" defaultValue="In-Lab Assignment" value={this.state.problem} onChange={this.handleProblem} margin="normal"
                variant="outlined" style={{width: '45%', height: '20%'}}/>
              </div>
              <div className="form-group">
                  <Button size="large" color="primary" variant="contained" style={{marginTop: '5%'}}>Create Session</Button>
              </div>
            </form>
          </div>
        </div>)
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
