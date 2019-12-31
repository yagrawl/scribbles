import React, { Component } from 'react';

import '../styles/base.scss';
import '../styles/_animation.scss';

class RelatedPost extends Component {
  render(props) {
    return (
      <div className="post-snippet related-post-snippet">
        <span className="related-posts-snippet-title">{this.props.title}</span>
        <span className="post-snippet-details-spacing-3x"></span>
        <span className="post-snippet-details">{this.props.date}</span>
        <span className="post-snippet-details-spacing"></span>
        <span className="post-snippet-details">{this.props.readTime}</span>
        <br/>
      </div>
    );
  }
}

export default RelatedPost;
