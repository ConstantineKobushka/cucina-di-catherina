//! Mobile menu
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
const modalOverlay = document.querySelector('.modal-contacts--overlay');
const contactsBtns = document.querySelectorAll('.contacts-btn');
const modalcloseBtn = document.querySelector('.modal-contacts--close-btn');
const modalContacts = document.querySelector('.modal-contacts');

function stopPropagation(event) {
  event.stopPropagation();
}

function openModaContactsHandler() {
  modalOverlay.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

function closeModaContactsHandler() {
  modalOverlay.classList.remove('is-open');
  if (mobileMenu.classList.contains('open')) {
    return;
  }
  document.body.classList.remove('no-scroll');
}

contactsBtns.forEach((contactsBtn) => contactsBtn.addEventListener('click', openModaContactsHandler));
modalOverlay.addEventListener('click', closeModaContactsHandler);
modalcloseBtn.addEventListener('click', closeModaContactsHandler);
modalContacts.addEventListener('click', stopPropagation);

// //! Modal Order
// const modalOverlay = document.querySelector('.modal-contacts--overlay');
// const contactsBtns = document.querySelectorAll('.contacts-btn');
// const modalcloseBtn = document.querySelector('.modal-contacts--close-btn');
// const modalContacts = document.querySelector('.modal-contacts');

// function stopPropagation(event) {
//   event.stopPropagation();
// }

// function openModaContactsHandler() {
//   modalOverlay.classList.add('is-open');
//   document.body.classList.add('no-scroll');
// }

// function closeModaContactsHandler() {
//   modalOverlay.classList.remove('is-open');
//   if (mobileMenu.classList.contains('open')) {
//     return;
//   }
//   document.body.classList.remove('no-scroll');
// }

// contactsBtns.forEach((contactsBtn) => contactsBtn.addEventListener('click', openModaContactsHandler));
// modalOverlay.addEventListener('click', closeModaContactsHandler);
// modalcloseBtn.addEventListener('click', closeModaContactsHandler);
// modalContacts.addEventListener('click', stopPropagation);

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
