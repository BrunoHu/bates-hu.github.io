import React from "react"
import { Link, graphql } from "gatsby"

import "../mystyles.scss"
import SEO from "../components/seo"
import Layout from "../components/Layout"

const Tags = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  var tagMap = new Map()
  console.log("------")
  console.log(posts)

  for (const post of posts) {
    for (const tag of post.node.frontmatter.tags) {
      if (tagMap.has(tag)) {
        tagMap.set(tag, tagMap.get(tag) + 1)
      } else {
        tagMap.set(tag, 1)
      }
    }
  }

  var tagPair = Array.from(tagMap)
  console.log("tagmap1")
  console.log(tagPair)

  tagPair.sort((left, right) => right[1] - left[1])

  console.log("tagmap2")
  console.log(tagPair)
  return (
    <Layout>
      <SEO title="Tags" />
    
      <h1 class="title has-text-black is-1">All Tags</h1>
      <p class="subtitle is-spaced">Click the tag to read related articles</p>
      <hr />
      <div class="field is-grouped is-grouped-multiline">
        {tagPair.map(([tag, count]) => {
          return (
            <div class="control">
              <div class="tags has-addons are-medium">
                <Link to={"tag/" + tag} className="tag">{tag}</Link>
                <span class="tag is-info">{count}</span>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`
