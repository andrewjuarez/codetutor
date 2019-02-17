// import React from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FilledInput from '@material-ui/core/FilledInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   formControl: {
//     margin: theme.spacing.unit,
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing.unit * 2,
//   },
// });

// class SimpleSelect extends React.Component {
//   state = {
//     age: '',
//     name: 'hai',
//     labelWidth: 0,
//   };

//   componentDidMount() {
//     this.setState({
//       labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
//     });
//   }

//   handleChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//     console.log(event.target.value)
//   };

//   render() {
//     const { classes } = this.props;

//     return (
//       <form className={classes.root} autoComplete="off">
        
//         <FormControl variant="outlined" className={classes.formControl}>
//           <InputLabel
//             ref={ref => {
//               this.InputLabelRef = ref;
//             }}
//             htmlFor="outlined-age-simple"
//           >
//             Age
//           </InputLabel>
//           <Select
//             value={this.state.age}
//             onChange={this.handleChange}
//             input={
//               <OutlinedInput
//                 labelWidth={this.state.labelWidth}
//                 name="age"
//                 id="outlined-age-simple"
//               />
//             }
//           >
//             <MenuItem value="">
//               <em>None</em>
//             </MenuItem>
//             <MenuItem value={10}>Ten</MenuItem>
//             <MenuItem value={20}>Twenty</MenuItem>
//             <MenuItem value={30}>Thirty</MenuItem>
//           </Select>
//         </FormControl>
       
//       </form>
//     );
//   }
// }

// SimpleSelect.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleSelect);




// <div>
//         <div className="row" style={{display: 'flex',  justifyContent:'left', alignItems:'left', height: '100%'}}>
//           <div className="column">
//               <div className="field">
//                 <Typography variant="h5" gutterBottom>
//                   Language
//                 </Typography>
                
//                 <form autoComplete="off">
//                 <FormControl variant="outlined">
//                   <InputLabel
//                     ref={ref => {
//                       this.InputLabelRef = ref;
//                     }}
//                     htmlFor="outlined-age-simple"
//                   >
//                     Language
//                   </InputLabel>
//                   <Select
//                     value={this.state.mode}
//                     onChange={this.setMode}
//                     input={
//                       <OutlinedInput
//                         labelWidth={this.state.labelWidth}
//                         name="mode"
//                       />
//                     }
//                   >
//                     <MenuItem value="">
//                       <em>None</em>
//                     </MenuItem>
//                     <MenuItem value={'python'}>Python3</MenuItem>
//                     <MenuItem value={'java'}>Java</MenuItem>
//                     <MenuItem value={'javascript'}>JavaScript</MenuItem>
//                   </Select>
//                 </FormControl>
//               </form>
              
//               </div>

//               <div className="field">
//                 <Typography variant="h5" gutterBottom>
//                   Font
//                 </Typography>
//               <p className="control">
//                   <span className="select">
//                   <select name="Theme" onChange={this.setTheme} value={this.state.theme}>
//                       {themes.map(lang => (
//                       <option key={lang} value={lang}>
//                           {lang}
//                       </option>
//                       ))}
//                   </select>
//                   </span>
//               </p>