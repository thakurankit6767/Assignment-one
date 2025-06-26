const app = require('./app');
const http = require('http');
const config = require('./config/config');
const express = require('express');
//const appRun = express();
const server = http.createServer(app);

const PORT = config.PORT || 5000;

// appRun.get('/', (req, res) => {
//   res.send("Hello World"); 
// });

// appRun.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});