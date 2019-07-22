// HTMLCollection doesn't implement Array behaviour,
// however its structure matches Array so you can do this:
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
HTMLCollection.prototype.map = Array.prototype.map;

document.addEventListener("DOMContentLoaded", () => {
  // breakdown addition button
  document.getElementById("breakdown-add").addEventListener("click", () => {
    const row = document.createElement("input"); // row to add
    row.setAttribute("type", "text");
    row.setAttribute("class", "form-row");

    document.getElementById("breakdown").append(row);
  });

  // breakdown removal button
  document.getElementById("breakdown-remove").addEventListener("click", () => {
    const container = document.getElementById("breakdown");

    // at least 1 line must be submitted
    if (container.childElementCount > 1) {
      // try to remove empty row
      for (child of container.children) {
        // check if empty
        if (child.value === "") {
          container.removeChild(child);
          return;
        }
      }

      // else remove last one
      container.removeChild(container.lastChild);
    }
  });

  // add submit POST
  document.querySelector("form").addEventListener("submit", () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        look: document.getElementById("look").value,
        imageURL: document.getElementById("image-url").value,
        sourceURL: document.getElementById("source-url").value,
        desc: document.getElementById("breakdown").children.map(e => e.value)
      })
    };

    fetch("/api", options); // send POST
  });
});
