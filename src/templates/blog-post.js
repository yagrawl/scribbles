import React, { Component } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogPostTemplate extends Component {
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
  }
`
