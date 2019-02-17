import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import { createMuiTheme } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#ff0000',
        main: '#ff0000',
        dark: '#ff0000',
        contrastText: '#ff0000',
      },
      secondary: {
        light: '#00ff00',
        main: '#00ff00',
        dark: '#00ff00',
        contrastText: '#00ff00',
      },
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
            return <MuiThemeProvider theme={theme}><Chip clickable={true} color="primary" label={this.state.name} style={{color:"primary"}}></Chip></MuiThemeProvider>
        }
        else {
            return <MuiThemeProvider theme={theme}><Chip clickable={true} color="secondary" label={this.state.name} style={{color:"secondary"}}></Chip></MuiThemeProvider>
        }
        
    }
}