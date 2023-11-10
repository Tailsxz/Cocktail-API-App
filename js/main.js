//Fetch API Template
// fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(`Error! ${err}`));
//Example fetch to pull up the margarita cocktail object and see what properties we can access
fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then(res => res.json())
    .then(data => console.log(data.drinks[0]))
    .catch(err => console.log(`Error! ${err}`));
//We can see that the ingredients to the cocktail are presented as individual properties with an integer number representing each one starting from 1, max of 15.
//Knowing this we can create a variable to hold the ingredients string, or we can create a list within our card and insert child list items to that list for each ingredient. With the latter option being a bit more difficult, but might present a nice challenge.
//lets try an OOP approach to this program
function CocktailCard() {
//Lets first grab all the DOM elements we need
this.input = document.querySelector('#cocktail_input');
this.searchButton = document.querySelector('#cocktail_search');
this.name = document.querySelector('#cocktail_name');
this.type = document.querySelector('#cocktail_type');
this.image = document.querySelector('#cocktail_image');
this.instructions = document.querySelector('#cocktail_instructions');

//lets set up and initialize an event listener to grab the value of the cocktail the user inputted
function setClickEvent(element, func) {
    element.addEventListener('click', func);
}

//Lets set up the fetch function and manipulation of the dom
function fetchAll(cocktail) {
    let index = 0;
    fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
    .then(res => res.json())
    .then(data => console.log(data.drinks[index]))
    .catch(err => console.log(`Error! ${err}`));
}

//Setting up a method to print all properties to the DOM
this.printCard = function() {
    setClickEvent(this.searchButton, () => this.cocktail = this.input.value);
};
this.printCard();
}

let cocktailCard = new CocktailCard();