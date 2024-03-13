const express = require(`express`);
const app = express();
const serverConfig = require(`./configs/server.config`);
const dbConfig = require(`./configs/db.config`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.once(`open`, () => {
    console.log(`Successfully connected to Pokedex database.`);
});

db.on(`error`, () => {
    console.log(`Error connecting to database`);
    process.exit();
});

require(`./routes/pokemon.route`)(app);

app.listen(serverConfig.PORT, () => {
  console.log(`Pokedex server is runnning on PORT : ${serverConfig.PORT}`);
});
