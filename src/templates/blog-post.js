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
      return <div></div>
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
