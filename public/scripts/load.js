document.addEventListener("DOMContentLoaded", async () => {
  // request for specific look
  const res = await fetch(`/api?look=${document.title}`);
  const data = await res.json(); // convert to JSON

  const container = document.querySelector("main");

  data.forEach(e => {
    const image = document.createElement("img");
    image.setAttribute("src", e.imageURL); // add attributes
    image.setAttribute("alt", e.desc);
    image.setAttribute("title", e.desc);

    const linkedImg = document.createElement("a");
    linkedImg.append(image);
    linkedImg.setAttribute("href", e.sourceURL);

    container.append(linkedImg);
  });
});
