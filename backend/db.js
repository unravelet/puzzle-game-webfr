/** in memory db */
//const passwordHash = require('password-hash');
var randomToken = require('random-token');

var db = {

    /*users: [
        { username: "test@test.at", password: passwordHash.generate("12345678") },
        { username: "linus@kernel.org", password: passwordHash.generate("abcdefg") },
        { username: "steve@apple.com", password: passwordHash.generate("123456") },
        { username: "bill@microsoft.com", password: passwordHash.generate("987654") }
    ],*/

    users: [
        { username: "test@test.at", password: "12345678" },
        { username: "linus@kernel.org", password: "abcdefg" },
        { username: "steve@apple.com", password: "123456" },
        { username: "bill@microsoft.com", password: "987654" }
    ],
    
    tokens: [],
    
    highscores: [ 
        { username: "test@test.at", score: 1600 },
        { username: "linus@kernel.org", score: 1900 },
        { username: "bill@microsoft.com", score: 400 }
    ],

    signup: function(username, password) {
        let user = this.users.find(u => u.username === username);
        if (user !== undefined) {
            return false;
        }

        this.users.push({ username: username, password: password});
        console.log(this.users);
        return true;
    },

    login: function(username, password) {
        let user = this.users.find(u => u.username === username);
        if (user != undefined && password, user.password) {        
            let credentials = {
                token: randomToken(64),
                username: user.username
            }
    
            this.tokens.push(credentials);
            return credentials;
        } 

        return null;    
    },

   
    deleteToken(authToken)  {
        this.tokens = this.tokens.filter(e => e.token != authToken);
    },

    isAuthenticated: function(authToken) {
        return this.tokens.find(auth => auth.token == authToken) != undefined;
    },

    getAuthUser: function(authToken) {
        return this.tokens.find(auth => auth.token == authToken);
    },    

    
    getHighscores: function() {
        return this.highscores.sort(function(a,b) { return b.score - a.score });
    },

    addHighscore: function(username, score) {
        this.highscores.push({ username: username, score: score });
    }
}

module.exports = db;
