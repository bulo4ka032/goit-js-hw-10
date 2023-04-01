import { clearTemplate } from './clear-template';
import { createListCard, createCard } from './create-markup';

const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function renderMarkup (data) {
   let template = '';
   let refTemplate = '';
  clearTemplate();

   if (data.length === 1) {
       refTemplate = countryInfo;
    template = createCard(data);
   
   } else { 
       refTemplate = countriesList;
    template = createListCard(data);
   }
   createMarkup(refTemplate, template);
}

function createMarkup(ref, markup) {
    ref.innerHTML = markup;
}
