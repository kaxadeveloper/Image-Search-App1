const accessKey = "49888459-8e825c406c07428344d82cb5e";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInputEl.value;
    
    const randomPage = Math.floor(Math.random() * 50) + 1;

    const url = `https://pixabay.com/api/?key=${accessKey}&q=${encodeURIComponent(inputData)}&image_type=photo&per_page=10&page=${randomPage}&pretty=true`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (page === 1) {
        searchResultsEl.innerHTML = "";
    }

    const results = data.hits;
    results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.webformatURL;
        image.alt = result.tags;

        const imageLink = document.createElement("a");
        imageLink.href = result.pageURL;
        imageLink.target = "_blank";
        imageLink.textContent = result.tags;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        showMoreButtonEl.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
    searchImages();
});
