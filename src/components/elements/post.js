import React, { Component } from "react"
import { Link } from "gatsby"

class Post extends Component {
  getTags(tags) {
    return tags.map((tag, i) => {
      return <Link to={`/tag/${parseTag(tag)}`}><span>{tag}</span></Link>
    });
  }

  getExcerpt(excerpt) {
    let ellipsis = ' [...]';
    return excerpt.slice(0, -3).split(' ').slice(0, 50).join(" ")
    .concat(ellipsis);
  }

  render(props) {
    return (
      <div className="post-snippet-div">
        <Link className="link" to={this.props.path}>
          <p className="post-snippet-title">{this.props.title}</p>
          <div className="post-snippet-details">
            <span>{this.props.date.toUpperCase()}</span>
            <span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
            <span>{this.props.words} WORDS</span>
          </div>
          <p className="post-snippet-excerpt">
            { this.getExcerpt(this.props.excerpt) }
          </p>
          <div className="post-snippet-tags">
            { this.getTags(this.props.tags) }
          </div>
        </Link>
      </div>
    );
  }
}

let parseTag = tag => {
  return (
    tag &&
    tag
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-')
  )
}

export default Post
