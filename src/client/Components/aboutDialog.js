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
    <Button variant="outlined" style={{color:'white'}} onClick={this.handleClickOpen}>
     Open alert dialog
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
      <p>Andrew Juarez</p>
      <p>Kevin Nguyen</p>
      <p>Sahil Railkar</p>
      <p>Ryan Miranda</p>
      
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