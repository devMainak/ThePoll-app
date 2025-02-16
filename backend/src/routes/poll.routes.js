const express = require("express");
const {
  createPoll,
  getPolls,
  votePoll,
} = require("../controller/poll.controller");

const router = express.Router();

router.post("/create", createPoll);
router.get("/", getPolls);
router.post("/:pollId", votePoll);

module.exports = router;
