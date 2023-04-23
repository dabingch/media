import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './slices/usersSlice'

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
})

// Export from index.js and fetchUsers.js
export * from './thunks/fetchUsers'
