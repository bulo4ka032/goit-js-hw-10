export function createCard (response) {
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

export function createListCard (response) {
    return response.map(({flags, name}) => 
        `<li class="countries-card">
        <img class="list-flag" src="${flags.svg}" alt="" width="50">
        <h2 class="list-name">${name.official}</h2>
      </li>`
    ).join('')
}