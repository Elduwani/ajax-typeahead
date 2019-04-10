const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities){
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
}

function nunmberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityname = place.city.replace(regex, 
            `<span class="highlight">${this.value}</span>`
        )
        const statename = place.state.replace(regex, 
            `<span class="highlight">${this.value}</span>`
        )
        return `
        <li>
            <span class="cityname">${cityname}, ${statename}</span>
            <span class="population">${nunmberWithCommas(place.population)}</span>
        </li>
        `
    }).join('');
    suggestions.innerHTML = html;
}

const form = document.querySelector('.search-form').onsubmit = (e) => {
    e.preventDefault();
}
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);