import React, { useState, useEffect }  from "react"
import Helmet from "react-helmet"

const Comment = () => {
    useEffect(() => {
        // Update the document title using the browser API
        var j, e = document.getElementsByTagName("script")[0];

       if (typeof LivereTower === 'function') { return; }

       j = document.createElement("script");
       j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
       j.async = true;

       e.parentNode.insertBefore(j, e);
       console.log("test hook")

    });
  return (
    <div id="lv-container" data-id="city" data-uid="MTAyMC80ODc2MS8yNTI1NQ==">
      {/* <Helmet>
        <script
          src="https://cdn-city.livere.com/js/embed.dist.js"
          async="true"
          type="text/javascript"
        ></script>
      </Helmet> */}
    </div>
  )
}

export default Comment
