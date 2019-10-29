function el(tagName, content = "") {
  const e = document.createElement(tagName);
  e.textContent = content;
  return e;
}

document.addEventListener("DOMContentLoaded", async () => {
  // get username for URL params
  const username = new URLSearchParams(window.location.search).get("username");

  // add username to page
  document.getElementById("username").textContent = username;

  // get fit data
  const res = await fetch(`/looks?username=${username}`);
  const looks = await res.json();

  /**
    convert data to HTML elements
    look = section
    fit = article
   */

  const main = document.querySelector("main");

  for (const look of looks) {
    // add look title, creator
    const header = el("header");
    const title = el("h1", look.title);
    header.append(title);
    header.append(el("p", `~${look.owner}`)); // creator
    main.append(header);

    // create look
    const lookElem = el("section");

    const desc = el("article");
    desc.append(el("p", look.desc)); // add desc
    lookElem.append(desc);

    // create fits
    for (const fit of look.fits) {
      const fitElem = el("article");

      // create linked image
      const img = el("img");
      img.setAttribute("src", fit.img);

      const linkedImg = el("a");
      linkedImg.setAttribute("href", fit.src);
      linkedImg.append(img); // insert image into link
      fitElem.append(linkedImg);

      // create listed breakdown
      const breakdown = el("ul");
      for (const line of fit.breakdown) {
        const lineElem = el("li", line);
        breakdown.append(lineElem);
      }
      // add new stuff
      fitElem.append(breakdown);
      lookElem.append(fitElem);
    }
    main.append(lookElem);
  }

  body.append(main); // add ALL CONTENT
});
