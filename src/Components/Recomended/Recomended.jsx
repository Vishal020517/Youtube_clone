import React, { useEffect, useState } from 'react'
import './Recomended.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { API_KEY,value_converter} from '../../Data'
import {Link} from 'react-router-dom'
const Recomended = ({categoryId}) => {
    const [apiData,setApiData]=useState([])
    const fetchData=async()=>{
        const relatedVideo_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=50&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(relatedVideo_url).then(res=>res.json()).then(data=>setApiData(data.items));
    }
    useEffect(()=>{
        fetchData();
    },[])
  return (
    <>
        <div className='recomended'>
            {
                apiData.map((items,index)=>{
                    return(
                        <Link to={`/video/${items.snippet.categoryId}/${items.id}`}key={index}className='side-video-list'>
                         <img src={items.snippet.thumbnails.medium.url} alt=''/>
                         <div className='side-video-info'>
                          <h4>{items.snippet.title} </h4>
                          <p>{items.snippet.channelTitle}</p>
                          <p>{value_converter(items.statistics.viewCount)} views</p>
                          </div>
                         </Link>
                    )

                })
            }
            
         
        </div>
    </>
  )
}

export default Recomended