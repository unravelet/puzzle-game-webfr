//  aus video:
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app)

server.listen(port);




//aus lv: 
/*const http = require('http');
const app = require('./app');

const server = http.createServer(app);
/*const server = http.createServer((req, res) => {
    res.end('This is my second response.');
});
*/
//use either default port or 3000
//server.listen(process.env.PORT || 3000);
//server.listen(3000);




