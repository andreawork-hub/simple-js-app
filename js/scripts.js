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

for (let index=0 ; index < pokemonList.length ; index++ ) {
    if (pokemonList[index].height > 0.5 && pokemonList[index].height < 1.2) {
        document.write(pokemonList[index].name + " (height: " + pokemonList[index].height + ")" + "<br>") ;
    }else if (pokemonList[index].height < 0.5) {
        document.write(pokemonList[index].name + " (height: " + pokemonList[index].height + ")" + "<br>") ;
    }else {
        document.write(pokemonList[index].name + " (height: " + pokemonList[index].height + ") - Wow, that's big!") 
    }
}