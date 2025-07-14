let searchResults = []
let watchList = JSON.parse(localStorage.getItem('movies')) || []

const moviesEl = document.getElementById('movies') 

document.getElementById('search-btn').addEventListener('click', () => {
  let searchTerm = document.getElementById('search-input').value
  if (searchTerm) {
    searchResults = []
    moviesEl.innerHTML = ''
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=27b6d429`)
      .then(res => res.json())
      .then(data => {
        data.Search.forEach(movie => {
          fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=27b6d429`)
            .then(res => res.json())
            .then(data => {
              searchResults.push(data)
              moviesEl.innerHTML += `
                <div class="movie-card">
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
                      <div class="btn-wrap">
                        <button type="button" class="add-btn" data-add=${searchResults.indexOf(data)}>
                        </button>
                        <p class="btn-text">Watchlist</p>
                      </div>
                    </div>
                    <p class="plot">${data.Plot}</p>
                  </div>
                </div>
              `
            })
        })
      })
  } else {
      moviesEl.innerHTML = `<p class="empty">Unable to find what you’re looking for. Please try another search.</p>`
  }
})

document.addEventListener('click', e => {
    if (e.target.dataset.add) {
      watchList.push(searchResults[Number(e.target.dataset.add)])
      localStorage.setItem('movies', JSON.stringify(watchList))
      e.target.nextElementSibling.textContent = 'Added to list!'
      e.target.nextElementSibling.style.color = '#5bf582'
      e.target.disabled = true
      e.target.style.cursor = 'not-allowed'
    }
})
