import {combineReducers} from 'redux';
import photos from './photos';

export const reducers = combineReducers({
  photos: photos,
});
