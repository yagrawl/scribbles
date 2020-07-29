import React, { Component } from 'react';

class Snippet extends Component {
  render(props) {
    return (
      <div className="snippet">
        <span className="snippet-tag">{this.props.tag}</span>
        <p className="snippet-title">{this.props.title}</p>
        <span className="snippet-details">{this.props.date}</span>
        <span className="snippet-details-spacing"></span>
        <span className="snippet-details">{this.props.readTime}</span>
        <br/>
        <p className="snippet-subtitle">{this.props.subtitle}</p>
      </div>
    );
  }
}

export default Snippet;
