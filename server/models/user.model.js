
// models/user.model.js
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

},
{
    collection: "user-data",timestamps: true
}
);

const model = mongoose.model('userData', userSchema);
module.exports = model;
