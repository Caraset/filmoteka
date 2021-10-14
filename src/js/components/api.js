// функции для работы с API

const KEY = '94f703750c3e0771d8c2babc592efc94';

// добавляет в локальное хранилище массив всех возможных жанров который будет использоваться для формирования списка жанров фильма
async function getAllGenres() {
  if (localStorage.getItem('genres')) {
    return;
  }
  const respons = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`,
  );

  const genres = await respons.json();

  localStorage.setItem('genres', JSON.stringify(genres.genres));
}

// функция для получения массива популярных фильмов (передает в локальное хранили общее количество страниц)
async function fetchTrendingMovies(pageNum) {
  const firstRespons = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}&page=${pageNum}`,
  );

  const parsedRespons = await firstRespons.json();

  sessionStorage.setItem('totalPages', parsedRespons.total_pages);

  // с сервера приходит объект запроса, массив с фильмами в свойстве result
  return parsedRespons.results;
}

async function fetchMovies(query) {
  return async function (page) {
    const respons = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${query}&page=${page}`,
    );

    const movies = await respons.json();

    sessionStorage.setItem('totalPages', movies.total_pages);
    return movies.results;
  };
}

function getWatchedMovies(pageNum) {
  const movies = JSON.parse(localStorage.getItem('moviesInWatched'));

  if (!movies) {
    return;
  }

  sessionStorage.setItem('totalPages', Math.ceil(movies.length / 20));

  const res = movies.splice((pageNum - 1) * 20, 20);

  return res;
}

function getQueueMovies(pageNum) {
  const movies = JSON.parse(localStorage.getItem('moviesInQueue'));

  if (!movies) {
    return;
  }

  sessionStorage.setItem('totalPages', Math.ceil(movies.length / 20));

  const res = movies.splice((pageNum - 1) * 20, 20);

  return res;
}

export { getAllGenres, fetchTrendingMovies, fetchMovies, getWatchedMovies, getQueueMovies };

// asd
