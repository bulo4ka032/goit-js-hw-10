import './css/styles.css';
import API from './api-service';
import debounce from 'lodash.debounce';
import { specificInfo, onFetchError } from './notify';
import { renderMarkup } from './render-murkup';
import { clearTemplate } from './clear-template';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');

searchBox.addEventListener('input', debounce(onSearchBox, DEBOUNCE_DELAY));

function onSearchBox (evt) {
    evt.preventDefault();
    const searchQuery = evt.target.value;
   if (!evt.target.value) {
    clearTemplate()
    return
};
    API.fetchCountries(searchQuery)
    .then(data => {
       
        if (data.length > 10) {
            console.log(data);
             specificInfo(); 
        
            clearTemplate();
            return
        } 
        
        renderMarkup(data);
    })
    .catch(error => {
        onFetchError();
        clearTemplate();
    }) 
  
};

