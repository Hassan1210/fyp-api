var http = require('http');
const app = require('./app')

const hostname = "0.0.0";
const port =  process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port,console.log("App is running"));

// https://fyp-project-api.herokuapp.com