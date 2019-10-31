import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Theme from './theme';
import Bio from './bio';
import Footer from './footer';

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
          <div className="header">
            <header>{header}</header>
            <div className="bio">
              <Bio/>
            </div>
          </div>
          <div className="theme">
            <Theme/>
          </div>
          <div className="clear"></div>
          <main>{children}</main>
        </div>
        <Footer/>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
`

export default Layout
