import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import { createMuiTheme } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const theme = createMuiTheme({
    palette: {
      primary: red,
      secondary: green,
    },
  });

export default class Student extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            correct: props.correct,
            sourceCode: props.sourceCode
        }
    }

    render() {
        console.log(this.state.name)
        if (this.state.correct === true) {
            return <MuiThemeProvider muiTheme={theme}><Chip clickable={true} color="primary" label={this.state.name}></Chip></MuiThemeProvider>
        }
        else {
            return <MuiThemeProvider muiTheme={theme}><Chip clickable={true} color="secondary" label={this.state.name}></Chip></MuiThemeProvider>
        }
        
    }
}