import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Theme from './theme';
import Bio from './bio';
import Footer from './footer';

class Layout extends React.Component {
  getThemeToggle() {
    if (typeof window !== 'undefined') {
      return <Theme/>;
    }
  }

  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <p className="title-text-root-path">
          <Link className="link" to={`/`}>
            {title}<span className="blinking-cursor">_</span>
          </Link>
        </p>
      )
    } else {
      header = (
        <p className="title-text-post-path">
          <Link className="link" to={`/`}>
            {title}<span className="blinking-cursor">_</span>
          </Link>
        </p>
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
            {this.getThemeToggle()}
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
