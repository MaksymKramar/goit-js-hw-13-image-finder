import * as basicLightbox from 'basiclightbox'
import debounce from 'lodash.debounce';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

import NewsApiService from './apiService.js';

import imagesCardTpl from './templates/image-card.hbs';



const refs = {
    inputSearch: document.querySelector("#search-form input"),
    galleryLists: document.querySelector('.gallery'),

}

const newsApiService = new NewsApiService();
// console.log(refs.galleryLists);

refs.inputSearch.addEventListener('input', debounce(onSearch, 500))

function onSearch(e) {
     e.preventDefault();

    newsApiService.query = refs.inputSearch.value;
    console.log(newsApiService.query)

    if (newsApiService.query.trim() === '') {
        return;
    };

    newsApiService.fetchImages().then(articles =>{renderImagesCard(articles)})
    // console.log(API.fetchImages({inputValue,pageNumber, API_KEY}));
    // return API.fetchImages({inputValue,pageNumber, API_KEY}).then(renderImagesCard)//.catch(onFetchError);
};

function renderImagesCard(articles) {
    const markup = imagesCardTpl(articles);
    console.log(markup)

    console.log(articles)

    refs.galleryLists.insertAdjacentHTML('beforeend', markup);
}




