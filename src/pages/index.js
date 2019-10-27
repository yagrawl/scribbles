import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/base.scss"

class IndexPage extends Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Yash Agrawal" />
        <Bio />
        <div style={{ margin: "20px 0 40px" }}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug}>
                <h3 className="title-text"
                  style={{
                    fontFamily: `Montserrat, sans-serif`,
                    textDecoration: 'none',
                  }}
                >
                  <Link
                    style={{ boxShadow: `none`,
                             textDecoration: 'none',
                             color: '#0E0E0E' }}
                    to={`blog${node.fields.slug}`}
                  >
                    {title}
                  </Link>
                </h3>
                <small style={{ fontFamily: `Montserrat, sans-serif` }}>
                  {node.frontmatter.date} &middot; {node.frontmatter.time}
                </small>
                <p
                  style={{
                    fontFamily: `Montserrat, sans-serif`,
                    fontWeight: 100,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: node.excerpt || node.frontmatter.description,
                  }}
                />
              </div>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            time
            description
          }
        }
      }
    }
  }
`
