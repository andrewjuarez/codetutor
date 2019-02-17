import React from 'react';

//Dialog stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';
import { withRouter } from 'react-router-dom';

class FormDialog extends React.Component {
  state = {
    open: false,
    ClassCode: '',
    Name: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  handleSubmit = () =>{
    //SEND STUFF TO BACKEND
    console.log(this.state.ClassCode )
    console.log(this.state.Name )

    var data = {
      sessionID: this.state.ClassCode,
      name: this.state.Name
    }
    console.log(data)
    axios.post("/api/join-session", data)
        .then((result) => {
            console.log("API return data!");
            console.log(result.data);

            if(result.data['status'] == "success"){
              console.log("Re-directing to IDE")
              this.routeChange('/ide/' + data.sessionID);
            } else {
              console.log("Permission denied.");
              // Add a component to display an error message
            }
        })

    this.setState({ open: false });
  };

  routeChange = (sessionID) => {
    this.props.history.push(sessionID);
  }

  handleTextFieldChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Button fullWidth variant="contained" color="primary" size = 'large' style={{ fontSize: 30 }} onClick={this.handleClickOpen}>
          Join Session
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter Session Info</DialogTitle>
          <DialogContent>
           
            <TextField
              autoFocus
              margin="dense"
              id="ClassCode"
              label="Class Code"
              multiline="true"
              value={this.state.ClassCode}
              onChange={this.handleTextFieldChange('ClassCode')}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="Name"
              label="Student Name"
              multiline="true"
              value={this.state.Name}
              onChange={this.handleTextFieldChange('Name')}
              fullWidth
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withRouter(FormDialog)