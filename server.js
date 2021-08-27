'use strict';

const Hapi = require("hapi");
const { Client } = require('pg');

const server = new Hapi.Server();

server.connection({ "host": "localhost", "port": 5050 });

server.start(error => {
    if(error) {
        throw error;
    }
    console.log("Listening at " + server.info.uri);
});

server.route({
    method: "GET",
    path: "/",
    handler: (request, response) => {
        response("Landing page");
    }
});

server.route({
    method: "GET",
    path: "/about",
    handler: (request, response) => {
        response("About page");
    }
});

server.route({
    method: "POST",
    path: "/printTheRequest",
    handler: (request, response) => {
        response(request.payload);
    }
});

const client = new Client({
    user: 'sivanesh',
    host: 'localhost',
    database: 'test',
    port: 5432,
});

client.connect(function(err) {
    if(err) {
        throw new Error('Database connection error');
    }
    console.log('Connected to db successfully');
});

server.route({
    method: "GET",
    path: "/fetchMovieList",
    handler: (request, response) => {
        client.query('  SELECT * FROM movieList', function(err, res) {
            if(err) {
                console.error('Error');
            }
            response(res.rows);
        });
    }
});
