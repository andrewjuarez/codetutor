import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        {<h1>Welcome to Code Tutor</h1>}
        <p>Code tutor was built for the programming classes!</p>
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}
