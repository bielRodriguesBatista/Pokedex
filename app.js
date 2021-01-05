const fethPokemon = () =>{
    const getPokemonUrl = id =>  `https://pokeapi.co/api/v2/pokemon/${id}`
    
    //Array de promises
    const pokemonPromises = []

    //método fetch retorna uma promisses
    for(let i = 1; i < 150; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }
    Promise.all(pokemonPromises)
    .then(pokemons => {
        console.log(pokemons)

        // reduzir um array à algum outro tipo de dado
        const liPokemons = pokemons.reduce((accumulator, pokemon) => {
            accumulator += `
            <li class="card">
            <h2 class"card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class"card-subtitle">${pokemon.types.map(typeinfo => typeinfo.type.name).join(' | ')}</p> 
            </li>`
        }, '')
        // console.log(liPokemons)
        // o parágrafo <p> retorna um array de string com os tipo de pokemon
    })
}
fethPokemon()