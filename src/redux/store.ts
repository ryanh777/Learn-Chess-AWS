import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import boardReducer from "./slices/board"
import moveReducer from "./slices/moves"

const store = configureStore({
    reducer: {
      user: userReducer,
      board: boardReducer,
      moves: moveReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;