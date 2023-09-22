import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
  userChoice: false,
  gameChoice: false,
  gameMode: "regular",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateScore: (state, action) => {
      state.score = action.payload;
    },
    updateUserChoice: (state, action) => {
      state.userChoice = action.payload;
    },
    updateGameChoice: (state, action) => {
      state.gameChoice = action.payload;
    },
    updateGameMode: (state, action) => {
      state.gameMode = action.payload;
    },
  },
});

export const {
  updateScore,
  updateUserChoice,
  updateGameChoice,
  updateGameMode,
} = gameSlice.actions;

export default gameSlice.reducer;
