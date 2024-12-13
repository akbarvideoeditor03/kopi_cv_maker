import { combineReducers } from 'redux';
import userReducer from './user.reducer';

const webReducer = combineReducers({
    userReducer,
});

const rootReducer = (state, action) => webReducer(state, action);
export default rootReducer;
