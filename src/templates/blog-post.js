import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import RelatedPost from "../components/relatedPost"

class BlogPostTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: this.props.data.allMdx.edges,
    }
  }

  getRelatedPosts(category, title, date) {
    let count = 0;

    let posts = this.state.posts.map(({ node }) => {
      if(node.frontmatter.category === category &&
         node.frontmatter.title !== title &&
         daysSince2000(node.frontmatter.date) < daysSince2000(date) &&
         count < 3) {
        count += 1;
        return <div key={node.frontmatter.path}>
                <Link className="link" to={node.frontmatter.path}>
                  <RelatedPost title={node.frontmatter.title}
                               date={node.frontmatter.date}
                               readTime={node.frontmatter.time}
                          />
                </Link>
              </div>
      }
    });

    if(count === 0) {
      let newPosts = this.state.posts.map(({ node }) => {
        if(node.frontmatter.category === category &&
           node.frontmatter.title !== title &&
           daysSince2000(node.frontmatter.date) > daysSince2000(date) &&
           count < 3) {
          count += 1;
          return <div key={node.frontmatter.path}>
                  <Link className="link" to={node.frontmatter.path}>
                    <RelatedPost title={node.frontmatter.title}
                                 date={node.frontmatter.date}
                                 readTime={node.frontmatter.time}
                            />
                  </Link>
                </div>
        }
      });

      if(newPosts.every(val => val === undefined)) {
        return <div></div>
      } else {
        return (
          <div>
            <p className="related-posts-title">Related Posts</p>
            {newPosts}
          </div>
        )
      }
    } else {
      return (
        <div>
          <p className="related-posts-title">Related Posts</p>
          {posts}
        </div>
      )
    }
  }

  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.excerpt}
        />
        <p className="blog-title-text-main no-margin-bottom">{post.frontmatter.title}</p>
        <p>
          <span className="post-snippet-details">{post.frontmatter.date}</span>
          &nbsp;
          <span className="post-snippet-details">{post.frontmatter.time}</span>
        </p>
        <div className="blog">
          <MDXRenderer>
            {post.body}
          </MDXRenderer>
        </div>
        {this.getRelatedPosts(post.frontmatter.category,
                              post.frontmatter.title,
                              post.frontmatter.date)}
        <hr/>
        <Bio />
      </Layout>
    )
  }
}

let daysSince2000 = date => {
  let months = ["January", "February", "March", "April",
                "May", "June", "July", "August",
                "September", "October", "November", "December"];

  date = date.split(" ");
  let month = months.indexOf(date[0]);
  let day = parseInt(date[1].slice(0, -1));
  let year = parseInt(date[2]);

  return ((year - 2000) * 365) + (month * 30) + day;
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        time
        category
        tags
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            time
            description
            category
            path
          }
        }
      }
    }
  }
`
