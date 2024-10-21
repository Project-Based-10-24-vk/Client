import { useState } from 'react'

const PhotoAddMock = ({ style }) => {
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const handleUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 10) {
        setError('Wrong file size')
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <div>
      <label htmlFor='file-uploader'>Upload file:</label>
      <input id='file-uploader' onChange={handleUpload} type='file' />
      {error && <p>{error}</p>}
      {image && <img alt='my photo' src={image} style={style} />}
    </div>
  )
}

export default PhotoAddMock
