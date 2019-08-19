// var xhr = $.get(
//   "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=nIYljTr6swIVRCxmLmspJGL1QCdLMSR4&limit=30"
// );
// xhr.done(function(giphy) {
//   console.log("success got data", giphy);
// });

const btn = document.getElementById("search-btn");
const search_output = document.getElementById("search_output");
const trending_output = document.getElementById("trending_output");
const APIkey = "nIYljTr6swIVRCxmLmspJGL1QCdLMSR4";
const input = document.getElementById("input");
const numOfGifs = 60;

document.addEventListener("DOMContentLoaded", trendingGifs);

function trendingGifs(e) {
  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `http://api.giphy.com/v1/gifs/trending?api_key=${APIkey}&limit=10`,
    true
  );

  xhr.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      const response = JSON.parse(this.responseText);

      let trendingGifs_array = response.data;

      for (const i in trendingGifs_array) {
        trending_output.innerHTML += `
          <img src="${trendingGifs_array[i].images.original.url}" />
          `;
      }
    }
  };
  xhr.send();
}

function getSearchedGifs(e) {
  let keywords = input.value;
  keywordsquery = keywords.replace(" ", "+");
  console.log(keywordsquery);

  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `http://api.giphy.com/v1/gifs/search?q=${keywordsquery}&api_key=${APIkey}&limit=${numOfGifs}`,
    true
  );

  xhr.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      const response = JSON.parse(this.responseText);

      let searchedGifs_array = response.data;

      for (const i in searchedGifs_array) {
        search_output.innerHTML += `<img src="${
          searchedGifs_array[i].images.original.url
        }" />`;
      }
    }
  };

  xhr.send();

  e.preventDefault();
}

btn.addEventListener("click", getSearchedGifs);

// Isotope
// var grid = document.querySelector(".grid");
// var iso = new Isotope(grid, {
//   // options...
//   itemSelector: ".grid-item",
//   masonry: {
//     columnWidth: 200
//   }
// });
