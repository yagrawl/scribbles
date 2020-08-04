import React, { Component } from "react"
import { graphql } from "gatsby"

import Navbar from "../components/layouts/navbar"
import Post from "../components/elements/post"
import Footer from "../components/elements/footer"
import SEO from "../components/elements/seo"

import "../styles/main.scss"

class Template extends Component {
  getPosts(posts) {
    return posts.map((post, i) => {
      let { excerpt, timeToRead } = post.node;
      let { date, path, tags, title, description } = post.node.frontmatter;
      let { words } = post.node.wordCount;

      return <Post key={i} title={title} excerpt={excerpt} date={date} tags={tags} words={words} path={path} time={timeToRead} description={description} />
    });
  }

  render() {
    const { data } = this.props
    const { tag } = this.props.pageContext
    const { title, cursor, subtitle, author, location } = data.site.siteMetadata
    const { edges } = data.allMarkdownRemark
    const postCount = edges.length

    return (
      <div className="main">
        <SEO title={tag}/>
        <Navbar title={title} cursor={cursor} subtitle={subtitle} author={author} location={location} root={false}/>
        <p className="tag-template-text">Tag <span className="tag-template-tagname">{tag}</span></p>
        <p className="tag-template-count">{postCount} post{(postCount === 1) ? '' : 's'} found</p>
        { this.getPosts(edges) }
        <Footer/>
      </div>
    )
  }
}

export default Template

export const pageQuery = graphql`
  query Tag($tag: [String]) {
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
    allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {frontmatter: {tags: {in: $tag}}}) {
      edges {
        node {
          frontmatter {
            description
            path
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          wordCount {
            words
          }
          timeToRead
          excerpt(pruneLength: 350)
        }
      }
    }
  }
`
