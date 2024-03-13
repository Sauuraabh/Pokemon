const mongoose = require(`mongoose`);

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    breed: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
});

module.exports = mongoose.model(`pokemon`, pokemonSchema);