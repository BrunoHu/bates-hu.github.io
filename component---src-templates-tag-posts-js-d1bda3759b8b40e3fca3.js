(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"2fD1":function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",(function(){return o}));var n=a("q1tI"),l=a.n(n),r=(a("qEga"),a("vrFN")),s=a("7oih"),c=a("4bGI");t.default=function(e){var t=e.data,a=e.pageContext,n=t.allMarkdownRemark.edges.filter((function(e){return null!=e.frontmatter.tags}));return console.log(n),l.a.createElement(s.a,null,l.a.createElement(r.a,{title:"Tag posts"}),l.a.createElement("h1",{class:"title has-text-black"},"Posts for tag:  ",l.a.createElement("span",{class:"tag is-large is-info"},a.targetTag)),l.a.createElement("p",{class:"subtitle"},n.length+" posts"),l.a.createElement("hr",null),n.map((function(e){var t=e.node,a=t.frontmatter.title||t.fields.slug;return l.a.createElement(c.a,{title:a,date:t.frontmatter.date,desc:t.excerpt,tags:t.frontmatter.tags,slug:t.fields.slug})})))};var o="722543870"},"4bGI":function(e,t,a){"use strict";var n=a("q1tI"),l=a.n(n),r=a("Wbzz");a("qEga");t.a=function(e){return l.a.createElement("div",{class:"box"},l.a.createElement("article",{key:e.title,class:"content"},l.a.createElement("header",null,l.a.createElement("h2",{class:"title"},l.a.createElement(r.Link,{style:{boxShadow:"none"},to:"blog/"+e.slug},e.title)),l.a.createElement("h6",{class:"subtitle"},e.date)),l.a.createElement("section",null,l.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.desc}}))),l.a.createElement("div",{class:"tags"},e.tags.map((function(e){return l.a.createElement(r.Link,{to:"tag/"+e,className:"tag"},e)}))))}}}]);
//# sourceMappingURL=component---src-templates-tag-posts-js-d1bda3759b8b40e3fca3.js.map