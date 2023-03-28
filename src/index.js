import './css/styles.css';
import API from './api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
// import { Loading } from 'notiflix';
 import  countryCardTpl  from './templates/country-card.hbs'
 import  countryListCardTpl  from './templates/countries-card.hbs'
// console.log(countryCardTpl, countryListCardTpl);
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearchBox, DEBOUNCE_DELAY));

function onSearchBox (evt) {
    evt.preventDefault();
    const searchQuery = evt.target.value;

    API.fetchCountries(searchQuery)
    .then(response => {
       
        if (response.length > 10) {
            console.log(response);
             specificInfo(); 
        
            clearTemplate();
            return
        } 
        
        renderMarkup(response);
    })
    .catch(error => {
        onFetchError();
        clearTemplate();
    }) 
  
};

function renderMarkup (response) {
   let template = '';
   let refTemplate = '';
  clearTemplate();

   if (response.length === 1) {
    template = createCard(response);
    refTemplate = countryInfo;
    console.log(template);
   } else { 
    template = createListCard(response);
    refTemplate = countriesList;
    console.log(template);
   }
   createMarkup(refTemplate, template);
}

// function renderCard () {
//     const markUp = countryCardTpl;
//     countryInfo.innerHTML = markUp;
// }    
function createCard (response) {
    const {flag, name, capital, population, languages} = response[0];
    return `<div class="card">
    <div class="counry-info">
        <img src="${flags.svg}" alt="flag of ${name.official}" class="flag">
        <h1 class="name">{{name.official}}</h1>
        <ul class="info-list">
            <li class="info-item"><span>Capital:</span>${capital}</li>
            <li class="info-item"><span>Population:</span>${population}</li>
            <li class="info-item"><span>Languages:</span>${languages}</li>
        </ul>
    </div>
</div>`
}
// function renderListCard () {
//     const markUp = countryListCardTpl;
//     countriesList.innerHTML = countryListCardTpl;
// }
function createListCard (response) {
    return response.map(({flag, name}) => {
        `<div class="countries-card">
        <img class="list-flag" src="${flag.svg}" alt="">
        <h2 class="list-name">${name.official}</h2>
      </div>`
    }).join('')
}

function createMarkup(ref, markup) {
    ref.innerHTML = markup;
}

function specificInfo() {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  
  function onFetchError() {
    Notify.failure(`Oops, there is no country with that name`);
  }
  
  function clearTemplate() {
    countryInfo.innerHTML = '';
    countriesList.innerHTML = '';
  }
