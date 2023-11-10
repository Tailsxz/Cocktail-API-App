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