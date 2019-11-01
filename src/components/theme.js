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
      }
    }

    try {
      this.state = {
        darkMode: JSON.parse(localStorage.getItem('DARK_MODE'))
      }
    } catch(err) {
      console.log(err);
    }

    this.handleModeChange = this.handleModeChange.bind(this);
  }

  // componentDidMount() {
  //   let mode = true;
  //   if (typeof window !== 'undefined') {
  //     mode = JSON.parse(localStorage.getItem('DARK_MODE'));
  //
  //     this.setState(
  //       prevState => ({
  //         ...prevState,
  //         darkMode: mode
  //       })
  //     )
  //   }
  // }

  handleModeChange() {
    if(!this.state.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    this.setState({
      darkMode: (!this.state.darkMode)
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('DARK_MODE', !this.state.darkMode);
    }
  }

  render() {
    return (
      <Toggle
        defaultChecked={this.state.darkMode}
        icons={false}
        onChange={this.handleModeChange} />
    );
  }
}

export default Theme;
