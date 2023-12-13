import {configureStore, createSlice} from '@reduxjs/toolkit'

const songsSlice = createSlice({
  name: 'song',
  initialState: [],
  reducers: {
    // name + '/' + functionName
    // 'song/addSong'
    addSong(state, action) {
      state.push(action.payload)
    },
    removeSong(state, action) {
      // action.payload is the name of the song we want to remove
      // get the index of the song passed in via payload
      const index = state.indexOf(action.payload)
      // call splice with that index and remove just the once song from our array
      state.splice(index, 1)
    },
  },
})

const store = configureStore({
  reducer: {
    songs: songsSlice.reducer,
  },
})

// console.log(store)

// const startingState = store.getState()
// console.log(JSON.stringify(startingState))

// store.dispatch({
//   type: 'song/addSong',
//   payload: 'Where is My Mind?',
// })

// const finalState = store.getState()
// console.log(JSON.stringify(finalState))

// view an action creator from a slice
// console.log(songsSlice.actions.addSong('Where is My Mind?'))

// const startingState = store.getState()
// console.log(JSON.stringify(startingState))

// store.dispatch(songsSlice.actions.addSong('Where is My Mind?'))

// const finalState = store.getState()
// console.log(JSON.stringify(finalState))

export {store}
export const {addSong, removeSong} = songsSlice.actions
