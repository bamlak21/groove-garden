import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [],
    isLoading: false,
    error: false,
  },
  reducers: {
    // Get Songs
    getSong: (state) => {
      state.isLoading = false;
      state.error = false;
    },
    getSongSuccess: (state, action) => {
      state.songs = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    getSongFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    // Delete Songs
    deleteSong: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    // deleteSongSuccess: (state, action) => {
    //   state.isLoading = false;
    //   state.songs.splice(
    //     state.songs.findIndex((item) => item._id === action.payload),
    //     1
    //   );
    // },
    deleteSongSuccess: (state, action) => {
      state.isLoading = false;
      state.songs.filter((song) => song._id !== action.payload);
    },

    deleteSongFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    // Update Songs
    updateSong: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    updateSongSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.songs[
        state.songs.findIndex((song) => song._id === action.payload._id)
      ] = action.payload.song;
    },
    updateSongFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    // Add Songs
    addSong: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    addSongSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.songs.push(action.payload);
    },
    addSongFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  getSong,
  getSongSuccess,
  getSongFailure,
  addSong,
  addSongSuccess,
  addSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
} = songSlice.actions;

export default songSlice.reducer;
