import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async actions for polls
export const fetchPollsAsync = createAsyncThunk("polls/fetch", async () => {
  const response = await axios.get("http://localhost:3000/polls");
  console.log(response.data);
  return response.data;
});

export const createPollAsync = createAsyncThunk(
  "polls/create",
  async (poll) => {
    const response = await axios.post("http://localhost:3000/polls/create", {
      poll: poll,
    });
    return response.data;
  }
);

export const votePollAsync = createAsyncThunk(
  "polls/vote",
  async ({ pollId, optionIndex }) => {
    console.log(pollId, optionIndex);
    const response = await axios.post(`http://localhost:3000/polls/${pollId}`, {
      optionIndex: optionIndex,
    });
    return response.data;
  }
);

// Posts slice
const pollsSlice = createSlice({
  name: "polls",
  initialState: {
    polls: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPollsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPollsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.polls = action.payload.polls;
      })
      .addCase(fetchPollsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(votePollAsync.fulfilled, (state, action) => {
        state.polls = state.polls.map((poll) =>
          poll._id === action.payload.updatedPoll._id
            ? action.payload.updatedPoll
            : poll
        );
      })
      .addCase(createPollAsync.fulfilled, (state, action) => {
        state.polls.push(action.payload.poll);
      });
  },
});

export default pollsSlice.reducer;
