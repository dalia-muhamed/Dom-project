const StartAddMovieBtn = document.querySelector('header button');
const modal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const canselModalMovieBtn = modal.querySelector('.btn--passive');
const confirmModalMovieBtn = canselModalMovieBtn.nextElementSibling;
const userInputs = modal.querySelectorAll('input');
const entryTextElement = document.getElementById('entry-text');
const movies = [];
console.log(userInputs);

function renderMovies(title, imageUrl, rating) {
  const rootList = document.getElementById('movie-list');
  const newLi = document.createElement('li');
  newLi.className = 'movie-element';
  newLi.innerHTML = `
  <div class="movie-element__image">
  <img src="${imageUrl}" alt="${title}">
   </div>
  <div class="movie-element__info">
  <h2> ${title}</h2>
  <p>${rating}/5 stars </p> 
    </div>
  `;
  rootList.append(newLi);
}

function updateUi() {
  if (movies.length === 0) {
    entryTextElement.style.display = 'block';
  } else {
    entryTextElement.style.display = 'none';
  }
}
function toggleMovieModal() {
  modal.classList.toggle('visible');
  toggleBackdrop();
}
function clearMovieInputs() {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
}
function addMovieHandler() {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('please enter a valid rating between (1 to 5)');
    return;
  }
  const newMovie = {
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  toggleMovieModal();
  console.log(movies);
  clearMovieInputs();
  renderMovies(newMovie.title, newMovie.image, newMovie.rating);
  updateUi();
}
function toggleBackdrop() {
  backdrop.classList.toggle('visible');
}
function canselModalHandler() {
  toggleMovieModal();
  clearMovieInputs();
}
confirmModalMovieBtn.addEventListener('click', addMovieHandler);
backdrop.addEventListener('click', canselModalHandler);
canselModalMovieBtn.addEventListener('click', canselModalHandler);
StartAddMovieBtn.addEventListener('click', toggleMovieModal);
