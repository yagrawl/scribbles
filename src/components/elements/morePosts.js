import React, { Component } from 'react';
import { Link } from "gatsby";

class MorePosts extends Component {
  constructor(props) {
    super(props);

    let filteredPosts = this.filterPosts(props.posts, props.tags, props.link);

    this.state = {
      posts: filteredPosts,
      tags: props.tags,
      link: props.link
    }
  }

  getPosts(posts) {
    return posts.map((post, i) => {
      let { date, path, title } = post.node.frontmatter;
      let { words } = post.node.wordCount;

      return (
        <div className="more-post-snippet-div">
          <Link className="link" to={path}>
            <p className="post-snippet-title">{title}</p>
            <div className="post-snippet-details">
              <span>{date.toUpperCase()}</span>
              <span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
              <span>{words} WORDS</span>
            </div>
          </Link>
        </div>
      );
    });
  }

  filterPosts(posts, mainTags, link) {
    let filterPosts = posts.filter(post => {
      let { tags, path } = post.node.frontmatter;
      if(this.hasCommonTags(mainTags, tags) && path !== link) {
        return post;
      }

      return null;
    })

    return filterPosts.slice(0, 3);
  }

  hasCommonTags(mainTags, currTags) {
    return mainTags.some(tag => currTags.includes(tag))
  }

  render() {
    return (
      <div className="more-posts">
        <h2 className="more-posts-title">More Posts</h2>
        { this.getPosts(this.state.posts) }
      </div>
    )
  }
}

export default MorePosts;
