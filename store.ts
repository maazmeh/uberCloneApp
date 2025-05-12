import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer'; // Import your user reducer

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here as needed
  },
});

export default store;