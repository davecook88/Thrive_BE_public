import { configureStore } from '@reduxjs/toolkit'
// import { darkMode } from './reducers/darkMode';
import themeModeReducer from './reducers/darkMode'

export default configureStore({
  reducer: {
    themeMode : themeModeReducer
  },
})