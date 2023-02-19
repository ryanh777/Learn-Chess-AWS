import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/login";
import boardReducer from "./slices/board"

const store = configureStore({
    reducer: {
      login: loginReducer,
      board: boardReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;