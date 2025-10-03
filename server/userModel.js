const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  username: {
    type: String,
    required: true,
    unique: true, 
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
    lowercase: true
  },
  password: {
    type: String, 
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
=======
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true,
    },
    password: {
        type: String, 
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
>>>>>>> eb69874119b590ac2184caac046b7c563ff80c2d
