const mongoose = require('mongoose');
const User = require('../domain/models/User');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

class UserMongoAdapter  {
  constructor() {
    this.UserModel = mongoose.model('User', UserSchema);
  }

  async create(user) {
    const newUser = new this.UserModel(user);
    await newUser.save();
  }

  async findByName(name) {
    const user = await this.model.findOne({ name });
    return new User(user.name, user.password);
  }

  async deleteAll() {
    await this.model.deleteMany({});
  }

}

module.exports = UserMongoAdapter;