fetch("./sources.json")
  .then(response => response.json()) // get json data
  .then(data => {
    data = data[document.title]; // sources for current page

    const container = document.querySelector("main"); // images container

    // add images
    data.forEach(e => {
      const image = document.createElement("img");
      image.src = e.img; // add attributes
      image.alt = e.alt;
      image.title = e.alt;

      const obj = document.createElement("a");
      obj.href = e.page;
      obj.innerHTML = image.outerHTML; // add img to link

      container.append(obj);
    });
  });
