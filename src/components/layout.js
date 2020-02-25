import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdMail } from "react-icons/md"
import { AiFillZhihuSquare } from "react-icons/ai"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import "../mystyles.scss"

const Layout = ({ children }) => {
  const [active, setActive] = useState("")

  const data = useStaticQuery(graphql`
    {
      file(absolutePath: { regex: "/brand.png/" }) {
        publicURL
      }
    }
  `)
  return (
    <div>
      <nav
        class="navbar is-spaced"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <Link className="navbar-item" to=".">
            <img src={data.file.publicURL} width="150" height="50" />
          </Link>
          {/* <h2 class="title"><Link class="navbar-item" href="." >Babel Blog</Link></h2> */}
          <a
            type="button"
            className={"navbar-burger" + active}
            aria-label="menu"
            aria-expanded="false"
            onClick={() =>
              active === "" ? setActive(" is-active") : setActive("")
            }
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class={"navbar-menu" + active} id="navMenu">
          <div class="navbar-end">
            <Link className="navbar-item" to="archive">Archive</Link>
            <Link className="navbar-item" to="tags">Tags</Link>
          </div>
        </div>
      </nav>
      <main class="columns is-centered" style={{ margin: `1em` }}>
        <div class="column is-two-thirds-tablet">{children}</div>
      </main>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            This website is designed by<strong> Bates Hu</strong> and powered by
            <OutboundLink href="https://www.gatsbyjs.org"> Gatsby.js</OutboundLink> and
            <OutboundLink href="https://bulma.io"> Bulma</OutboundLink>.
          </p>
          <p>
            Contact:
            <span class="icon is-medium"><OutboundLink className="has-text-dark" href="https://github.com/bates-hu"><FaGithub /></OutboundLink></span>
            <span class="icon is-medium"><OutboundLink className="has-text-dark" href="mailto:hubingcheng.hbc@gmail.com"><MdMail /></OutboundLink></span>
            <span class="icon is-medium"><OutboundLink className="has-text-dark" href="https://www.linkedin.com/in/bingchenghu"><FaLinkedin /></OutboundLink></span>
            <span class="icon is-medium"><OutboundLink className="has-text-dark" href="https://www.zhihu.com/people/hu-cheng-cheng-66"><AiFillZhihuSquare /></OutboundLink></span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
