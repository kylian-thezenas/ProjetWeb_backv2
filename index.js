const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config({path:"./.env"});

require('./config/database');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/pokemon", require('./routes/pokemonRoutes'));
app.use("/dresseur", require('./routes/dresseurRoutes'));
app.use("/type", require('./routes/typeRoutes'))
app.use("/user", require('./routes/userRoutes'))
app.use("/equipe", require('./routes/equipeRoutes'))
app.use("/favoris", require('./routes/favorisRoutes'))


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});