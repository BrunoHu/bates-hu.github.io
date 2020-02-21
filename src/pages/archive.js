import React from "react"
import { Link, graphql } from "gatsby"

import "../mystyles.scss"
import SEO from "../components/seo"
import Layout from "../components/Layout"

const Archive = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  var yearPosts = new Map()

  for (var post of posts) {
    const year = post.node.frontmatter.date
    if (!yearPosts.has(year)) {
      yearPosts.set(year, [])
    }
    yearPosts.get(year).push(post)
  }

  const convertPosts = post => {
    const title = post.node.frontmatter.title
    return (
      <li>
        <Link to={"blog" + post.node.fields.slug}>{post.node.frontmatter.title}</Link>
      </li>
    )
  }

  const convertYearPosts = ([year, postsOfYear]) => {
    return (
      <div class="box">
        <h2 class="title">{year}</h2>
        <ul>{postsOfYear.map(convertPosts)}</ul>
      </div>
    )
  }

  return (
    <Layout>
      <SEO title="Archive" />

      <h1 class="title has-text-black is-1">Archive</h1>
      <p class="subtitle">{data.allMarkdownRemark.totalCount + " posts"}</p>
      <hr />
      <div class="content">{Array.from(yearPosts).map(convertYearPosts)}</div>
    </Layout>
  )
}

export default Archive

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "YYYY")
          }
          fields {
            slug
          }
        }
      }
      totalCount
    }
  }
`
