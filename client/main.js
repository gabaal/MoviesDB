const form = document.getElementById("form");
const movieContainer = document.getElementById("movie-container");

const baseURL = "http://localhost:4242";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const movieData = Object.fromEntries(formData);

  const response = await fetch(`${baseURL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  });
  if (response.ok) {
    displayMovies();
  } else {
    console.error("Failed to add movie", response.status);
  }
});

async function fetchMovies() {
  const movies = await fetch(`${baseURL}/movies`);
  let result = await movies.json();
  return result;
}

async function displayMovies() {
  let movies = await fetchMovies();
  movieContainer.innerHTML = "";
  movies.forEach((movie) => {
    let h3Tag = document.createElement("h3");
    let pTag = document.createElement("p");
    let imgTag = document.createElement("img");
    let delButton = document.createElement("p");

    let infoDiv = document.createElement(`div`);
    let movieCard = document.createElement("div");

    h3Tag.textContent = movie.movie;
    h3Tag.setAttribute("class", "movieTitle");
    pTag.textContent = movie.year;
    imgTag.src = movie.imgURL;
    delButton.textContent = "X";

    // updates inputs
    const updateDiv = document.createElement("div");
    const updateYear = document.createElement("input");
    updateYear.setAttribute("name", "year");
    updateYear.value = movie.year;
    const updateMovie = document.createElement("input");
    updateMovie.setAttribute("name", "movie");
    updateMovie.value = movie.movie;
    const updateImgUrl = document.createElement("input");
    updateImgUrl.setAttribute("name", "imgURL");
    updateImgUrl.value = movie.imgURL;
    const updateButton = document.createElement("button");
    updateButton.textContent = "update";
    const updateForm = document.createElement("form");
    updateButton.setAttribute("type", "submit");

    updateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(updateForm);
      const info = Object.fromEntries(formData);
      console.log(info);
      handleUpdate(movie.id, info);
    });

    updateForm.appendChild(updateMovie);
    updateForm.appendChild(updateYear);
    updateForm.appendChild(updateImgUrl);
    updateForm.appendChild(updateButton);
    updateDiv.appendChild(updateForm);

    delButton.addEventListener("click", (e) => {
      e.preventDefault();
      handleDelete(movie.id);
    });

    infoDiv.appendChild(h3Tag);
    infoDiv.appendChild(pTag);
    movieCard.appendChild(delButton);
    movieCard.appendChild(infoDiv);
    movieCard.appendChild(imgTag);
    movieCard.appendChild(updateDiv);

    movieContainer.appendChild(movieCard);
  });
}

displayMovies();

async function handleDelete(id) {
  const result = await fetch(`${baseURL}/movies/${id}`, {
    method: "DELETE",
  });
  console.log(result);
  if (result.ok) {
    displayMovies();
  }
}

async function handleUpdate(id, updatedInfo) {
  const result = await fetch(`${baseURL}/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedInfo),
  });

  if (result.ok) {
    displayMovies();
  }
}
