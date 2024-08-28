import React from 'react'
import './Video.css'
import Play_video from '../../Components/Play_video/Play_video'
import Recomended from '../../Components/Recomended/Recomended'
import { useParams } from 'react-router-dom'
const Video = () => {
  const {videoId,categoryId}=useParams()
  console.log(videoId, categoryId)
  return (
    <>
    <div className='play-container'>
      <Play_video videoId={videoId}/>
      <Recomended categoryId={categoryId}/>
    </div>
    </>
  )
}

export default Video