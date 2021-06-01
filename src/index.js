import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import debounce from 'lodash.debounce';
import { alert, notice, info, success, error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
defaults.width = '400px';
defaults.minHeight = '20px'
defaults.delay = '200000';
defaults.possition = 'absolute'
import '@pnotify/core/dist/BrightTheme.css';

import NewsApiService from './apiService.js';

import imagesCardTpl from './templates/image-card.hbs';
import modalImageTpl from './templates/modal-image.hbs';




const refs = {
    inputSearch: document.querySelector("#search-form"),
    galleryLists: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    sentinel: document.querySelector('#sentinel'),
};

const newsApiService = new NewsApiService();
// console.log(refs.loadMoreBtn);

refs.inputSearch.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', loadMoreArticles);
refs.galleryLists.addEventListener('click', modalImage);

function onSearch(e) {
     e.preventDefault();
    newsApiService.query = e.currentTarget.elements.query.value;

    if (newsApiService.query.trim() === '') {
        error('Пустая строка, введите что-то в поиск');
        return;
        
    };
    newsApiService.resetPage();
    clearArticlesContainer();
    fetchArticles();
    // refs.loadMoreBtn.classList.remove('is-hidden')
    
    // console.log(API.fetchImages({inputValue,pageNumber, API_KEY}));
    // return API.fetchImages({inputValue,pageNumber, API_KEY}).then(renderImagesCard)//.catch(onFetchError);
};

function fetchArticles() {
    info('Начинаем поиск')
     newsApiService.fetchImages().then(articles => { renderImagesCard(articles)});
    
};

function loadMoreArticles() {
   
    fetchArticles();
    scrollImages();
        
};

function renderImagesCard(articles) {
    const markup = imagesCardTpl(articles.hits);

    refs.galleryLists.insertAdjacentHTML('beforeend', markup);
};


function clearArticlesContainer() {
  refs.galleryLists.innerHTML = '';
}

function modalImage(e) {
    
    if (e.target.nodeName === 'IMG') {
        console.log('lsfs')
        const instance = basicLightbox.create(`
        <img src="${e.target.dataset.largeImage}" >
    `)
        instance.show()

    }
}

const onEntry = entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting && newsApiService.query !== '') {
        fetchArticles()
      }
  });
};


const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});

observer.observe(refs.sentinel);

// function scrollImages() {
    
    
//    setTimeout(() => {
//         const element = document.querySelector('.gallery li');
// element.scrollIntoView({
//   behavior: 'smooth',
//     block: 'nearest ',
// });
//    }, 1000);


//     // setTimeout(() => {
//     //         const element = document.querySelector('.gallery li:last-child');

//     //          window.scrollTo({
//     //      top: element.offsetTop,
//     //      behavior: 'smooth',
//     //    });
//     // }, 1000);

//     // const element = document.querySelector('.card__item');
//     // setTimeout(() => {
//     //         element.scrollIntoView({
//     //     behavior: 'smooth',
//     //     block: 'end',
//     // });
//     // }, 1000);

// };