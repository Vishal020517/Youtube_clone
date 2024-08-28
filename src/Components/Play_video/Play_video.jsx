import React, { useEffect, useState,map } from 'react'
import './Play_video.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import share from '../../assets/share.png'
import jack from '../../assets/jack.png'
import save from '../../assets/save.png'
import dislike from '../../assets/dislike.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY,value_converter } from '../../Data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const Play_video = () => {
    const {videoId}=useParams();
    const [commentData,setCommentData]=useState([])
    const [apiData,setApiData]=useState(null)
    const [channelData,setChannelData]=useState(null)
    const fetchVideoData=async()=>{
      
        const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]));
     
    }
    const fetchOtherData=async()=>{
        const channelData_url=` https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]));
        const commentData_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
        await fetch(commentData_url).then(res=>res.json()).then(data=>setCommentData(data.items));

    }
    
    useEffect(()=>{
        fetchVideoData();
        console.log(apiData)
    },[videoId])
    useEffect(()=>{
        fetchOtherData();
        
    },[apiData] )
    
  return (
    <div className='play-video'>
       { /* <video src={video1} controls autoPlay muted></video>*/}
       <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
        
        <div className='video-play-info'>
            <p>{apiData?value_converter(apiData.statistics.viewCount):"25K"} views &bull;{moment(apiData?.snippet.publishedAt).fromNow()} </p>
            <div>
                <span>
                    <img src={like}/>
                    {value_converter(apiData?.statistics.likeCount)}
                </span>
                <span>
                    <img src={dislike}/>
                    2
                </span>
                <span>
                    <img src={share}/>
                    share
                </span>
                <span>
                    <img src={save}/>
                    Download
                </span>
            </div>
        </div>
        <hr/>
        <div className='publisher'>
            <img src={channelData?.snippet.thumbnails.default.url} alt=''/>
            <div>
                <p>{apiData?.snippet.channelTitle}</p>
                <span>{value_converter(channelData?.statistics.subscriberCount)} Subcribers</span>
            </div>
          
                <button>Subscribe</button>
       </div>
       <div className='video-description'>
            <p>{apiData?.snippet.description}</p>
            <p>Subscibe to DingDong to watch more tutorials</p>
            <hr/>
            <h3>{value_converter(apiData?.statistics.commentCount)}comments</h3>
            {commentData.map((items,index)=>{
                return(
                    <div key={index} className='comment'>
                    <img src={items.snippet.topLevelComment.snippet.authorProfileImageUrl} alt=''/>
                    <div>
                        <h3>{items.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
                        <p>{items.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className='comment-action'>
                            <img src={like} alt=''/> 
                            <span>{items.snippet.topLevelComment.snippet.likeCount}</span>
                            <img src={dislike} alt=''/>
    
    
                        </div>
                    </div>
                </div>
                )

            })}

          

       </div>
        

    </div>
  )
}

export default Play_video