document.addEventListener("DOMContentLoaded", async () => {
  // request for specific look
  const res = await fetch(`/api?look=${document.title}`);
  const data = await res.json(); // convert to JSON

  console.log(data);

  const container = document.querySelector("main");

  data.forEach(e => {
    const image = document.createElement("img");
    image.src = e.imageURL; // add attributes
    image.alt = e.desc;
    image.title = e.desc;

    const linkedImg = document.createElement("a");
    linkedImg.innerHTML = image.outerHTML; // add img to link
    linkedImg.href = e.source;

    container.append(linkedImg);
  });
});
