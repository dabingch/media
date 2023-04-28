function PhotosListItem({ photo }) {
	return (
		<div>
			<img src={photo.url} alt='random pic' className='h-20 w-20' />
		</div>
	)
}

export default PhotosListItem
