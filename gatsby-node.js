const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async (node) => {

  // { graphql, actions }
  const graphql = node.graphql
  const actions = node.actions

  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const blogPostResult = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (blogPostResult.errors) {
    throw blogPostResult.errors
  }

  // Create blog posts pages.
  const posts = blogPostResult.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: "blog" + post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })


  const tagPost = path.resolve(`./src/templates/tag-posts.js`)
  const tagPostResult = await graphql(
    `
    {
      allMarkdownRemark {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
    `
  )

  if (tagPostResult.errors) {
    throw tagPostResult.errors
  }

  // Create blog posts pages.
  const nodes = tagPostResult.data.allMarkdownRemark.nodes

  var tagSet = new Set()

  nodes.forEach(node => node.frontmatter.tags.forEach(tag => tagSet.add(tag)))

  tagSet.forEach( tag => createPage({
    path: "tag/" + tag,
    component: tagPost,
    context: {
      targetTag : tag
    },
  }))

}



exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

