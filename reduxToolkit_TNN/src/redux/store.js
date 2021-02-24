import counterReducer from "./counter";
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
        // here we can add all the reducers that we want
        counter: counterReducer
    }
});