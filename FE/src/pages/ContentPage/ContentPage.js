import React from 'react'
import { useParams } from 'react-router'

const ContentPage = () => {
  const {id} = useParams();
  return (
    <div>{id}</div>
  )
}

export default ContentPage