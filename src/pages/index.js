import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/base.scss"

class IndexPage extends Component {
  state = {
    currentCategory: '',
    posts: this.props.data.allMdx.edges,
    filteredPosts: '',
  }

  applyCategory(category) {
    if(this.state.currentCategory === '') {
      this.setState({
        currentCategory: category
      });
    } else if(this.state.currentCategory === category) {
      this.setState({
        currentCategory: ''
      });
    }
  }

  getCategories() {
    let category = {};
    this.state.posts.map(({ node }) => {

      if(!(node.frontmatter.category in category)) {
        category[node.frontmatter.category] = true;
      }
    });

    let categories = Object.keys(category).map(key => {
      return <button className="title-text"
                     onClick={() => this.applyCategory(key)}> {key}
             </button>
    });

    return categories;
  }

  getPosts() {
    let posts = this.state.posts.map(({ node }) => {
      if(node.frontmatter.category === this.state.currentCategory || this.state.currentCategory === '') {
        return <div key={node.fields.slug}>
                <h3 className="title-text">
                  <Link className="link" to={`blog${node.fields.slug}`}>
                    {node.frontmatter.title}
                  </Link>
                </h3>
              </div>
      }
    });

    return posts;
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Yash Agrawal" />
        <Bio />
        <div>
          {this.getCategories()}
          {this.getPosts()}
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
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            time
            description
            category
          }
        }
      }
    }
  }
`
