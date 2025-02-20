import React, { useContext } from 'react';
import { assets } from "../../assets/assets";
import Display from '../Display';
import { PlayerContext } from './PlayerContext';

function Player() {

    const {track, seekBar, seekBg, playStatus, play, pause, time}= useContext(PlayerContext);

  return (<>
    <div className='w-[80%] overflow-auto scrollbar-hide'>
        <Display/>
    </div>

    <div className='h-[10%] bg-gray-500 flex justify-between items-center px-4 w-[80%]'>
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
    </>
  )
}

export default Player;