import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Skeleton from './Skeleton'
import Button from './Button'
import AlbumListItem from './AlbumListItem'

function AlbumsList({ user }) {
	// * isLoading: true first time you make the request
	// * isFetching: true every time you make the request
	const { data, error, isFetching } = useFetchAlbumsQuery(user)
	const [addAlbum, results] = useAddAlbumMutation(user)

	const handleAddAlbum = () => {
		addAlbum(user)
	}

	let content
	if (isFetching) {
		content = <Skeleton className='h-10 w-full' times={3} />
	} else if (error) {
		content = <div>Error fetching albums...</div>
	} else {
		content = data.map((album) => {
			return <AlbumListItem key={album.id} album={album} />
		})
	}

	return (
		<div>
			<div className='m-2 flex flex-row items-center justify-between'>
				<h3 className='text-lg font-bold'>Albums for {user.name}</h3>
				<Button loading={results.isLoading} onClick={handleAddAlbum}>
					+ Add Album
				</Button>
			</div>
			<div>{content}</div>
		</div>
	)
}

export default AlbumsList
