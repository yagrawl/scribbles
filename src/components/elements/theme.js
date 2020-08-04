import React, { Component } from "react"

import Light from "../../assets/images/light.png"
import Dark from "../../assets/images/dark.png"

class Theme extends Component {
  constructor(props) {
    super(props);

    if(JSON.parse(localStorage.getItem('DARK_MODE')) === true) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }

    this.state = {
      dark: JSON.parse(localStorage.getItem('DARK_MODE'))
    }

    this.handleModeChange = this.handleModeChange.bind(this);
  }

  handleModeChange() {
    const icon = document.getElementById("themeIcon")
    icon.classList.add("rotate");
    setTimeout(function() { icon.classList.remove("rotate"); }, 400);

    if(this.state.dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    this.setState({
      dark: (!this.state.dark)
    });
    localStorage.setItem('DARK_MODE', !this.state.dark);
  }

  render() {
    return (
      <div>
        <input type="checkbox" id="themeToggle" onChange={this.handleModeChange}/>
        <label htmlFor="themeToggle" id="themeIcon">
          <img src={(this.state.dark) ? Dark : Light} id="themeIcon" className="theme-image" alt={(this.state.dark) ? "Toggle to dark theme icon" : "Toggle to light theme icon"}/>
        </label>
      </div>
    );
  }
}

export default Theme
