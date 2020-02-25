import React from "react"
import { Link } from "gatsby"
import "../mystyles.scss"
const PostCard = (prop) => {
    // (title, date, desc, tags)
    return (
        <div class="box">
        <article key={prop.title} class="content">
          
          <header>
            <h2 class="title"> 
              <Link style={{ boxShadow: `none` }} to={"blog/" + prop.slug}>
                {prop.title}  
              </Link>
            </h2>
            <h6 class="subtitle">{prop.date}</h6>
          </header>
          <section>
            <p
              dangerouslySetInnerHTML={{
                __html: prop.desc,
              }}
            />
          </section>
        </article>
        <div class="tags">
          {prop.tags.map(tag => <Link to={"tag/" + tag} className="tag">{tag}</Link>)}
          </div>
        </div>
    )
}

export default PostCard