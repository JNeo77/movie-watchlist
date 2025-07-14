let watchList = JSON.parse(localStorage.getItem('movies')) || []
const myMovieEl = document.getElementById('my-movies')
const watchlistMain = document.getElementById('watchlist-main')

document.addEventListener('click', e => {
    if (e.target.dataset.remove) {
      watchList.splice(Number(e.target.dataset.remove), 1)
      localStorage.setItem('movies', JSON.stringify(watchList))
      render()
    }
})

function getDefaultHtml() {
  return `
    <div class="empty-icon" id="empty-icon">
      <p class="empty">Your watchlist is looking a little empty...</p>
      <a href="index.html" class="add-link">
        <img src="img/add-icon.svg" class="add-icon">
        Let's add some movies!
      </a>
    </div>
  `
}

function getWatchlistHtml() {
  let watchlistHtml = ''
  watchList.forEach((movie, idx) => {
    watchlistHtml += `
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
              <button type="button" class="remove-btn" data-remove=${idx}>
              </button>
              <p class="btn-text">Remove</p>
            </div>
          </div>
          <p class="plot">${movie.Plot}</p>
        </div>
      </div>
    `
  })

  return watchlistHtml
}

function render() {
  if (!watchList.length) {
    watchlistMain.style.justifyContent = 'center'
    myMovieEl.innerHTML = getDefaultHtml()
  } else {
    watchlistMain.style.justifyContent = 'flex-start'
    myMovieEl.innerHTML = getWatchlistHtml()
  }
}

render()