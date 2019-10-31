import React, { Component } from 'react';

import '../styles/base.scss';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p className="footer-text">
          <a className="anchor"
             href="https://github.com/yagrawl"
             target="_blank"
             rel="noopener noreferrer">
            Github
          </a>
        </p>
        <p className="footer-text">
          <a className="anchor"
             href="https://linkedin.com/in/yagrawl"
             target="_blank"
             rel="noopener noreferrer">
            Linkedin
          </a>
        </p>
        <p className="footer-text">
          <a className="anchor"
             href="https://twitter.com/yagrawl"
             target="_blank"
             rel="noopener noreferrer">
            Twitter
          </a>
        </p>
        <p className="footer-text">
          <a className="anchor"
             href="https://medium.com/@yagrawl"
             target="_blank"
             rel="noopener noreferrer">
            Medium
          </a>
        </p>
        <p className="footer-text">
          <a className="anchor"
             href="https://dribbble.com/yagrawl"
             target="_blank"
             rel="noopener noreferrer">
            Dribbble
          </a>
        </p>
      </div>
    );
  }
}

export default Footer;
