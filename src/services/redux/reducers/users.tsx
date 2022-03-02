import {createSlice} from '@reduxjs/toolkit';

interface UserState {
  username: string;
  email: string;
}

const initialState: UserState = {
  username: '',
  email: '',
};

export const userReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reducerUser: (state, action) => {
      state = action.payload;
    },
  },
});

export const {reducerUser} = userReducer.actions;

export default userReducer.reducer;
