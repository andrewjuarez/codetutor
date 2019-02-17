import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AboutDialog extends React.Component {
 state = {
  open: false,
 }

 handleClickOpen = () => {
  this.setState({ open: true });
 }

 handleClose = () => {
  this.setState({ open: false });
 }

 render() {
  return (
   <div>
    <Button style={{color:'white'}} onClick={this.handleClickOpen}>
     About Us
    </Button>
    <Dialog
     open={this.state.open}
     onClose={this.handleClose}
     aria-labelledby="alert-dialog-title"
     aria-describedby="alert-dialog-description"
    >
     <DialogTitle id="alert-dialog-title">{"Hackers:"}</DialogTitle>
     <DialogContent>
      <DialogContentText id="alert-dialog-description">
      <ul>
        <li>Andrew Juarez - 4th Year</li>  
        <li>Kevin Nguyen - 2nd Year</li>
        <li>Ryan Miranda - 1st Year</li>
        <li>Sahil Railkar - 1st Year</li>  
      </ul>
        <p>Built for HackUCI 2019.</p>

      </DialogContentText>
     </DialogContent>
     <DialogActions>
     </DialogActions>
    </Dialog>
   </div>
  );
 }
}

export default AboutDialog;