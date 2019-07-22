document.addEventListener("DOMContentLoaded", async () => {
  // request for specific look
  const res = await fetch(`/api?look=${document.title}`);
  const data = await res.json(); // convert to JSON

  const container = document.querySelector("main");

  data.forEach(fit => {
    const image = document.createElement("img");
    image.setAttribute("src", fit.imageURL); // add attributes

    const linkedImg = document.createElement("a");
    linkedImg.append(image);
    linkedImg.setAttribute("href", fit.sourceURL);

    const breakdown = document.createElement("ul");
    fit.breakdown.forEach(line => {
      // add as paragraphs
      const p = document.createElement("li");
      p.textContent = line;
      breakdown.append(p);
    });
    console.log(breakdown);

    const look = document.createElement("div");
    look.append(linkedImg);
    look.append(breakdown);

    container.append(look);
  });
});
