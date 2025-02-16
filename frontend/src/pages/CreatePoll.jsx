import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPollAsync } from "../reducer/pollsSlice";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    if (choices.split(",").length > 0 && question) {
      const options =
        choices.split(",").length > 0 &&
        choices.split(",").map((text) => {
          return { choice: text };
        });

      const poll = { question, options };
      const resultAction = await dispatch(createPollAsync(poll));
      if (createPollAsync.fulfilled.match(resultAction)) {
        setQuestion("");
        setChoices("");
        setMessage("Poll Created!");
      }
    } else {
      setMessage("Fill the details properly!");
    }
  };

  return (
    <div className="container">
      <h1>Create Poll</h1>
      <form onSubmit={handleCreatePoll}>
        <div className="mb-3">
          <label className="form-lable">Question</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your question here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-lable">
            Options {`(Seperate Each option with ", ")`}
          </label>
          <div className="input-group">
            <textarea
              type="text"
              className="form-control"
              rows={4}
              placeholder="Enter your options here"
              value={choices}
              onChange={(e) => setChoices(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button className="btn btn-primary" type="sumbit">
          Create Poll
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CreatePoll;
