
var friendData = require('../data/friends.js');
var friendServer = require('../../server.js');

// Routes
// =============================================================

module.exports = function(app){
// Basic route that sends the user first to the AJAX Page
// Displays a single character, or returns false
app.get("/api/friends", function(req, res) {

    return res.json(friendData);
});


app.post("/api/friends", function(req, res) {

    var matchUser = {
        name: "",
        photo: "",
        friendDifference: 1000
    };

    var newFriend 	= req.body;
    var newFName 	= newFriend.name;
    var newFData 	= newFriend.photo;
    var newFScores 	= newFriend.scores;

    var totalDifference = 0;

		// Here we loop through all the friend possibilities in the database. 
		for  (var i=0; i< friendData.length; i++) {

			console.log(friendData[i].name);
			totalDifference = 0;

			// We then loop through all the scores of each friend
			for (var j=0; j< friendData[i].scores[j]; j++){

				// We calculate the difference between the scores and sum them into the totalDifference
				totalDifference += Math.abs(parseInt(newFScores[j]) - parseInt(friendData[i].scores[j]));

				// If the sum of differences is less then the differences of the current "best match"
				if (totalDifference <= matchUser.friendDifference){

					// Reset the bestMatch to be the new friend. 
					matchUser.name = friendData[i].name;
					matchUser.photo = friendData[i].photo;
					matchUser.friendDifference = totalDifference;
				}
			}
		}

		// Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
		// the database will always return that the user is the user's best friend).
        friendData.push(newFriend);
        

		// Return a JSON with the user's bestMatch. This will be used by the HTML in the next page. 
		res.json(matchUser);


}); 


}
