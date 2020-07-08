require('dotenv').config();

const express = require('express');
const chalk = require('chalk');
const path = require('path');

const PORT = process.env.PORT || 3000;
const server = express();

const apiRouter = require('./api');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { startDb, testDB } = require('./db/seed');

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.json());

server.use((req, res, next) => {
    console.log("<----Body Logger START---->");
    console.log(req.body);
    console.log("<----Body Logger END---->");

    next();
});

server.use(express.static(path.join(__dirname, '../dist')))


server.use('/api', apiRouter);
startDb(true)
    .then(testDB)
    .then(() => {
    server.listen(PORT, () => {
        console.log(chalk.green(`Server is listening on PORT: ${PORT}`))
        });
    })
    .catch((error) => {
        console.log(chalk.red("error", error))
    });