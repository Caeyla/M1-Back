const mongoose = require('mongoose');
const Customer = require('../domain/models/Customer');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  phone: { type: String, required: true }
},
  {
    timestamps: true
  }
);

class CustomerAdapter {
  constructor() {
    this.model = mongoose.model('Customer', CustomerSchema);
  }

  async create({ name, firstName, email, password, birthDate, phone }) {
    const newCustomer = new this.model({
      name,
      firstName,
      email,
      password,
      birthDate,
      phone
    });
    return await newCustomer.save();
    
  }

  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async update(id, updatesToCustomer) {
    return await this.model.updateOne({ _id: id }, { $set: { ...updatesToCustomer } });
  }

}

module.exports = CustomerAdapter;