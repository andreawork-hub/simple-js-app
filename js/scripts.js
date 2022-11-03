let pokemonList=[
    {
        name:"Butterfree",
        height:"1.1",
        type:['bug','flying']
    },
    {
        name:"Meowth",
        height:"0.4",
        type:'normal',
    },
    {
        name:"Gothitelle",
        height:"1.5",
        type:'psychic',
    },
] ; 

// created a for loop that iterates over each item in pokemonList
// added a conditional to check if the height is above a certain value, with note “Wow, that’s big!”

/*for (let index=0 ; index < pokemonList.length ; index++ ) {
    if (pokemonList[index].height > 0.5 && pokemonList[index].height < 1.2) {
        document.write(pokemonList[index].name + " (height: " + pokemonList[index].height + ")" + "<br>") ;
    }else if (pokemonList[index].height < 0.5) {
        document.write(pokemonList[index].name + " (height: " + pokemonList[index].height + ")" + "<br>") ;
    }else {
        document.write(pokemonList[index].name + " (height: " + pokemonList[index].height + ") - Wow, that's big!") 
    }
} 
*/ 

// used a forEach() function instead of the for loop 
// function iterates over each item in pokemonList, prints the details of each item 
// arrow function 

pokemonList.forEach (pokemonList => console.log (pokemonList)) ; 
