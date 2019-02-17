import React, {Component} from 'react';

import axios from 'axios'

import AceEditor from 'react-ace';
import 'brace/mode/jsx';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';

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
      setMode(e) {
        this.setState({
          mode: e.target.value,
        });
      }
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
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: true,
          fontSize: 20,
          showGutter: true,
          showPrintMargin: true,
          highlightActiveLine: true,
          enableSnippets: false,
          showLineNumbers: true,
        };
        this.setTheme = this.setTheme.bind(this);
        this.setMode = this.setMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.setBoolean = this.setBoolean.bind(this);
      }

    render() {
    return (
        <div className="row" style={{display: 'flex',  justifyContent:'left', alignItems:'left', height: '100%'}}>
          <div className="column">
              <div className="field">
                <Typography variant="h5" gutterBottom>
                  Language
                </Typography>
                <Select children={languages} onChange={this.setMode} value={this.state.mode}></Select>
                <p className="control">
                  <span className="select">
                    <select name="mode" onChange={this.setMode} value={this.state.mode}>
                      {languages.map(lang => (
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
              <div className="field">
              <p className="control">
                  <Typography className="checkbox">
                  <input
                      type="checkbox"
                      checked={this.state.enableBasicAutocompletion}
                      onChange={e => this.setBoolean('enableBasicAutocompletion', e.target.checked)}
                  />
                  Enable Basic Autocomplete
                  </Typography>
              </p>
              </div>
              <div className="field">
              <p className="control">
                  <Typography className="checkbox">
                  <input
                      type="checkbox"
                      checked={this.state.enableLiveAutocompletion}
                      onChange={e => this.setBoolean('enableLiveAutocompletion', e.target.checked)}
                  />
                  Enable Live Autocomplete
                  </Typography>
              </p>
              </div>
              <div className="field">
              <p className="control">
                  <Typography className ="checkbox">
                  <input
                      type="checkbox"
                      checked={this.state.showGutter}
                      onChange={e => this.setBoolean('showGutter', e.target.checked)}
                  />
                  Show Gutter
                  </Typography>
              </p>
              </div>
              <div className="field">
              <p className="control">
                  <Typography className="checkbox">
                  <input
                      type="checkbox"
                      checked={this.state.showPrintMargin}
                      onChange={e => this.setBoolean('showPrintMargin', e.target.checked)}
                  />
                  Show Print Margin
                  </Typography>
              </p>
              </div>
              <div className="field">
              <p className="control">
                  <Typography className="checkbox">
                  <input
                      type="checkbox"
                      checked={this.state.highlightActiveLine}
                      onChange={e => this.setBoolean('highlightActiveLine', e.target.checked)}
                  />
                  Highlight Active Line
                  </Typography>
              </p>
              </div>
              <div className="field">
              <p className="control">
                  <Typography className="checkbox">
                  <input
                      type="checkbox"
                      checked={this.state.enableSnippets}
                      onChange={e => this.setBoolean('enableSnippets', e.target.checked)}
                  />
                  Enable Snippets
                  </Typography>
              </p>
              </div>
              <div className="field">
              <p className="control">
                  <Typography className="checkbox">
                  <input
                      type="checkbox"
                      checked={this.state.showLineNumbers}
                      onChange={e => this.setBoolean('showLineNumbers', e.target.checked)}
                  />
                  Show Line Numbers
                  </Typography>
              </p>
              </div>
              <Button variant = 'contained' color = 'primary' onClick = {this.submitCode}>Submit Code</Button>
          </div>
          <div className="column" style={{justifyContent:'right', alignItems:'right', marginLeft:'51.75%'}}>
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
          </div>
          
        </div>
        
        )
    }
}