import mongoose from 'mongoose';

// Connect to MongoDB (credentials from private directory)
import { mongoURL } from '../../../private/secrets';
mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));
mongoose.connection.on('error', () => console.log('Failed to connect to MongoDB.'));
mongoose.connect(mongoURL, { useNewUrlParser: true });

// Session Schema
const sessionSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    submissions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
    }]
}, {
  versionKey: false
});

// Submission Schema
const submissionSchema = new mongoose.Schema({
    sessionID: String,
    name: String,
    code: String,
    state: {
      type: String,
      default: "in-progress" // other options are: "submitted" and "wrong"
    }
}, {
    versionKey: false
});

// Models
const Session = mongoose.model("Session", sessionSchema);
const Submission = mongoose.model("Submission", submissionSchema);

// Session model
export { mongoose, Session, Submission };
