import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Post from "../components/post"
import SEO from "../components/seo"

import "../styles/base.scss"

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory: '',
      posts: this.props.data.allMdx.edges,
    }

    this.categories = [];
  }

  applyCategory(category) {
    if(this.state.currentCategory === '') {
      this.setState({
        currentCategory: category
      }, () => {
        this.activeCategory(category);
      });
    } else if(this.state.currentCategory === category) {
      this.setState({
        currentCategory: ''
      }, () => {
        this.passiveCategory(category);
      });
    } else {
      this.setState({
        currentCategory: category
      }, () => {
        for(let i = 0; i < this.categories.length; i++) {
          if(this.categories[i] !== category) {
            this.passiveCategory(this.categories[i]);
          } else {
            this.activeCategory(category);
          }
        }
      });
    }
  }

  activeCategory(category) {
    document.getElementById(`${category}-button`).classList.add("category-text-focus");
    document.getElementById(`${category}-button`).classList.remove("category-text");
  }

  passiveCategory(category) {
    document.getElementById(`${category}-button`).classList.add("category-text");
    document.getElementById(`${category}-button`).classList.remove("category-text-focus");
  }

  getCategories() {
    this.state.posts.map(({ node }) => {
      if(!this.categories.includes(node.frontmatter.category)) {
        this.categories.push(node.frontmatter.category);
      }
    });

    let categories = this.categories.map(key => {
      return <button className="category-text"
                     id={`${key}-button`}
                     onClick={() => this.applyCategory(key)}> {key}
             </button>
    });

    return categories;
  }

  getPosts() {
    let posts = this.state.posts.map(({ node }) => {
      if(node.frontmatter.category === this.state.currentCategory || this.state.currentCategory === '') {
        return <div key={node.fields.slug}>
                <Link className="link" to={`blog${node.fields.slug}`}>
                  <Post title={node.frontmatter.title}
                               subtitle={node.frontmatter.description}
                               date={node.frontmatter.date}
                               readTime={node.frontmatter.time}
                               tag={`#${node.frontmatter.category.toUpperCase()}`}
                          />
                </Link>
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
          <div className="posts">
            {this.getPosts()}
          </div>
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
