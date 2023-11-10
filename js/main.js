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
//Lets first grab all the DOM elements we need
this.searchButton = document.querySelector('#cocktail_search');
cocktailName = document.querySelector('#cocktail_name')
type = document.querySelector('#cocktail_type');
image = document.querySelector('#cocktail_image');
instructions = document.querySelector('#cocktail_instructions');

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

setClickEvent(this.searchButton, this.printCard)

//Lets set up the fetch function
function fetchAll(cocktail) {
    let index = 0;
    fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
    .then(res => res.json())
    .then(data => applyAll(data, index))
    .catch(err => console.log(`Error! ${err}`));
}
console.log(this.name)
//seperate function to apply dom manipulation after the data has been fetched
function applyAll(cocktailObj, index) {
    let currentCocktail = cocktailObj.drinks[index];
    cocktailName.innerText = currentCocktail.strDrink;
    type.innerText = currentCocktail.strAlcoholic;
    image.src = currentCocktail.strDrinkThumb;
    instructions.innerText = currentCocktail.strInstructions;
}

}

let cocktailCard = new CocktailCard();