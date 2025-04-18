const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0
  },
  api: {
    key: '4e04d16f097b644ff6dca9863d09360e',
    url: 'https://api.themoviedb.org/3/'
  }
};

function init() {
  switch(global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows':
    case '/shows.html':
      displayPopularShows();
      console.log('Displaying popular shows');
      break;
    case '/movie-details':
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details':
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search':
    case '/search.html':
      search();
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);

function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

async function fetchAPIData(endpoint) {
  showSpinner();
  console.log('Fetching data from:', endpoint);
  const response = await fetch(`${global.api.url}${endpoint}?api_key=${global.api.key}&language=en-US`);
  const data = await response.json();
  console.log('API Response:', data);
  setTimeout(() => {
    hideSpinner();
  }, 300);
  
  return data;
}

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}"</img>`
          : `<img src="../images/no-image.jpg class="card-img-top" alt="${movie.title}>`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release Date: ${movie.release_date}</small>
        </p>
      </div>
    `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

async function displayPopularShows() {
  console.log('Fetching popular TV shows...');
  const { results } = await fetchAPIData('tv/popular');
  console.log('TV shows data:', results);


  results.forEach(show => {
    console.log('Processing show:', show);
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
        ${show.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.title}"</img>`
          : `<img src="../images/no-image.jpg class="card-img-top" alt="${show.title}>`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">First Aired: ${show.first_air_date}</small>
        </p>
      </div>
    `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

function addCommasToNumber(number) {
  let numStr = number.toString();

  let parts = numStr.split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}



async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieId}`);

  const div = document.getElementById('movie-details');

  div.innerHTML = `
    <div class="details-top">
    <div>
    ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top alt="${movie.title}"` : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`}
      
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}<li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies.map(company => `<span>${company.name}</span>`, ', ')}</div>
  </div>
  `;

  displayBackgroundImage('movie', movie.backdrop_path);
}

async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];
  const show = await fetchAPIData(`tv/${showId}`);

  const div = document.getElementById('show-details');

  div.innerHTML = `
    <div class="details-top">
    <div>
    ${show.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top alt="${show.name}"` : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`}
      
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}<li>`).join('')}
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
      <li><span class="text-secondary">Last Episode to Air:</span> ${show.last_episode_to_air.name}</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${show.production_companies.map(company => `<span>${company.name}</span>`, ', ')}</div>
  </div>
  `;

  displayBackgroundImage('show', show.backdrop_path);
}

async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach(movie => {
    console.log(movie)
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
      </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

  });
  initSwiper();
}

function initSwiper() {
  console.log('init swiper')
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      750: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }
  });
}

function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${backgroundPath}")`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    console.log(document.querySelector('#movie-details'));
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    console.log(overlayDiv.style.backgroundImage);
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();
    if (results.length === 0) {
      showAlert('No results found.');
      return;
    }

    global.search.totalResults = total_results;
    global.search.totalPages = total_pages;
    global.search.page = page;

    displaySearchResults(results);

    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term!');
  }
}

function displaySearchResults(results) {
  results.forEach(result => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="${global.search.type}-details.html?id=${result.id}">
        ${
          result.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" class="card-img-top" alt="${global.search.type === 'movie' ? result.title : result.name}"`
          : `<img src="images/no-image.jpg" class="card-img-top" alt="${global.search.type === 'movie' ? result.title : result.name}"`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
        <p class="card-text">
          <small class="text-muted">Release: 
            ${global.search.type === 'movie' ? result.release_date : result.first_air_date}
          </small>
        </p>
      </div>
    `;

    document.querySelector('#search-results').appendChild(div);
    document.querySelector('#search-results-heading').innerHTML = `
        <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
    `;
  });
  displayPagination();
}

async function searchAPIData() {
  showSpinner();

  const response = await fetch(
    `${global.api.url}search/${global.search.type}?api_key=${global.api.key}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  )

  const data = await response.json();

  hideSpinner();

  return data;
}

function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => {
    alertEl.remove()
  }, 3000);
}

function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;

  document.querySelector('#pagination').innerHTML = '';
  document.querySelector('#pagination').appendChild(div);

  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page -= 1;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page += 1;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}