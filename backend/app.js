var express = require('express');
var app = express();
var inMemoryDb = require('./db');

//aus video:
var cors = require('cors');
const { signup, isAuthenticated } = require('./db');
const db = require('./db');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//POST route for login
app.post('/login',(req, res, next) => {
    //const loginData = JSON.stringify(req.body);
    const loginData = req.body;
    console.log(loginData);
    cred= inMemoryDb.login(loginData.email, loginData.password);

    if(cred == null){
        res.status(401).json({
            message: 'Login failed',
            login: false
        })
    }else{
        res.status(200).json({
            message: 'Login successful',
            username: cred.username,
            token: cred.token,
            login: true
        })
    };
});

//POST route for signup
app.post('/signup',(req, res, next) => {
    //const signupData = JSON.stringify(req.body);
    const signupData = req.body;
    console.log(signupData);

    if(inMemoryDb.signup(signupData.email, signupData.password)){
        res.status(200).json({
            message: 'Signup successful',
            signup: true
        });
    }else{
        res.status(200).json({
            message: 'Signup failed',
            signup: false
        });
    }
});

app.post('/highscore', (req, res, next) => {
    let score = 0; //input
    db.addHighscore(db.getAuthUser(), score);
});

app.post('/logout', (req, res, next) => {
    db.deleteToken(GlobalConstant.token);
    
    if(!isAuthenticated(GlobalConstant.token)){
        res.status(200).json({
            message: 'Logout successful',
            logout: true
        })
    }else{
        res.status(200).json({
            message: 'Logout failed',
            logout: false
        })
    }
    
    
    
    
});





//get request
app.get('/', (req, res) => {
    console.log("hello world");
    res.send("GET request to..");
});

//post request
app.post('/', (req, res) => {
    console.log("hello world");
    res.send("POST request to..");
});



module.exports = app;


/*
//middleware
app.use((req, res, next) => {
    console.log("first middleware");
    next();
});
//next ruft nächstes app use auf ?
app.use((req,res) => {
    res.end('middleware finished');
});
*/
//aus lv: 
//GET methode on root route
/*app.get('/', function (req, res) {
    res.send('Method : ' + req.method);
});

app.get('/login', (req, res) => {
    res.send('please provide something idk');
});

/*app.post('/login', (req, res) => {
    //validate
    res.status(200).send('login successful');
});
*/

/*app.use(express.json());
app.use(express.urlencoded({ 
    extended: false
}));

//POST metod on login route
app.post('/', function (req, res, next) {
    const loginData = JSON.stringify(req.body);
    console.log(loginData);

    res.status(200).json({
        message: 'Hello Login from express.js'
    });
});

*/
