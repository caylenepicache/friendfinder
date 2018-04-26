
var friendData = require('../data/friends.js');

// Routes
// =============================================================

module.exports = function(app){
// Basic route that sends the user first to the AJAX Page
// Displays a single character, or returns false
app.get("/api/friends", function(req, res) {

    return res.json(friendData);
});


app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newFriend = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newcharacter);
  
    friends.push(newcharacter);
  
    res.json(newcharacter);
}); 

}
