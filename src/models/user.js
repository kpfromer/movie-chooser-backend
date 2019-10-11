import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  // email: {
  //   type: String,
  //   unique: true,
  //   required: true,
  // }
  password: {
    type: String,
    required: true
    // minlength: 8
  },
  role: {
    type: String
  }
});

userSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({
    username: login
  });

  if (!user) {
    user = await this.findOne({
      email: login
    });
  }

  return user;
};

userSchema.pre('remove', function(next) {
  this.model('Movie').deleteMany({ userId: this._id }, next);
});

userSchema.methods.generatePasswordHash = async function() {
  const saltRounds = 10;
  return await bcryptjs.hash(this.password, saltRounds);
};

userSchema.methods.validatePassword = async function(password) {
  return await bcryptjs.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
