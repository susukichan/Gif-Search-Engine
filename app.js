//-- Constants --------------------------------------------------------
const API_KEY = "nIYljTr6swIVRCxmLmspJGL1QCdLMSR4";
const NUM_OF_GIFS = 60;
const TRENDING_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=10`;

//-- Dom Handles ------------------------------------------------------
const $form = document.getElementById("search-form");
const $input = document.getElementById("search-input");
const $gifOutputTitle = document.getElementById("gif-output__title");
const $gifOutput = document.getElementById("gif-output");

//-- State  -----------------------------------------------------------
const titles = {
  onSearch: "Here is your gifs",
  onTrending: "Trending gifs",
  onLoading: "Please wait... ⌛",
  onError: "Something went wrong"
};

let state = {
  query: "",
  queryURL: ""
};

//-- Program ----------------------------------------------------------
const makeQueryURL = keywords =>
  `https://api.giphy.com/v1/gifs/search?q=${keywords.replace(
    " ",
    "+"
  )}&api_key=${API_KEY}&limit=${NUM_OF_GIFS}`;

const updateTitle = title => ($gifOutputTitle.innerText = title);
const updateGifs = s => ($gifOutput.innerHTML = s);

const handleCatch = err => {
  updateTitle(titles.onError);
  updateGifs("");
  console.error(err);
};

const fetchAndUpdateDom = url => {
  updateTitle(titles.onLoading);
  return fetch(url)
    .then(x => x.json())
    .then(x => {
      if (x.data.length === 0) {
        throw new Error("No results found");
      }

      const htmls = x.data.map(
        gifMetaData =>
          `<img class="gif-output__img" src="${gifMetaData.images.fixed_height.url}" />`
      );

      updateGifs(htmls.join(""));
    });
};

$input.addEventListener("keyup", event => {
  state = {
    ...state,
    query: event.currentTarget.value,
    queryURL: makeQueryURL(event.currentTarget.value)
  };
});

$form.addEventListener("submit", event => {
  event.preventDefault();

  const [title, url] =
    state.query === ""
      ? [titles.onTrending, TRENDING_URL]
      : [titles.onSearch, state.queryURL];

  fetchAndUpdateDom(url)
    .then(() => updateTitle(title))
    .catch(handleCatch);
});

const main = () => {
  fetchAndUpdateDom(TRENDING_URL)
    .then(() => updateTitle(titles.onTrending))
    .catch(handleCatch);
};

main();
