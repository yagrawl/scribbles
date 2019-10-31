import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/base.scss';
import '../styles/_animation.scss';

class Post extends Component {
  render(props) {
    return (
      <div className="post-snippet">
        <span className="post-snippet-tag">{this.props.tag}</span>
        <p className="post-snippet-title">{this.props.title}</p>
        <span className="post-snippet-details">{this.props.date}</span>
        <span className="post-snippet-details-spacing"></span>
        <span className="post-snippet-details">{this.props.readTime}</span>
        <br/>
        <p className="post-snippet-subtitle">{this.props.subtitle}</p>
      </div>
    );
  }
}

export default Post;
