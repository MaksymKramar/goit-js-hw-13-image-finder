import * as basicLightbox from 'basiclightbox';
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
    inputSearch: document.querySelector("#search-form input"),
    galleryLists: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),


};

const newsApiService = new NewsApiService();
// console.log(refs.loadMoreBtn);

refs.inputSearch.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreBtn.addEventListener('click', loadMoreArticles);
// refs.galleryLists.addEventListener('click', modalImage);

function onSearch(e) {
     e.preventDefault();

    newsApiService.query = refs.inputSearch.value;

    if (newsApiService.query.trim() === '') {
        error('Пустая строка, введите что-то в поиск');
        return;
        
    };
    newsApiService.resetPage();
    clearArticlesContainer();
    fetchArticles();
    refs.loadMoreBtn.classList.remove('is-hidden')
    
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

function scrollImages() {
    
//    setTimeout(() => {
//         window.scrollTo(0,document.querySelector(".photo-card").scrollHeight);
//    }, 1000);

 const element = document.querySelector('.gallery');
    setTimeout(() => {
        window.scrollTo({
         top: element.clientHeight,
         behavior: 'smooth',
       });
    }, 500);

    // const element = document.querySelector('.card__item');
    // setTimeout(() => {
    //         element.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'end',
    // });
    // }, 1000);

};
function clearArticlesContainer() {
  refs.galleryLists.innerHTML = '';
}

// function modalImage() {
//     newsApiService.fetchImages().then(articles => { modalImageTpl(articles) });
//     const markup = modalImageTpl(articles.hits);
//     console.log(markup);
// //     const instance = basicLightbox.create(`
// //     <img ${markup}>
// // `);

// // instance.show()
//     // const instance = basicLightbox.create(`${markup}`);
//     // console.log(instance)
// // instance.show()

// }
