import express from 'express';
import shortid from 'shortid';
import sgMail from '@sendgrid/mail';
import axios from 'axios';

// Import Models
import { Session, Submission } from '../models/models';

// For SendGrid API
import { sendGridAPIKey, jdoodle_clientID, jdoodle_clientSecret } from '../../../private/secrets';

sgMail.setApiKey(sendGridAPIKey);

const router = express.Router();

const compile = (s, l, vI) => {
  axios.post('https://api.jdoodle.com/execute', {
    script: s,
    language: l,
    versionIndex: vI,
    clientId: jdoodle_clientID,
    clientSecret: jdoodle_clientSecret
  })
  .then((error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  });
};

const isError = (body) => {
  return body.slice(0, 10) === '\nTraceback';
};

// NOTE: Parantheses indicate who would use the specific route (tutor, student, or both!)

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// POST request for new session (tutor)
router.post('/api/new-session', (req, res) => {
  console.log('POST: /api/new-session');
  
  const sessionID = shortid().slice(0,5);
  req.session.ssid = sessionID; // Remember the session ID for tutor!

  console.log()

  new Session({
    id: sessionID,
    name: req.body.name,
    description: req.body.description,
    submissions: []
  })
  .save()
  .then(() => {
    if (Array.isArray(req.body.emails) && req.body.emails.length !== 0) {
      req.body.emails.forEach(email => {
        sgMail.send({
          to: `${email}`,
          from: 'kevinnguyen125@gmail.com',
          subject: '😆 CodeTutor Invitation 😆',
          text: 'Learn Code. Breathe Code. Be Code.',
          html: `<strong>Invitation Link: <a>http://codetutor.tech/${sessionID}</a></strong>`,
        });
      });
    }
    res.json({ success: true, sessionID: sessionID, name: req.body.name, description: req.body.description });
  })
  .catch(err => res.json({ success: false, error: err }));
});

// POST request for new submission (student)
router.post('/api/new-submission', (req, res) => {
  const submission = new Submission({
    sessionID: req.body.sessionID,
    name: req.body.name,
    code: req.body.code
  });
  req.session.ssid = req.body.sessionID // Remember the session ID for the student!
  req.session.submissionID = submission._id; // Remember the student's MongoDB id!
  submission.save()
  .then(user => Session.findOne({ id: req.body.sessionID }))
  .then(session => Object.assign(session, { submissions: session.submissions.concat([submission._id]) }).save())
  .then(() => res.json({ success: true }))
  .catch(err => res.json({ success: false, error: err }));
});

// POST request to submit code (student or tutor)
router.post('/api/submit-code', (req, res) => {
  console.log("POST: /api/submit-code");
  
  console.log(req.body.sessionID);
  console.log(req.body.name);
  console.log(req.body.code);
  
  Submission.create({
    sessionID: req.body.sessionID,
    submitter: req.body.name,
    code: req.body.code
  }, function(err, submission){
    if(err){
      res.json({status: "error"});
    } else {
      res.json({status: "success"});
    }
  });

  // Submission.findOneAndUpdate(req.body.submissionID, { code: req.body.code, state: "submitted" })
  // .then(() => res.json({ success: true }))
  // .catch(err => res.json({ success: false, error: err }));
});

// GET request for a student's name & code given their submission ID (tutor)
router.get('/api/submission/:submissionID', (req, res) => {
  Submission.findById(req.params.submissionID)
  .then(({ name, code }) => res.json({ status: "success", name, code }))
  .catch(err => res.json({ status: "failure", error: err }));
});

// GET request for a list of submissions, including their name & state (tutor)
router.get('/api/all-submissions', (req, res) => {
  Session.findOne({ id: req.session.ssid })
  .populate('submissions', 'name state')
  .exec()
  .then(({ submissions }) => res.json({ success: true, submissions }))
  .catch(err => res.json({ success: false, error: err }));
});

// Request for a student to join a session
router.post('/api/join-session', (req, res) => {
  console.log("POST: '/api/join-session'");
  console.log(req.body);

  Session.findOne({
    id: req.body.sessionID
  }, function(err, session){
    if(err){
      console.log("ERROR: /api/join-submission")
      res.json({status: "failure"})
    } else if(!!session) {
      console.log("Session found by ID");
      console.log(session);
      res.json({status: "success" })
    } else {
      res.json({status: "failure"})
    }
  });

});

export default router;
