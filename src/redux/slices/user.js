import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  userData: {},
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // SET USER
    setUser(state, action) {
      state.userData = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Action creators
export const { setUser } = slice.actions;
