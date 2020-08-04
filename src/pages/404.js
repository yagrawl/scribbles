import React, { Component } from "react"
import { graphql } from "gatsby"

import Navbar from "../components/layouts/navbar"
import Footer from "../components/elements/footer"
import SEO from "../components/elements/seo"

import "../styles/main.scss"

class NotFound extends Component {
  render() {
    const { data } = this.props
    const { title, cursor, subtitle, author, location } = data.site.siteMetadata

    return (
      <div className="main">
        <SEO title={"About me"}/>
        <Navbar title={title} cursor={cursor} subtitle={subtitle} author={author} location={location} root={true}/>
        <div className="about-text">
          <p>Oops, seems like you clicked on the wrong link. Go back home.</p>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default NotFound

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        description
        siteUrl
        title
        author
        subtitle
        location
        cursor
      }
    }
  }
`
