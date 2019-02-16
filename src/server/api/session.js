var express = require("express");
var router = express.Router();

// Import models
var Session = require("../models/session")
var Submission = require("../models/submission")

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



router.post("/api/submit-code", function(req, res){
    console.log("POST: /api/submit-code");
    var codeSubmission = req.body.code;
    var sessionID      = req.body.sessionID;
    var name           = req.body.name;


    Submission.create({
        sessionID: sessionID,
        name: name,
        code: codeSubmission
    }, function(err, submission){
        if(err){
            console.log("ERROR: Submitting code.");
            res.send({status: "failure"})
        } else {
            console.log("Submission succesful.");
            console.log(submission);
            res.send({status: "success"});
        }
    });
    
});


module.exports = router;