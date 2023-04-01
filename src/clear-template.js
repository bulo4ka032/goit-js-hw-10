const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function clearTemplate() {
    countryInfo.innerHTML = '';
    countriesList.innerHTML = '';
  }
