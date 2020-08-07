import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Navbar from "../components/layouts/navbar"
import Footer from "../components/elements/footer"
import SEO from "../components/elements/seo"

import NotFoundArt from "../assets/images/notfoundart.png"

import "../styles/main.scss"

class NotFound extends Component {
  render() {
    const { data } = this.props
    const { title, cursor, subtitle, author, location } = data.site.siteMetadata

    return (
      <div className="main">
        <SEO title={"404"}/>
        <Navbar title={title} cursor={cursor} subtitle={subtitle} author={author} location={location} root={true}/>
        <div className="about-text">
          <p>Oops, seems like you hit a route that does not exist.</p>
          <img src={NotFoundArt} className="not-found-art" alt="Not found art"/>
          <p>Go back <Link to="/" className="anchor about-anchor">home</Link></p>
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
