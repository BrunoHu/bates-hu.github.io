import React, {useEffect }  from "react"

const Comment = () => {
    useEffect(() => {
        // Update the document title using the browser API
        var j, e = document.getElementsByTagName("script")[0];

       if (typeof LivereTower === 'function') { return; }

       j = document.createElement("script");
       j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
       j.async = true;

       e.parentNode.insertBefore(j, e);
    });
  return (
    <div id="lv-container" data-id="city" data-uid="MTAyMC80ODc2MS8yNTI1NQ==">
    </div>
  )
}

export default Comment
