document.addEventListener("DOMContentLoaded", () => {
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
        desc: document.getElementById("desc").value
      })
    };

    fetch("/api", options);
  });
});
