import React, {Component} from 'react';

import axios from 'axios'

import AceEditor from 'react-ace';
import 'brace/mode/jsx';
import Button from '@material-ui/core/Button';

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

languages.forEach(lang => {
  require(`brace/mode/${lang}`);
  require(`brace/snippets/${lang}`);
});

themes.forEach(theme => {
  require(`brace/theme/${theme}`);
});
// /*eslint-disable no-alert, no-console */
// import 'brace/ext/language_tools';
// import 'brace/ext/searchbox';

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
          name: this.state.value,
        }
    
        //replace dummy URL w/ Node
        axios.post(`https://jsonplaceholder.typicode.com/users`, { data })
          .then(res => {
            console.log(res);
            console.log(res.data);
        })

        //JDoodle Online Compiler
        
         // var _dataMode = ''
        // if (this.state.value == 'python'){
        //     _dataMode = 'python3'
        // }
        // else {
        //     _dataMode = this.state.mode
        // }

        // const _data = {
        //     script : this.state.value,
        //     language: this._dataMode,
        //     versionIndex: "0",
        //     clientId: "42fd11063c07e603680bb4d882f956d4",
        //     clientSecret:"f5239a46c7ddd66d3fa0cb0dbc06ed671ae42a46954f70bac1ef97b078182c07"
        // }
        
        // axios.post(`https://api.jdoodle.com/execute`,  {_data} )
        //   .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        // })

      }
    
      constructor(props) {
        super(props);
        this.state = {
          value: defaultValue,
          theme: 'monokai',
          mode: 'python',
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          fontSize: 14,
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
        <div className="columns">
        <div className="column">
            <div className="field">
            <label>Mode:</label>
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
            <label>Theme:</label>
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
            <label>Font Size:</label>
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
                <label className="checkbox">
                <input
                    type="checkbox"
                    checked={this.state.enableBasicAutocompletion}
                    onChange={e => this.setBoolean('enableBasicAutocompletion', e.target.checked)}
                />
                Enable Basic Autocomplete
                </label>
            </p>
            </div>
            <div className="field">
            <p className="control">
                <label className="checkbox">
                <input
                    type="checkbox"
                    checked={this.state.enableLiveAutocompletion}
                    onChange={e => this.setBoolean('enableLiveAutocompletion', e.target.checked)}
                />
                Enable Live Autocomplete
                </label>
            </p>
            </div>
            <div className="field">
            <p className="control">
                <label className="checkbox">
                <input
                    type="checkbox"
                    checked={this.state.showGutter}
                    onChange={e => this.setBoolean('showGutter', e.target.checked)}
                />
                Show Gutter
                </label>
            </p>
            </div>
            <div className="field">
            <p className="control">
                <label className="checkbox">
                <input
                    type="checkbox"
                    checked={this.state.showPrintMargin}
                    onChange={e => this.setBoolean('showPrintMargin', e.target.checked)}
                />
                Show Print Margin
                </label>
            </p>
            </div>
            <div className="field">
            <p className="control">
                <label className="checkbox">
                <input
                    type="checkbox"
                    checked={this.state.highlightActiveLine}
                    onChange={e => this.setBoolean('highlightActiveLine', e.target.checked)}
                />
                Highlight Active Line
                </label>
            </p>
            </div>
            <div className="field">
            <p className="control">
                <label className="checkbox">
                <input
                    type="checkbox"
                    checked={this.state.enableSnippets}
                    onChange={e => this.setBoolean('enableSnippets', e.target.checked)}
                />
                Enable Snippets
                </label>
            </p>
            </div>
            <div className="field">
            <p className="control">
                <label className="checkbox">
                <input
                    type="checkbox"
                    checked={this.state.showLineNumbers}
                    onChange={e => this.setBoolean('showLineNumbers', e.target.checked)}
                />
                Show Line Numbers
                </label>
            </p>
            </div>
        </div>
        <div className="examples column">
            <h2>Editor</h2>
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
        
        
        <Button variant = 'contained' onClick = {this.submitCode}>Submit Code!</Button>


        <div className="column">
            <h2>Code</h2>
            <AceEditor
            mode="jsx"
            theme="monokai"
            readOnly={true}
            value={`<AceEditor
    mode="${this.state.mode}"
    theme="${this.state.theme}"
    name="blah2"
    onLoad={this.onLoad}
    onChange={this.onChange}
    fontSize={${this.state.fontSize}}
    showPrintMargin={${this.state.showPrintMargin}}
    showGutter={${this.state.showGutter}}
    highlightActiveLine={${this.state.highlightActiveLine}}
    value={\`${this.state.value}\`}
    setOptions={{
    enableBasicAutocompletion: ${this.state.enableBasicAutocompletion},
    enableLiveAutocompletion: ${this.state.enableLiveAutocompletion},
    enableSnippets: ${this.state.enableSnippets},
    showLineNumbers: ${this.state.showLineNumbers},
    tabSize: 2,
    }}/>
            `}
            />
        </div>
        </div>
        )
    }
}