import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        return (
          <p>
            Written by <Link to='/bio' className="anchor"><strong>{author}</strong></Link> in San
            Francisco.
          </p>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
      }
    }
  }
`

export default Bio
