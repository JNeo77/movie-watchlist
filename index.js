let watchList = JSON.parse(localStorage.getItem('movies')) || []
let searchResults = []
let movies = []

const moviesEl = document.getElementById('movies')

document.getElementById('search-btn').addEventListener('click', () => {
  movies = []
  const searchTerm = document.getElementById('search-input').value
  if (searchTerm) {
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=27b6d429`)
      .then(res => res.json())
      .then(data => { 
        searchResults = data.Search.map(movie => {
          return fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=27b6d429`)
        })
        render()
      })
  } else {
    moviesEl.innerHTML = `<p class="empty">Unable to find what you’re looking for. Please try another search.</p>`
  }
})

document.addEventListener('click', e => {
    if (e.target.dataset.add) {
      watchList.push(movies[Number(e.target.dataset.add)])
      localStorage.setItem('movies', JSON.stringify(watchList))
      e.target.nextElementSibling.textContent = 'Added to list!'
      e.target.nextElementSibling.style.color = '#5bf582'
      e.target.disabled = true
      e.target.style.cursor = 'not-allowed'
    }
})

function getDefaultHtml() {
  return `
    <div class="start-icon" id="start-icon">
      <img src="img/film-icon.svg">
      <p class="exploring">Start exploring</p>
    </div>
  `
}

async function getMoviesHtml() {
  let moviesHtml = ''
  await Promise.all(searchResults).then(response => {
    return Promise.all(response.map(res => res.json()))
  }).then(data => {
    data.forEach((movie, idx) => {
      movies.push(movie)
      moviesHtml += `
        <div class="movie-card">
          <div class="poster">
            <img src=${movie.Poster} alt="movie poster">
          </div>
          <div class="movie-info">
            <div class="movie-heading">
              <h2 class="title">${movie.Title}</h2>
              <img src="img/star-solid.svg" class="star">
              <p class="rating">${movie.imdbRating}</p>
            </div>
            <div class="movie-details">
              <p class="runtime">${movie.Runtime}</p>
              <p class="genre">${movie.Genre}</p>
              <div class="btn-wrap">
                <button type="button" class="add-btn" data-add=${idx}>
                </button>
                <p class="btn-text">Watchlist</p>
              </div>
            </div>
            <p class="plot">${movie.Plot}</p>
          </div>
        </div>
      `
    })
  })
  return moviesHtml
}

async function render() {
  moviesEl.innerHTML = searchResults.length ? await getMoviesHtml() : getDefaultHtml()    
}

render()