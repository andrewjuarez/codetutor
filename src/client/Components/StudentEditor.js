import React, {Component} from 'react';

import axios from 'axios'

import AceEditor from 'react-ace';
import 'brace/mode/jsx';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';

import Grid from '@material-ui/core/Grid';
import Navbar from './Navbar';

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import { TableRowColumn } from 'material-ui';
import { TableRow, TableBody } from '@material-ui/core';
import { MuiThemeProvider } from 'material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';


const languages = [
  'python',
  'java',
  'javascript',
  'html',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css',
];

const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal',
];

const divStyle = {
  width: '50%',
};

languages.forEach(lang => {
  require(`brace/mode/${lang}`);
  require(`brace/snippets/${lang}`);
});

themes.forEach(theme => {
  require(`brace/theme/${theme}`);
});

const defaultValue = 'Enter Code Here';

export default class StudentEditor extends Component{
    onLoad() {
        console.log("i've loaded");
      }
      
      onChange(newValue) {
        console.log('change', newValue);
        this.setState({
          value: newValue,
        });
      }
    
      onSelectionChange(newValue, event) {
        console.log('select-change', newValue);
        console.log('select-change-event', event);
      }
    
      onCursorChange(newValue, event) {
        console.log('cursor-change', newValue);
        console.log('cursor-change-event', event);
      }
    
      onValidate(annotations) {
        console.log('onValidate', annotations);
      }
    
      setTheme(e) {
        this.setState({
          theme: e.target.value,
        });
      }
     
      setMode = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.value)
      };
     
      setBoolean(name, value) {
        this.setState({
          [name]: value,
        });
      }
      setFontSize(e) {
        this.setState({
          fontSize: parseInt(e.target.value, 10),
        });
      }
    
      submitCode = () => {
    
        const data = {
          code: this.state.value,
        }
        console.log(data);
    
        //replace dummy URL w/ Node
        axios.post(`/api/submit-code`, { data })
          .then(res => {
            console.log(res);
            console.log(res.data);
        })

      }
    
      constructor(props) {
        super(props);
        this.state = {
          value: defaultValue,
          theme: 'monokai',
          mode: 'python',
          enableLiveAutocompletion: true,
          fontSize: 16,
          showGutter: true,
          highlightActiveLine: true,
        };
        this.setTheme = this.setTheme.bind(this);
        this.setMode = this.setMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.setBoolean = this.setBoolean.bind(this);
      }

    render() {
    return (
      <div className="container">
        <Grid container style={{ height: '100%'}}>
          <Grid item style={{ position: 'absolute', width: '100%'}}>
            <Navbar />
          </Grid>
        </Grid>
      <MuiThemeProvider>
        <Table style={{marginTop: '12%'}}>
          <TableBody>
            <TableRow>
              <TableRowColumn style={{textAlign: 'center'}}>
                <div className="field">
                    <Typography variant="h5" gutterBottom>
                      Language
                    </Typography>
                    <p className="control">
                      
                    <form autoComplete="off">
                <FormControl variant="outlined">
                  <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-age-simple"
                  >
                    Language
                  </InputLabel>
                  <Select
                    value={this.state.mode}
                    onChange={this.setMode}
                    input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name="mode"
                      />
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'python'}>Python3</MenuItem>
                    <MenuItem value={'java'}>Java</MenuItem>
                    <MenuItem value={'javascript'}>JavaScript</MenuItem>
                  </Select>
                </FormControl>
              </form>

                    </p>
                </div>
                <div className="field">
                  <Typography variant="h5" gutterBottom>
                    Font
                  </Typography>
                  <p className="control">
                    <span className="select">
                      <select name="Theme" onChange={this.setTheme} value={this.state.theme}>
                          {themes.map(lang => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                          ))}
                      </select>
                    </span>
                  </p>
              </div>
              <div className="field">
                <Typography variant="h5" gutterBottom>
                  Font Size
                </Typography>
                <p className="control">
                  <span className="select">
                    <select name="Font Size" onChange={this.setFontSize} value={this.state.fontSize}>
                      {[14, 16, 18, 20, 24, 28, 32, 40].map(lang => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                      ))}
                    </select>
                  </span>
                </p>
              </div>
              </TableRowColumn>
              <TableRowColumn style={{textAlign: 'center', paddingLeft: '17%'}}>
                <AceEditor
                  mode={this.state.mode}
                  theme={this.state.theme}
                  name="blah2"
                  onLoad={this.onLoad}
                  onChange={this.onChange}
                  onSelectionChange={this.onSelectionChange}
                  onCursorChange={this.onCursorChange}
                  onValidate={this.onValidate}
                  value={this.state.value}
                  fontSize={this.state.fontSize}
                  showPrintMargin={this.state.showPrintMargin}
                  showGutter={this.state.showGutter}
                  highlightActiveLine={this.state.highlightActiveLine}
                  setOptions={{
                      enableBasicAutocompletion: this.state.enableBasicAutocompletion,
                      enableLiveAutocompletion: this.state.enableLiveAutocompletion,
                      enableSnippets: this.state.enableSnippets,
                      showLineNumbers: this.state.showLineNumbers,
                      tabSize: 2,
                  }}
                />
              </TableRowColumn>
              <TableRowColumn style={{textAlign: 'left'}}>
                  <div className="field">
                  <p className="control">
                    <Typography className="checkbox">
                      <Checkbox checked={this.state.enableLiveAutocompletion} onChange={e => this.setBoolean('enableLiveAutocompletion', e.target.checked)}>
                      </Checkbox>
                      Enable Live Autocomplete
                    </Typography>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <Typography className ="checkbox">
                      <Checkbox checked={this.state.showGutter} onChange={e => this.setBoolean('showGutter', e.target.checked)}></Checkbox>
                      Show Line Numbers
                    </Typography>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <Typography className="checkbox">
                      <Checkbox checked={this.state.highlightActiveLine} onChange={e => this.setBoolean('highlightActiveLine', e.target.checked)}></Checkbox>
                      Highlight Active Line
                    </Typography>
                  </p>
                </div>
                <div className="field" textAlign="center" marginTop='15%'>
                  <p className="control">
                    <Button variant = 'contained' color = 'primary' onClick = {this.submitCode}>Submit Code</Button>
                  </p>
                </div>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
        </MuiThemeProvider>
      </div>
      )
    }
}
