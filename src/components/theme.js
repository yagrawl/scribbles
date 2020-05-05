import React, { Component } from 'react';
import Toggle from 'react-toggle';

import '../styles/base.scss';
import '../styles/_toggle.scss';

class Theme extends Component {
  constructor(props) {
    super(props);

    if(JSON.parse(localStorage.getItem('LIGHT_MODE')) === true) {
      document.body.classList.remove('dark-mode');
    }

    this.state = {
      lightMode: JSON.parse(localStorage.getItem('LIGHT_MODE'))
    }

    this.handleModeChange = this.handleModeChange.bind(this);
  }

  componentDidMount() {
    document.body.classList.add('dark-mode');
  }

  handleModeChange() {
    if(!this.state.lightMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }

    this.setState({
      lightMode: (!this.state.lightMode)
    });
    localStorage.setItem('LIGHT_MODE', !this.state.lightMode);
  }

  render() {
    return (
      <Toggle
        defaultChecked={this.state.lightMode}
        icons={false}
        onChange={this.handleModeChange} />
    );
  }
}

export default Theme;
