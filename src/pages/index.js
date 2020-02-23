import React from "react"
import { Link, graphql } from "gatsby"

import "../mystyles.scss"
import SEO from "../components/seo"
import Layout from "../components/Layout"
import PostCard from "../components/postcard"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges
  const count = posts.length
  
  return (
      <Layout>
      <SEO title="Home" />
      <h1 class="title has-text-black is-1">Recent Blogs</h1>
      <hr />
      {posts.slice(0, 5).map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <PostCard 
            title={title} 
            date={node.frontmatter.date}
            desc={node.excerpt}
            tags={node.frontmatter.tags}
            slug={node.fields.slug}
          />    
        )
      })}
      {count > 5 ? <Link className="button is-rounded" to="archive">More Posts</Link> : <div></div>}
      </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
