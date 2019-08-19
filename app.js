// var xhr = $.get(
//   "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=nIYljTr6swIVRCxmLmspJGL1QCdLMSR4&limit=30"
// );
// xhr.done(function(giphy) {
//   console.log("success got data", giphy);
// });

const btn = document.getElementById("search-btn");
const search_output = document.getElementById("search_output");
const APIkey = "nIYljTr6swIVRCxmLmspJGL1QCdLMSR4";
const keywords = document.getElementById("keywords");
const numOfGifs = 60;

btn.addEventListener("click", getGifs);

function getGifs(e) {
  console.log("get gifs");

  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `http://api.giphy.com/v1/gifs/search?q=${
      keywords.value
    }&api_key=${APIkey}&limit=${numOfGifs}`,
    true
  );

  xhr.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      const response = JSON.parse(this.responseText);

      let gifs_array = response.data;

      for (const i in gifs_array) {
        search_output.innerHTML +=
          "<img src='" + gifs_array[i].images.original.url + "' />";
      }
    }
  };

  xhr.send();

  e.preventDefault();
}
