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
const cocktailName = document.querySelector('#cocktail_name');
const type = document.querySelector('#cocktail_type');
const image = document.querySelector('#cocktail_image');
const instructions = document.querySelector('#cocktail_instructions');
const ingredientsUl = document.querySelector('#cocktail_ingredients');
const cocktailCard = document.querySelector('.card_cocktail');
const errorMsg = document.querySelector('#error-message');
const errorCard = document.querySelector('.card_error');
//Setting up a method to print all properties to the DOM

this.printCard = function() {
    this.cocktail = document.querySelector('#cocktail_input').value.toLowerCase().replaceAll(' ', '');
    fetchAll(this.cocktail);
};
//we need to fix our fetch to only display cocktail card after the fetch, so we can return it in our fetch function, think we can just call it at the end of our fetch, but ima see what happens when a function call is returned

function showCard() {
    cocktailCard.style = 'display: block;';
    errorCard.style = 'display: none;';
}


//lets set up and initialize an event listener to grab the value of the cocktail the user inputted

function setClickEvent(element, func) {
    element.addEventListener('click', func);
}

setClickEvent(searchButton, (e) => {
    e.preventDefault();
    this.printCard();

})

//we need a reset() function to reset everything each time the search button is pressed

//Lets set up the fetch function

function fetchAll(cocktail) {
    //guard clause to return and not perform the fetch if the input is empty
    if (!cocktail) return;

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
        }, 7000);
        return showCard();
    })
    .catch(err => displayError(err));
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
    console.log(currentCocktail)
    image.src = currentCocktail.strDrinkThumb;
    //inputting the instructions while replacing end of sentence with a line break. Might turn instructions into an ol.
    instructions.innerText = (currentCocktail.strInstructions.replaceAll('. ', '.\n'));
    setIngredients(currentCocktail);
}
//We want to add a list of ingredients, we can do so by creating a function to loop over the 15 potential ingredients and create a li item within our ul.
function setIngredients(curCocktail) {
    for (let i = 1; i <= 15; i++) {
        let li = document.createElement('li');
        let currentIngredient = curCocktail[`strIngredient${i}`];
        let currentMeasurement = curCocktail[`strMeasure${i}`];
        if (currentIngredient == null) {
            break;
        }
        ingredientsUl.appendChild(li).innerHTML = `<span>${currentIngredient}${currentMeasurement ? ` - ${currentMeasurement}` : ``}</span>`;
    }
}

//We need a function to handle an error state when the user inputs a cocktail that cannot be fetched.
function displayError(error){
    //We will need our error function to hide the cocktail card and show the error card, with the error message.
    cocktailCard.style = 'display: none;';
    errorCard.style = 'display: block;';
    errorMsg.innerText = `Drink not found :(`
    console.log(error);
}

//lets pseudocode an automatic carousel, we know that we can use modulus to our advantage, to be able to increment the current index every few seconds (setTimeout()), but our fetch and apply function then needs to also run every few seconds with the new index.
}

let cocktailCard = new CocktailCard();