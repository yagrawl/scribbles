const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const postTemplate = path.resolve(`./src/templates/post.js`)
  const tagTemplate = path.resolve(`./src/templates/tag.js`)

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
          edges {
            node {
              frontmatter {
                title
                path
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.edges
  const tagSet = new Set()

  posts.forEach((post, index) => {
    post.node.frontmatter.tags.forEach((tag) => {
      tagSet.add(tag)
    })

    createPage({
      path: post.node.frontmatter.path,
      component: postTemplate,
      context: {
        link: post.node.frontmatter.path,
        tags: post.node.frontmatter.tags
      },
    })
  })

  const tags = Array.from(tagSet)

  tags.forEach((tag, index) => {
    createPage({
      path: `/tag/${parseTag(tag)}`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })


  return null
}

let parseTag = tag => {
  return (
    tag &&
    tag
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-')
  )
}
