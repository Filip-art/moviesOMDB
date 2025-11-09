const movieContainer = document.querySelector("#watchlist-container")

// if (JSON.parse("watchlist") === null) {
//     alert("nic tu není, přidejte film na find movie")
// }

let moviesFromStorage = ""

let movies = JSON.parse(localStorage.getItem("watchlist"));

if (movies === null || movies.length === 0) {
    movieContainer.innerHTML = `
        <h3>Nic tu není... přidej film <a href='index.html'>zde</a></h3>
    `
} else {
    for (movie of movies) {
    moviesFromStorage += `
                <div class="movie-container">
                    <div class="poster">
                        <img src=${movie.Poster} alt="poster for ${movie.Title}">
                    </div>
                    <div class="movie-details">
                        <div class="movie-title">
                            <h3>${movie.Title}</h3>
                        </div>

                        <div class="movie-length-genre">
                            <p>Released: ${movie.Year}</p>

                            <button data-movie-id=${movie.imdbID}> <i class="fa-solid fa-xmark"></i> Remove</button>
                        </div>

                    </div>
                </div>
    `
}

movieContainer.innerHTML = moviesFromStorage


movieContainer.addEventListener("click", (e) => {
    const clickedMovieId = e.target.dataset.movieId
    // const foundMovie = movies.find( (element) => {
    //     return element.imdbID === clickedMovieId
    // })

    newWatchList = movies.filter( (movie) => {
        return (movie.imdbID !== clickedMovieId)
    })

    localStorage.setItem("watchlist", JSON.stringify(newWatchList))

    window.location.reload()

})


}





