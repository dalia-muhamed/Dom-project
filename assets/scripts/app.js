const StartAddMovieBtn = document.querySelector('header button');
const modal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const canselModalMovieBtn = modal.querySelector('.btn--passive');
const confirmModalMovieBtn = canselModalMovieBtn.nextElementSibling;
const userInputs = modal.querySelectorAll('input');
const entryTextElement = document.getElementById('entry-text');
const deleteModelDeletion = document.getElementById('delete-modal');

const movies = [];
console.log(userInputs);

function deleteMovie(movieId) {
  const ids = [];
  ids.push(movieId);
  console.log(ids);
  let movieIndex = 0;
  for (const movie of movies) {
    if (movieId === movie.id) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const rootList = document.getElementById('movie-list');
  rootList.children[movieIndex].remove();
  canselDeletionModalHandler();
  updateUi();
}
function canselDeletionModalHandler() {
  console.log('deleteModelDeletion:', deleteModelDeletion);
  deleteModelDeletion.classList.remove('visible');

  toggleBackdrop();
}

function deleteMovieHandler(movieId) {
  deleteModelDeletion.classList.add('visible');
  toggleBackdrop();
  const canselDeletion = deleteModelDeletion.querySelector('.btn--passive');
  let approvalDeletion = deleteModelDeletion.querySelector('.btn--danger');
  approvalDeletion.replaceWith(approvalDeletion.cloneNode(true));
  approvalDeletion = deleteModelDeletion.querySelector('.btn--danger');
  canselDeletion.removeEventListener('click', canselDeletionModalHandler);
  approvalDeletion.addEventListener('click', deleteMovie.bind(null, movieId));

  canselDeletion.addEventListener('click', canselDeletionModalHandler);
  //  deleteMovieModal(movieId);
}

function renderMovies(id, title, imageUrl, rating) {
  const rootList = document.getElementById('movie-list');
  const newLi = document.createElement('li');
  newLi.classList.add('movie-element');
  //  newLi.className='movie-element';
  newLi.innerHTML = `
  <div class="movie-element__image">
  <img src="${imageUrl}" alt="${title}">
   </div>
  <div class="movie-element__info">
  <h2> ${title}</h2>
  <p>${rating}/5 stars </p> 
    </div>
  `;

  newLi.addEventListener('click', deleteMovieHandler.bind(null, id));
  rootList.append(newLi);
}

function updateUi() {
  if (movies.length === 0) {
    entryTextElement.style.display = 'block';
  } else if (movies.length > 0) {
    entryTextElement.style.display = 'none';
  }
}
function closeMovieModal() {
  modal.classList.remove('visible');
  toggleBackdrop();
}
function showMovieModal() {
  modal.classList.add('visible');
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
    id: Math.random(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  closeMovieModal();
  console.log(movies);
  clearMovieInputs();
  renderMovies(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUi();
}
function toggleBackdrop() {
  backdrop.classList.toggle('visible');
  // canselDeletionModalHandler();
}
function backdropClickHandler() {
  closeMovieModal();
  canselDeletionModalHandler();
  toggleBackdrop();
  clearMovieInputs();
}
function canselModalHandler() {
  closeMovieModal();
  clearMovieInputs();
}

confirmModalMovieBtn.addEventListener('click', addMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);
canselModalMovieBtn.addEventListener('click', canselModalHandler);
StartAddMovieBtn.addEventListener('click', showMovieModal);
