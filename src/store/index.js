import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './slices/usersSlice'

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
})

// Export from index.js and fetchUsers.js
// so that we can access from store
export * from './thunks/fetchUsers'
export * from './thunks/addUser'
