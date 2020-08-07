module.exports = {
  siteMetadata: {
    title: `scribbles`,
    cursor: `_`,
    subtitle: `Written by`,
    author: `Yash Agrawal`,
    location: `San Francisco`,
    description: `A personal portfolio - Yash Agrawal.`,
    siteUrl: `https://yash.works`,
    social: {
      twitter: `yagrawl`,
    },
  },
  plugins: [
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: "transparent",
              showCaptions: true,
              markdownCaptions: true,
              maxWidth: 650,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `${__dirname}/content/images`,
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `30`,
              className: `post-autolink`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {}
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-65874311-9`,
      },
    },
  ],
}
