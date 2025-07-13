let searchResults = []
const movies = document.getElementById('movies')

document.getElementById('search-btn').addEventListener('click', getSearchResults)

document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
      console.log('clicked!')
    }
})

async function getSearchResults() {
  const searchTerm = document.getElementById('search-input').value
  const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=27b6d429`)
  const data = await response.json()
  renderResultDetails(data.Search)
}

function renderResultDetails(results) {
  movies.innerHTML = ''
  searchResults = []
  results.forEach(async result => {
    const response = await fetch(`http://www.omdbapi.com/?i=${result.imdbID}&apikey=27b6d429`)
    const data = await response.json()
    searchResults.push(data)
    const movieHtml = `<div class="movie-card">
                        <div class="poster">
                        <img src=${data.Poster} alt="movie poster">
                        </div>
                        <div class="movie-info">
                        <div class="movie-heading">
                          <h2 class="title">${data.Title}</h2>
                          <img src="img/star-solid.svg" class="star">
                          <p class="rating">${data.imdbRating}</p>
                        </div>
                        <div class="movie-details">
                          <p class="runtime">${data.Runtime}</p>
                          <p class="genre">${data.Genre}</p>
                          <div class="add-btn">
                            <img src="img/add-icon.svg" class="add-icon" data-add=${searchResults.indexOf(data)}>
                            <p>Watchlist</p>
                          </div>
                        </div>
                        <p class="plot">${data.Plot}</p>
                        </div>
                      </div>`
    movies.insertAdjacentHTML('beforeend', movieHtml)
  })
}
