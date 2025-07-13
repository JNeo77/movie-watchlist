let detailedResults = []

document.getElementById('search-btn').addEventListener('click', getSearchResults)

async function getSearchResults() {
  const searchTerm = document.getElementById('search-input').value
  const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=27b6d429`)
  const data = await response.json()
  getResultDetails(data.Search)
}

function getResultDetails(results) {
  results.forEach(async result => {
    const response = await fetch(`http://www.omdbapi.com/?i=${result.imdbID}&apikey=27b6d429`)
    const data = await response.json()
    detailedResults.push(data)
  })
}

console.log(detailedResults)