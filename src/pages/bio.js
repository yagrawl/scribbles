import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/base.scss"

class Bio extends Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Yash Agrawal" />
        <p className="bio-title-text">
          <span role="img" aria-label="wave">👋</span> Hi, I'm Yash
        </p>
        <p className="bio-content-text">I’m a full-stack software engineer
        currently working at Braintree in San Francisco, CA. <br/><br/>
        I’m very interested in frontend development, UX design, and fintech.
        Apart from that I love to run, play badminton, make pasta, build my
        vinyl collection and watch a bunch of movies.
        </p>
      </Layout>
    )
  }
}

export default Bio

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
