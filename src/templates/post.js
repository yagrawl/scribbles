import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Navbar from "../components/layouts/navbar"
import MorePosts from "../components/elements/morePosts"
import Newsletter from "../components/elements/newsletter"
import Footer from "../components/elements/footer"
import SEO from "../components/elements/seo"

import "../styles/main.scss"

class PostTemplate extends Component {
  getTags(tags) {
    return tags.map((tag, i) => {
      return <Link to={`/tag/${parseTag(tag)}`} key={i}>
        <span>{tag}</span>
      </Link>
    });
  }

  render() {
    const { data } = this.props
    const postTags = this.props.pageContext.tags
    const postLink = this.props.pageContext.link
    const morePosts = data.allMarkdownRemark.edges
    const post = data.markdownRemark
    const { title, date, tags } = post.frontmatter
    const { words } = post.wordCount
    const html = post.html
    const { cursor, subtitle, author, location } = data.site.siteMetadata
    const siteTitle = data.site.siteMetadata.title

    return (
      <div className="main">
        <SEO title={title}/>
        <Navbar title={siteTitle} cursor={cursor} subtitle={subtitle} author={author} location={location} root={false}/>
        <div className="posts">
          <p className="post-title-text">{title}</p>
          <div className="post-details">
            <span>{date.toUpperCase()}</span>
            <span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
            <span>{words} WORDS</span>
          </div>
          <div className="post-tags">
            { this.getTags(tags) }
          </div>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <MorePosts posts={morePosts} tags={postTags} link={postLink}/>
        <Newsletter post={title}/>
        <Footer/>
      </div>
    )
  }
}

export default PostTemplate

let parseTag = tag => {
  return (
    tag &&
    tag
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-')
  )
}

export const pageQuery = graphql`
  query Post($link: String) {
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
    allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
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
    markdownRemark(frontmatter: {path: {eq: $link}}) {
      html
      frontmatter {
        title
        path
        description
        date(formatString: "MMMM DD, YYYY")
        tags
      }
      wordCount {
        words
      }
      timeToRead
    }
  }
`
