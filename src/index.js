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
   if (!evt.target.value) {
    clearTemplate()
    return
};
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
        console.log(error);
    }) 
  
};

function renderMarkup (data) {
   let template = '';
   let refTemplate = '';
  clearTemplate();
//   console.log(data.length);

   if (data.length === 1) {
       refTemplate = countryInfo;
    template = createCard(data);
   
   } else { 
       refTemplate = countriesList;
    template = createListCard(data);
    // console.log(template);
   }
   createMarkup(refTemplate, template);
}

// function renderCard () {
//     const markUp = countryCardTpl;
//     countryInfo.innerHTML = markUp;
// }    
function createCard (response) {
    console.log(response);
    const {flags, name, capital, population, languages} = response[0];
    return `<div class="card">
    <div class="counry-info">
        <div class="wrapper"><img src="${flags.svg}" alt="flag of ${name.official}" class="flag" width="60">
        <h1 class="name">${name.official}</h1></div>
        <ul class="info-list">
            <li class="info-item"><span class="info-title">Capital: </span>${capital}</li>
            <li class="info-item"><span class="info-title">Population: </span>${population}</li>
            <li class="info-item"><span class="info-title">Languages: </span>${Object.values(languages)}</li>
        </ul>
    </div>
</div>`
}
// function renderListCard () {
//     const markUp = countryListCardTpl;
//     countriesList.innerHTML = countryListCardTpl;
// }
function createListCard (response) {
    return response.map(({flags, name}) => 
        `<li class="countries-card">
        <img class="list-flag" src="${flags.svg}" alt="" width="50">
        <h2 class="list-name">${name.official}</h2>
      </li>`
    ).join('')
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
