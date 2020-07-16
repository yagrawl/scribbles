import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Pagination from "@material-ui/lab/Pagination";

import Layout from "../components/layout"
import Post from "../components/post"
import SEO from "../components/seo"

import NotFoundArt from "../assets/images/notfoundart.png";

import "../styles/base.scss"

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory: '',
      posts: this.props.data.allMdx.edges,
      query: '',
      page: 1,
    }

    this.categories = [];
    this.handleChange = this.handleChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
    this.searchPosts = this.searchPosts.bind(this);
    this.getLow = this.getLow.bind(this);
    this.getHigh = this.getHigh.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        query: value,
        posts: this.searchPosts(value),
        page: 1
      })
    );
  }

  handlePageChange(event, page) {
    this.setState(
      prevState => ({
        ...prevState,
        page: page
      })
    );
  }

  applyCategory(category) {
    if(this.state.currentCategory === '') {
      this.setState({
        currentCategory: category,
        posts: this.filterPosts(category),
        page: 1
      }, () => {
        this.activeCategory(category);
      });
    } else if(this.state.currentCategory === category) {
      this.setState({
        currentCategory: '',
        posts: this.props.data.allMdx.edges,
        page: 1
      }, () => {
        this.passiveCategory(category);
      });
    } else {
      this.setState({
        currentCategory: category,
        posts: this.filterPosts(category),
        page: 1
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

  filterPosts(category) {
    return this.props.data.allMdx.edges.filter(({ node }) =>
      node.frontmatter.category === category
    );
  }

  searchPosts(value) {
    return this.props.data.allMdx.edges.filter(({ node }) =>
      node.frontmatter.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 || node.frontmatter.description.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
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
    this.state.posts.forEach(({ node }) => {
      if(!this.categories.includes(node.frontmatter.category)) {
        this.categories.push(node.frontmatter.category);
      }
    });

    this.categories = this.categories.sort();

    let categories = this.categories.map(key => {
      return <button className="category-text"
                     id={`${key}-button`}
                     key={key}
                     onClick={() => this.applyCategory(key)}> {key}
             </button>
    });

    return categories;
  }

  getLow() {
    if(this.state.posts.length <= 5) {
      return 0;
    } else {
      return (this.state.page - 1) * 5;
    }
  }

  getHigh() {
    if(this.state.posts.length <= 5) {
      return this.state.posts.length;
    } else {
      return (this.state.page) * 5;
    }
  }

  getPosts() {
    let posts = this.state.posts.slice(this.getLow(), this.getHigh()).map(({ node }) => {
      return <div key={node.frontmatter.path}>
              <Link className="link" to={node.frontmatter.path}>
                <Post title={node.frontmatter.title}
                             subtitle={node.frontmatter.description}
                             date={node.frontmatter.date}
                             readTime={node.frontmatter.time}
                             tag={`#${node.frontmatter.category.toUpperCase()}`}
                        />
              </Link>
            </div>
    });

    if(posts.every(val => val === undefined)) {
      return (
        <div className="not-found-snippet">
          <center>
            <p className="post-snippet-title">
              Sorry, the search query returned no results.
            </p>
          </center>
          <img className="not-found-art" src={NotFoundArt} alt="not found art"/>
        </div>
      );
    }

    return posts;
  }

  getPagination() {
    if(Math.ceil(this.state.posts.length / 5) <= 1) {
      return;
    } else {
      return <Pagination count={Math.ceil(this.state.posts.length / 5)}   onChange={this.handlePageChange} defaultPage={this.state.page}/>
    }
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Yash Agrawal" />
        <div>
          {this.getCategories()}
          <input className="search-box"
                 id="searchbox"
                 type="text"
                 name="query"
                 autoComplete="off"
                 onChange={this.handleChange}
                 placeholder="Search posts ..."
                 value={this.state.query}>
          </input>
          <div className="posts">
            {this.getPosts()}
          </div>
        </div>
        <div className="pagination">{this.getPagination()}</div>
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
            path
          }
        }
      }
    }
  }
`
