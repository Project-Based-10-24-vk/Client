import { useEffect, useState } from 'react'

export const useCreateImgUrl = () => {
  const [urls, setUrls] = useState([])

  const createUrl = (files) => {
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setUrls(imageUrls)
  }

  useEffect(() => {
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [urls])

  return { urls, createUrl }
}
