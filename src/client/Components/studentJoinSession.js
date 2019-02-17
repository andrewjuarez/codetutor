import React from 'react';
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
      classCode: this.state.ClassCode,
      studName: this.state.Name
    }

    axios.post("/api/new-session", data)
        .then((result) => {
            console.log("API return data!");
            console.log(result);
        })

    // if result.thing worked{
    //   redirect to text editor page with given session ID
    // }
      if (true) {
        this.routeChange('/1234')
      }

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