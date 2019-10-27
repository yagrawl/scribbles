import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import "../styles/base.scss"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h2 className="blog-title-text-main">
          <Link className="link" to={`/`}>
            {title}
          </Link>
        </h2>
      )
    } else {
      header = (
        <h3 className="blog-title-text-sub">
          <Link className="link" to={`/`}>
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <Wrapper>
        <div className="wrapper">
          <header>{header}</header>
          <main>{children}</main>
        </div>
        <Footer>
          © {new Date().getFullYear()},
          {` `}
          <a href="https://www.twitter.com/yagrawl">yagrawl</a>
        </Footer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
`

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`

export default Layout
