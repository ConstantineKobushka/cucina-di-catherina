const storeSwiper = new Swiper('.store-swiper', {
  // direction: 'vertical',
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const gallerySwiper = new Swiper('.gallery-swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// //! Mobile menu
const burgerBtn = document.querySelector('.header-burger--btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.mobile-close--btn');

openMobileMenuHandler = function () {
  mobileMenu.classList.add('open');
  document.body.classList.add('no-scroll');
};

closeMobileMenuHandler = function () {
  mobileMenu.classList.remove('open');
  document.body.classList.remove('no-scroll');
};

burgerBtn.addEventListener('click', openMobileMenuHandler);
closeBtn.addEventListener('click', closeMobileMenuHandler);

//! Modal Contacts
const modalContactsOverlay = document.querySelector('.modal-contacts--overlay');
const contactsBtns = document.querySelectorAll('.contacts-btn');
const modalContactsCloseBtn = document.querySelector('.modal-contacts--close-btn');
const modalContacts = document.querySelector('.modal-contacts');

function stopPropagation(event) {
  event.stopPropagation();
}

function openModaContactsHandler() {
  modalContactsOverlay.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

function closeModaContactsHandler() {
  modalContactsOverlay.classList.remove('is-open');
  if (mobileMenu.classList.contains('open')) {
    return;
  }
  document.body.classList.remove('no-scroll');
}

contactsBtns.forEach((contactBtn) => contactBtn.addEventListener('click', openModaContactsHandler));
modalContactsOverlay.addEventListener('click', closeModaContactsHandler);
modalContactsCloseBtn.addEventListener('click', closeModaContactsHandler);
modalContacts.addEventListener('click', stopPropagation);

// //! Modal Order
const modalOrderOverlay = document.querySelector('.modal-order--overlay');
const ordersBtn = document.querySelectorAll('.order-btn');
const modalOrderCloseBtn = document.querySelector('.modal-order--close-btn');
const modalOrder = document.querySelector('.modal-order');

function stopPropagation(event) {
  event.stopPropagation();
}

function openModalOrderHandler() {
  modalOrderOverlay.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

function closeModalOrderHandler() {
  modalOrderOverlay.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

ordersBtn.forEach((orderBtn) => orderBtn.addEventListener('click', openModalOrderHandler));
modalOrderOverlay.addEventListener('click', closeModalOrderHandler);
modalOrderCloseBtn.addEventListener('click', closeModalOrderHandler);
modalOrder.addEventListener('click', stopPropagation);

//! Video script
function findmovies() {
  let movies = document.querySelectorAll('.movie-item');

  for (let i = 0; i < movies.length; i++) {
    setupVideo(movies[i]);
  }
}

function setupVideo(movie) {
  let link = movie.querySelector('.movie-item--link');
  let media = movie.querySelector('.movie-item--img');
  let button = movie.querySelector('.movie-item--btn');
  let id = parseMediaURL(media);

  movie.addEventListener('click', () => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    movie.appendChild(iframe);
  });

  link.removeAttribute('href');
  movie.classList.add('movie-item--enable');
}

function parseMediaURL(media) {
  let regexp = /https:\/\/i.ytimg.com\/vi\/([a-zA-Z0-9_-]+)\/sddefault.jpg/;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('src', generateURL(id));
  iframe.setAttribute('allow', 'autoplay; encrypted-media');
  iframe.classList.add('movie-item--img');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return `https://www.youtube.com/embed/${id}${query}`;
}

findmovies();
