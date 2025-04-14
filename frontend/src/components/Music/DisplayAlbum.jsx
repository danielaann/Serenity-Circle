import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import {  assets, songsData } from '../../assets/assets';
import { PlayerContext } from './PlayerContext';


const DisplayAlbum = () => {

    const {id}= useParams();
    const albumData = albumsData[id];
    const {playWithId} = useContext(PlayerContext);
    const {track, seekBar, seekBg, playStatus, play, pause, time, audioRef}= useContext(PlayerContext);

  return (
    <>
    <div className='mt-8 flex gap-8 flex-col md:flex-row md:items-end'>
        <img src={albumData.image} className='w-48 rounded'/>
        <div className='flex flex-col'>
            <p>Playlist</p>
            <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
            <h4>{albumData.desc}</h4>
            <p className='mt-1'>
                <img src={assets.spotify_logo} className='inline-block w-5'/>
                <b>Spotify  </b>
                • 1,323,154 likes 
                • <b>50 songs,</b>
                about 2 hr 30 mins
            </p>
        </div>
    </div>

    <div className='w-[85%] grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-4 text-[#a7a7a7]'>
        <p><b className='mr-4'>#</b>Title</p>
        <p>Album</p>
        <p className='hidden sm:block'>Date Added</p>
        <img src={assets.clock_icon} className='m-auto w-4'/>
    </div>
    <hr/>
    {
        songsData.map((item,index)=>(
            <div onClick={()=> playWithId(item.id)}  key={index} className='w-[85%] grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                <p className='text-accent'>
                    <b className='mr-4 text-[#a7a7a7]'>{index+1}</b>
                    <img src={item.image} className='inline w-10 mr-5' />
                    {item.name}
                </p>
                <p className='text-[15px]'>
                    {albumData.name}
                </p>
                <p className='text-[15px] hidden sm:block'>5 days ago</p>
                <p className='text-[15px] text-center'>{item.duration}</p>
            </div>
        ))
    }
    
    <div className='h-[8%] bg-gray-500 flex justify-between items-center px-4 w-[80%] fixed bottom-0 '>
           <div className='hidden lg:flex items-center gap-4 text-black'>
            <img className='w-10' src={track.image} />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0,12)}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4 mt-2'>
                    <img src={assets.shuffle_icon} className='w-4 cursor-pointer'/>
                    <img src={assets.prev_icon} className='w-4 cursor-pointer'/>
                    { playStatus
                    ? <img src={assets.pause_icon}className='w-4 cursor-pointer' onClick={pause}/>
                    : <img src={assets.play_icon} className='w-4 cursor-pointer' onClick={play}/>
                    }
                    <img src={assets.next_icon} className='w-4 cursor-pointer'/>
                    <img src={assets.loop_icon} className='w-4 cursor-pointer'/>
                </div>
                <div className='flex items-center gap-5'>
                    <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                    <div ref={seekBg} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-10 bg-accent rounded-full'></hr>
                    </div>
                    <p>{time.totalTime.minute}:{time.totalTime.second}</p>
                </div>
            </div>
            <div className='hidden lg:flex items-center gap-2 opacity-75'>
                <img className='w-4' src={assets.plays_icon}/>
                <img className='w-4' src={assets.mic_icon}/>
                <img className='w-4' src={assets.queue_icon}/>
                <img className='w-4' src={assets.speaker_icon}/>
                <img className='w-4' src={assets.volume_icon}/>
                <div className='w-20 bg-primary opacity-60 h-1 rounded'>
    
                </div>
                <img className='w-4' src={assets.mini_player_icon}/>
                <img className='w-4' src={assets.zoom_icon}/>
            </div>
        </div>
        <audio ref={audioRef} src={track.file} preload='auto'></audio>
    </>
  )
}

export default DisplayAlbum;