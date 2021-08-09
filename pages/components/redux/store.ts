import { configureStore } from '@reduxjs/toolkit'
// import { darkMode } from './reducers/darkMode';
import darkmodeReducer from './reducers/darkMode'

export default configureStore({
  reducer: {
    themeMode : darkmodeReducer
  },
})