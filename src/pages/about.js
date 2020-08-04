import React, { Component } from "react"
import { graphql } from "gatsby"

import Navbar from "../components/layouts/navbar"
import Footer from "../components/elements/footer"
import SEO from "../components/elements/seo"

import "../styles/main.scss"

class About extends Component {
  render() {
    const { data } = this.props
    const { title, cursor, subtitle, author, location } = data.site.siteMetadata

    return (
      <div className="main">
        <SEO title={"About me"}/>
        <Navbar title={title} cursor={cursor} subtitle={subtitle} author={author} location={location} root={true}/>
        <div className="about-text">
        <p><span role="img" aria-label="wave emoji">👋</span> Hi, I'm Yash</p>

        <p>I’m a full-stack software engineer currently working at Braintree in San Francisco, CA.</p>

        <p>I’m interested in fullstack development and fintech. Apart from that I love to run, play badminton, make pasta, build my vinyl collection and watch a lot of movies.</p>

        <p>I also write from time to time. You can read it <a className="link" href="/">here</a>.</p>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default About

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
