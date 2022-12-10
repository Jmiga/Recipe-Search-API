
const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');

const APP_ID = '6ca9e860';
const APP_Key = '43d36572945a193f77c1c62a420ffac3';

let searchQuery = '';


searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI();
})

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Key}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data.hits);
};

function generateHTML(results){
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="link" target="_blank" href="${result.recipe.url}">View Recipe</a>
                </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
        </div>

        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}