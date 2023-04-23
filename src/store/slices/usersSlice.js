import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../thunks/fetchUsers'

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		data: [],
		isLoading: false,
		error: null,
	},
	extraReducers(builder) {
		builder.addCase(fetchUsers.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.isLoading = false
			// * AsyncThunk automatically dispatches actions and returns payload
			state.data = action.payload
		})
		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.isLoading = false
			// * AsyncThunk automatically dispatches actions and returns error
			state.error = action.error
		})
	},
})

export const usersReducer = usersSlice.reducer
