import React, { Component } from 'react';
import Toggle from 'react-toggle';

import '../styles/base.scss';
import '../styles/_toggle.scss';

class Theme extends Component {
  constructor(props) {
    super(props);

    if (typeof window !== 'undefined') {
      if(JSON.parse(localStorage.getItem('DARK_MODE')) === true) {
        document.body.classList.add('dark-mode');

        this.darkMode = true;
      } else {
        this.darkMode = false;
      }
    }


    try {
      this.darkMode = JSON.parse(localStorage.getItem('DARK_MODE'))
    } catch(err) {
      console.log(err);
    }

    this.handleModeChange = this.handleModeChange.bind(this);
  }

  handleModeChange() {
    if(!this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    this.darkMode = !this.darkMode;

    if (typeof window !== 'undefined') {
      localStorage.setItem('DARK_MODE', this.darkMode);
    }
  }

  render() {
    return (
      <Toggle
        defaultChecked={!this.darkMode}
        icons={false}
        onChange={this.handleModeChange} />
    );
  }
}

export default Theme;
