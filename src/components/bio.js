import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        return (
          <Container>
            <p
              style={{
                fontFamily: `Montserrat, sans-serif`,
                fontWeight: 100,
              }}
            >
              Written by <span style={{ fontWeight: 300 }}>{author}</span> in San
              Francisco.
            </p>
          </Container>
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

const Container = styled.div`
  display: flex;
`

export default Bio
