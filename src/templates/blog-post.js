import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/Layout"
import "../mystyles.scss"
require(`katex/dist/katex.min.css`)

const BlogPostTemplate = ({ data, pageContext, location }) => {

  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
      />
      <article class="content">
        <header>
          <h1 class="title has-text-black">{post.frontmatter.title}</h1>
          <h6 class="subtitle is-spaced">{post.frontmatter.date}</h6>
          <div class="tags">
            {post.frontmatter.tags.map(tag => (
              <Link to={"tag/" + tag} class="tag is-spaced">
                {tag}
              </Link>
            ))}
          </div>
        </header>
        <hr />
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={"blog" + previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"blog" + next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(truncate: true)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`
