//Fetch API Template
// fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(`Error! ${err}`));
//Example fetch to pull up the margarita cocktail object and see what properties we can access
// fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
//     .then(res => res.json())
//     .then(data => console.log(data.drinks[0]))
//     .catch(err => console.log(`Error! ${err}`));
//We can see that the ingredients to the cocktail are presented as individual properties with an integer number representing each one starting from 1, max of 15.
//Knowing this we can create a variable to hold the ingredients string, or we can create a list within our card and insert child list items to that list for each ingredient. With the latter option being a bit more difficult, but might present a nice challenge.
//lets try an OOP approach to this program
function CocktailCard() {
//global intervalId to clear it when a new fetch is sent
let intervalId;

//Lets first grab all the DOM elements we need
const searchButton = document.querySelector('#cocktail_search');
const cocktailName = document.querySelector('#cocktail_name')
const type = document.querySelector('#cocktail_type');
const image = document.querySelector('#cocktail_image');
const instructions = document.querySelector('#cocktail_instructions');
const ingredientsUl = document.querySelector('#cocktail_ingredients')
//Setting up a method to print all properties to the DOM
this.printCard = function() {
    this.cocktail = document.querySelector('#cocktail_input').value;
    if (!this.cocktail) {
        this.cocktail = prompt('Please enter a valid cocktail');
    }
    fetchAll(this.cocktail);
};

//lets set up and initialize an event listener to grab the value of the cocktail the user inputted
function setClickEvent(element, func) {
    element.addEventListener('click', func);
}

setClickEvent(searchButton, this.printCard)
//we need a reset() function to reset everything each time the search button is pressed

//Lets set up the fetch function
function fetchAll(cocktail) {
    let index = 0
    //in the case the user fetches another list of drinks, clear the current interval, and apply the new one.
    if (intervalId) {
        clearTimeout(intervalId);
    }
    fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(cocktail)}`)
    .then(res => res.json())
    .then(data => {
        //Here we are first applying the first cocktail in the drink, at index of 0, we got the automatic carousel working!!!!!! Lets goooooo
        applyAll(data, index)
        intervalId = setInterval(() => {
            index++;
            applyAll(data, index);
        }, 5000);
    })
    .catch(err => cocktailName.innerText = `${cocktail} not found${err}`);
}
//seperate function to apply dom manipulation after the data has been fetched
function applyAll(cocktailObj, index) {
    //this conditional will wipe the ingredients for each search the user inputs.
    if (ingredientsUl.innerHTML !== '') {
        ingredientsUl.innerHTML = '';
    }
    let currentCocktail = cocktailObj.drinks[index % cocktailObj.drinks.length];
    cocktailName.innerText = currentCocktail.strDrink;
    type.innerText = currentCocktail.strAlcoholic;
    image.src = currentCocktail.strDrinkThumb;
    instructions.innerText = currentCocktail.strInstructions;
    setIngredients(currentCocktail);
}
//We want to add a list of ingredients, we can do so by creating a function to loop over the 15 potential ingredients and create a li item within our ul.
function setIngredients(curCocktail) {
    for (let i = 1; i <= 15; i++) {
        let li = document.createElement('li');
        let currentIngredient = curCocktail[`strIngredient${i}`];
        if (currentIngredient == null) {
            break;
        }
        ingredientsUl.appendChild(li).innerHTML = `<span>${currentIngredient}</span>`;
    }
}
//lets pseudocode an automatic carousel, we know that we can use modulus to our advantage, to be able to increment the current index every few seconds (setTimeout()), but our fetch and apply function then needs to also run every few seconds with the new index.
}

let cocktailCard = new CocktailCard();