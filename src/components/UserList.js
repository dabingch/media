import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, addUser } from '../store'
import Button from './Button'
import Skeleton from './Skeleton'

function UserList() {
	const [isLoadingUsers, setIsLoadingUsers] = useState(false)
	const [loadingUsersError, setLoadingUsersError] = useState(null)
	const [isCreatingUser, setIsCreatingUser] = useState(false)
	const [creatingUserError, setCreatingUserError] = useState(null)
	const dispatch = useDispatch()
	const { isLoading, data, error } = useSelector((state) => {
		return state.users // { data: [], isLoading: false, error: null}
	})

	useEffect(() => {
		setIsLoadingUsers(true)
		dispatch(fetchUsers())
			.unwrap() // Extracts the fulfilled and rejected from the action
			.catch((err) => setLoadingUsersError(err))
			.finally(() => setIsLoadingUsers(false))
	}, [dispatch])

	const handleUserAdd = () => {
		setIsCreatingUser(true)
		dispatch(addUser())
			.unwrap()
			.catch((err) => setCreatingUserError(err))
			.finally(() => setIsCreatingUser(false))
	}

	if (isLoadingUsers) {
		return <Skeleton times={data.length} className='h-10 w-full' />
	}

	if (loadingUsersError) {
		return <div>Error fetching data...</div>
	}

	const renderedUsers = data.map((user) => {
		return (
			<div key={user.id} className='mb-2 border rounded'>
				<div className='flex p-2 justify-between items-center cursor-pointer'>
					{user.name}
				</div>
			</div>
		)
	})

	return (
		<div>
			<div className='flex flex-row justify-between m-3'>
				<h1 className='m-2 text-xl'>Users</h1>
				{isCreatingUser ? (
					'Creating user...'
				) : (
					<Button onClick={handleUserAdd}>+ Add User</Button>
				)}
				{creatingUserError && 'Error creating user....'}
			</div>
			{renderedUsers}
		</div>
	)
}

export default UserList
