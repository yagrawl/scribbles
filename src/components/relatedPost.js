import React, { Component } from 'react';

class RelatedPost extends Component {
  render(props) {
    return (
      <div className="snippet related-post-snippet">
        <span className="related-posts-snippet-title">{this.props.title}</span>
        <span className="snippet-details-spacing"></span>
        <span className="snippet-details">{this.props.date}</span>
        <span className="snippet-details-spacing"></span>
        <span className="snippet-details">{this.props.readTime}</span>
        <br/>
      </div>
    );
  }
}

export default RelatedPost;
