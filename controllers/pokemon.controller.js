const Pokemon = require(`../models/pokemon.model`);

exports.createPokemon = async (req, res) => {
    try {
        const pokemonObject = {
            name: req.body.name,
            breed: req.body.breed,
            description: req.body.description,
        };

        const pokemon = await Pokemon.create(pokemonObject);
        res.status(200).send(pokemon);
    } catch (err) {
        console.log(`Error in creating pokemon`, err.message);

        res.status(500).send({
            message: `Internal server error`,
        });
    };
};

exports.removePokemon = async (req, res) => {
    try {
        const pokemonName = req.params.name;

        const pokemon = await Pokemon.findOne({ name: pokemonName });

        if (!pokemon) {
          return res
            .status(200)
            .send(`Pokemon with name ${pokemonName} doesnot exists`);
        }

        const deletedPokemon = await Pokemon.findOneAndDelete({ name: pokemonName });

        res.status(200).send(`Pokemon with name ${pokemonName} is deleted : ${deletedPokemon}`);

    } catch (err) {
        console.log(`Error removing pokemon.`, err.message);

        res.status(500).send({
            message: `Internal server error`
        });
    };
};

exports.editPokemon = async (req, res) => {
    try {
        const pokemonName = req.params.name;

        const pokemon = await Pokemon.findOne({ name: pokemonName });

        if (!pokemon) {
            return res
                .status(200)
                .send(`Pokemon with name ${pokemonName} doesnot exists`);
        }

        pokemon.name = req.body.name ? req.body.name : pokemon.name;
        pokemon.breed = req.body.breed ? req.body.breed : pokemon.breed;
        pokemon.description = req.body.description ? req.body.description : pokemon.description;

        const newPokemon = await pokemon.save();
        
        const resultPokemon = {
            name: newPokemon.name,
            breed: newPokemon.breed,
            description: newPokemon.description,
        };

        return res.status(200).send(resultPokemon);

    } catch (err) {
        console.log(`Error in updating pokemon`, err.message);

        res.status(500).send({
            message: `Internal server error`
        });
    };
};

exports.getAllPokemon = async (req, res) => {
    try {
        const pokemonsData = await Pokemon.find();
        const pokemons = [];

        pokemonsData.forEach((pokemon) => {
            pokemons.push({
                name: pokemon.name,
                breed: pokemon.breed,
                description: pokemon.description
            });
        });
        res.status(200).send(pokemons);
    } catch (err) {
        console.log(`Error fetching pokemons data.`, err.message);

        res.status(500).send({
            message: `Internal server error`,
        });
    };
};
