const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      choice: String,
      votes: { type: Number, default: 0 },
    },
  ],
});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;