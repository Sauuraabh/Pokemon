const pokemonController = require(`../controllers/pokemon.controller`);

module.exports = function (app) {
    app.post(`/pokemon/api/v1/createpokemon`, pokemonController.createPokemon);
    app.get(`/pokemon/api/v1/pokemons`, pokemonController.getAllPokemon);
    app.put(`/pokemon/api/v1/editpokemon/:name`, pokemonController.editPokemon);
    app.delete(`/pokemon/api/v1/removepokemon/:name`, pokemonController.removePokemon);
};