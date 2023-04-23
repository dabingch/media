import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchUsers = createAsyncThunk('users/fetch', async () => {
	const { data } = await axios.get('http://localhost:3005/users')

	await pause(1000)

	return data
})

// ! Dev only!!!
const pause = (duration) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration)
	})
}

export { fetchUsers }
