var express = require("express");
var router = express.Router();

// Import Session model
var Session = require("../models/session")

function generateID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}
  
  

router.post("/api/new-session", function(req, res){
    console.log("POST: /api/new-session");
    console.log(req.body)
    var sessionDesc = req.body.description;
    

    // Generate a new session id
    var sessionID = generateID();
    console.log("Session ID generated: " + sessionID);

    // First check to see if the session id was already used.
    Session.find({
        id: sessionID
    }, function(err, foundSession) {
        console.log("Performed find.");
        
        if(err){
            console.log("ERROR: Finding session with id: " + sessionID)
        } else if(!foundSession.length) {
            // No session id was found, go ahead and add it to DB!
            Session.create({
                id: sessionID,
                desc: sessionDesc
        
            }, function(err, session) {
                
                if(err){
                    console.log("ERROR: Unable to add session to DB.");
                } else if(session) {
                    console.log("Succesfully added Session to DB.");
                    console.log(session);
                }
            })
        }
    });
    
    res.send({sessionID: sessionID, desciption: sessionDesc});
});

module.exports = router;