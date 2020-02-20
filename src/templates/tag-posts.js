import React from "react"
import { graphql } from "gatsby"
import "../mystyles.scss"
import SEO from "../components/seo"
import Layout from "../components/Layout"
import PostCard from "../components/postcard"

const BlogIndex = ({data}) => {
  const posts = data.allMarkdownRemark.edges

  return (
      <Layout>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <PostCard 
            title={title} 
            date={node.frontmatter.date}
            desc={node.frontmatter.description || node.excerpt}
            tags={node.frontmatter.tags}
            slug={node.fields.slug}
          />
        )
      })}
      </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($targetTag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: {frontmatter: {tags: {eq: $targetTag}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
