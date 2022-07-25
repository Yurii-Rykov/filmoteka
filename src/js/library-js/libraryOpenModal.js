import libraryGetRefs from './libraryGetRefs.js';
import { MovieAPI } from '../movieAPI.js';
import { renderModalMarkup } from '../renderModalMarkup';
import Notiflix, { Notify } from 'notiflix';
<<<<<<< HEAD
import getRefs from '../getRefs';
const modal = document.querySelector('.modal');
=======
>>>>>>> b9afc574e2f114d1b204f23cf78eed35afb15015

const movieAPI = new MovieAPI();

libraryGetRefs().containerListRef.addEventListener(
  'click',
  onFilmCardClickHandle
);

function onFilmCardClickHandle(evt) {
  let id = evt.target.closest('.film-card__item').dataset.id;
  if (evt.target === evt.currentTarget) {
    return;
  }
  libraryGetRefs().modal.classList.remove('is-hidden');
  document.addEventListener('keydown', onEscapeCloseHandle);
  libraryGetRefs().modalContainer.addEventListener(
    'click',
    onModalContainerClickHandle
  );
  movieAPI
    .getFilms(id)
    .then(result => {
      const markup = renderModalMarkup(result);
<<<<<<< HEAD
      modal.style.backgroundImage = `linear-gradient(to right, rgba(47, 48, 58, 0.9), rgba(47, 48, 58, 0.9)),
		url(https://image.tmdb.org/t/p/w500/${result.backdrop_path})`;
      modal.style.backgroundSize = 'cover';

=======
>>>>>>> b9afc574e2f114d1b204f23cf78eed35afb15015
      libraryGetRefs().modalFilm.innerHTML = markup;
    })
    // Adding functioning for buttons
    .then(() => {
      onAddButtonsFunctinal();
    })
    .catch(error => console.log(error));
}

libraryGetRefs().modalCloseBtnRef.addEventListener(
  'click',
  onModalCloseBtnHandle
);

function onModalCloseBtnHandle() {
  libraryGetRefs().modal.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscapeCloseHandle);
  libraryGetRefs().modalContainer.removeEventListener(
    'click',
    onModalContainerClickHandle
  );
}

function onModalContainerClickHandle(evt) {
  if (evt.target === evt.currentTarget) {
    onModalCloseBtnHandle();
  }
}
function onEscapeCloseHandle(evt) {
  if (evt.key === 'Escape') {
    onModalCloseBtnHandle();
  }
}
function onAddButtonsFunctinal() {
  const addToWatchedBtnRef = document.querySelector('.js-btn-watched');
  addToWatchedBtnRef.addEventListener('click', onAddToWatchedHandle);
  // --------------цей код додано мною
  const addToQueueBtnRef = document.querySelector('.js-btn-queue');
  addToQueueBtnRef.addEventListener('click', onAddToQueueHandle);
}
// -----------------------------------------------------------------
let watchedMoviesArr = [];
const LOCAL_STORAGE_WATCHED = 'WATCHED';
let queueMoviesArr = [];
const LOCAL_STORAGE_QUEUE = 'QUEUE';

const onAddToWatchedHandle = evt => {
  let id = evt.target.dataset.id;
  const addToWatchedBtnRef = document.querySelector('.js-btn-watched');
  if (localStorage.getItem(LOCAL_STORAGE_WATCHED) !== null) {
    watchedMoviesArr = [
      ...JSON.parse(localStorage.getItem(LOCAL_STORAGE_WATCHED)),
    ];
  }
  // check for unique value(id)
  if (!watchedMoviesArr.includes(id)) {
    watchedMoviesArr.push(id);
    Notify.success('Film add to watched');
    addToWatchedBtnRef.textContent = 'Remove from watched';
  } else {
    watchedMoviesArr = watchedMoviesArr.filter(film => Number(film) !== id);
    Notify.warning('Film Remove from watched');
    let index = watchedMoviesArr.indexOf(id);
    watchedMoviesArr.splice(index, 1);
    addToWatchedBtnRef.textContent = 'Add to watched';
  }

  try {
    const serializedState = JSON.stringify(watchedMoviesArr);
    localStorage.setItem(LOCAL_STORAGE_WATCHED, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

// --------------onAddToQueueHandle
const onAddToQueueHandle = evt => {
  let id = evt.target.dataset.id;
  if (localStorage.getItem(LOCAL_STORAGE_QUEUE) !== null) {
    queueMoviesArr = [...JSON.parse(localStorage.getItem(LOCAL_STORAGE_QUEUE))];
  }
  // check for unique value(id)
  if (!queueMoviesArr.includes(id)) {
    queueMoviesArr.push(id);
    Notify.success('Фільм додано');
    evt.target.textContent = 'Remove from queue';
  } else {
    queueMoviesArr = queueMoviesArr.filter(film => Number(film) !== id);
    Notify.warning('Film Remove from queue');
    let index = queueMoviesArr.indexOf(id);
    queueMoviesArr.splice(index, 1);
    evt.target.textContent = 'Add to queue';
  }
  try {
    const serializedState = JSON.stringify(queueMoviesArr);
    localStorage.setItem(LOCAL_STORAGE_QUEUE, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};
