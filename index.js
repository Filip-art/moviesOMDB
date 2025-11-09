const searchInput = document.querySelector("#searchMovie")
const searchBtn = document.querySelector("#searchBtn")
const searchForm = document.querySelector("#search-form")
const mainBody = document.querySelector("#search-results")

let currentMovieArray = []

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const movieSearch = searchInput.value
    searchInput.value = ""

    const response = await fetch(`http://www.omdbapi.com/?s=${movieSearch}&apikey=963cfbce`)
    const data = await response.json()
    console.log(data)

    currentMovieArray = data.Search
    renderMovies(data.Search)
})


function renderMovies(movieArray) {
    
    let htmlToRender = ""

    for (movie of movieArray) {
        htmlToRender += `
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

                        <button data-movie-id=${movie.imdbID}> <i class="fa-solid fa-square-plus"></i> Watchlist</button>
                    </div>

                </div>
            </div>
        `
    }


    mainBody.innerHTML = htmlToRender
} 


// mainBody.addEventListener("click", (e) => {
//     const clickedMovieId = e.target.dataset.movieId

//     if (clickedMovieId) {


//     const foundMovie = currentMovieArray.find( (element) => {
//         return element.imdbID === clickedMovieId
//     })
//     const oldWatchList = localStorage.getItem("watchlist")

//     let watchList;

//     if (oldWatchList === null) {
//         watchList = []
//     } else {
//         watchList = JSON.parse(oldWatchList)
//     }

//     const isAlreadyAdded = watchList.some( (movie) => {
//          return (movie.imdbID === foundMovie.imdbID) 
//     })

//     if (!isAlreadyAdded) {
//         watchList.push(foundMovie)
//         localStorage.setItem("watchlist", JSON.stringify(watchList))
//     } else {
//         alert("movie already added")
//     }

//     }
    

//     // console.log(watchList)
//     // console.log(foundMovie)


// })

mainBody.addEventListener("click", (e) => {
    const clickedMovieId = e.target.dataset.movieId;

    if (clickedMovieId) {
        const foundMovie = currentMovieArray.find((element) => {
            return element.imdbID === clickedMovieId;
        });
        if (!foundMovie) {
            console.error("Film nebyl nalezen v aktuálních datech.");
            alert("Došlo k chybě, zkuste prosím hledat znovu.");
            return; 
        }

        const oldWatchList = localStorage.getItem("watchlist");
        let watchList;

        if (oldWatchList === null) {
            watchList = [];
        } else {
            const parsedList = JSON.parse(oldWatchList);
            watchList = parsedList.filter(movie => movie !== null);
        }

        const isAlreadyAdded = watchList.some((movie) => {
            return (movie.imdbID === foundMovie.imdbID);
        });

        
        if (!isAlreadyAdded) {
            watchList.push(foundMovie);
            localStorage.setItem("watchlist", JSON.stringify(watchList));
            alert("Film byl přidán do watchlistu!");
        } else {
            alert("Tento film už ve watchlistu máš.");
        }
    }
});