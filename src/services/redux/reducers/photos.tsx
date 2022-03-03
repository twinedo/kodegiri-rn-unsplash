import {createSlice} from '@reduxjs/toolkit';

export interface UserProps {
  name: string;
  username: string;
  profile_image: string;
}

export interface PhotoState {
  description: string;
  urls: string;
  user: UserProps;
  likes: number;
  alt_description: string;
}

const initialState: PhotoState = {
  description: '',
  urls: '',
  user: {
    name: '',
    username: '',
    profile_image: '',
  },
  likes: 0,
  alt_description: '',
};

export const photoReducer = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    reducerPhoto: (state, action) => {
      state = action.payload;
    },
  },
});

export const {reducerPhoto} = photoReducer.actions;

export default photoReducer.reducer;
