const Poll = require("../models/poll.model");

// Create a new poll
const makeNewPoll = async (poll) => {
  try {
    const { question, options } = poll;
    const pollToSave = new Poll({ question, options: [...options] });
    const savedPoll = await pollToSave.save();
    return savedPoll;
  } catch (error) {
    throw error;
  }
};

exports.createPoll = async (req, res) => {
  const { poll } = req.body;
  try {
    const savedPoll = await makeNewPoll(poll);
    if (savedPoll) {
      res
        .status(201)
        .json({ message: "Poll created successfully.", poll: savedPoll });
    } else {
      res.status(400).json({ message: "Failed to create new poll." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create new poll." });
  }
};

// Get polls
const fetchAllPolls = async () => {
  try {
    const polls = await Poll.find();
    return polls;
  } catch (error) {
    throw error;
  }
};

exports.getPolls = async (req, res) => {
  try {
    const polls = fetchAllPolls();
    if (polls) {
      res.status(200).json({ message: "Polls fetched successfully", polls });
    } else {
      res.status(404).json({ message: "No poll found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch polls." });
  }
};

// Vote a poll
const makeAVote = async (pollId, optionIndex) => {
  try {
    const poll = await Poll.findById(pollId);
    poll.options[optionIndex].votes += 1;
    await poll.save();
    return poll;
  } catch (error) {
    throw error;
  }
};

exports.votePoll = async (req, res) => {
  const pollId = req.params.pollId;
  const { optionIndex } = req.body;
  try {
    const updatedPoll = await makeAVote(pollId, optionIndex);
    if (updatedPoll) {
      res.status(200).json({ message: "Voted successfully!", updatedPoll });
    } else {
      res.status({ message: "Failed to vote in poll." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to  vote in poll." });
  }
};
