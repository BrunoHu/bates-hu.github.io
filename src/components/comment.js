import React, { useEffect } from "react"

const Comment = () => {
  // (title, date, desc, tags)
  const script = document.createElement("script")
  script.src = "https://cdn-city.livere.com/js/embed.dist.js"
  script.async = true

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.getElementById("lv-container").appendChild(script)
  });

  return (
    <div
      id="lv-container"
      data-id="city"
      data-uid="MTAyMC80ODc2MS8yNTI1NQ=="
    ></div>
  )
}

export default Comment
