const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")
//for unique validator need to install npm i --save mongoose-unique-validator
const userSchema = mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true }
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema);
