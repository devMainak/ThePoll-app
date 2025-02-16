import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPollsAsync, votePollAsync } from "../reducer/pollsSlice";

const PollView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPollsAsync());
    setInterval(() => {
      dispatch(fetchPollsAsync());
    }, 5000);
  }, []);

  const { polls, status, error } = useSelector((state) => state.polls);

  const handleVoting = (pollId, optionIndex) => {
    console.log(pollId, optionIndex);
    dispatch(votePollAsync({pollId, optionIndex}));
  };

  return (
    <div className="container">
      <h1>Polls</h1>
      <section>
        {polls.length > 0 ? (
          polls.map((poll) => {
            return (
              <div className="my-3">
                <h4>{poll.question}</h4>
                <div>
                  {poll.options.map((option, index) => {
                    return (
                      <div className="d-flex justify-content-between my-2">
                        <p>
                          {option.choice} : {option.votes}
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleVoting(poll._id, index)}
                        >
                          Vote
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <p>No Polls Here!</p>
        )}
      </section>
    </div>
  );
};

export default PollView;
