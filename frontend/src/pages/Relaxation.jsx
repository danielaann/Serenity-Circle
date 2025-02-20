import React, { useContext } from 'react';
import Player from '../components/Music/Player';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router-dom';
import { PlayerContext } from '../components/Music/PlayerContext';

function Relaxation() {

  const {audioRef,track} = useContext(PlayerContext);

  return (
    <div className='h-fit bg-base-100 w-[85%] mt-2'>
        <div className='h-[100%] flex'>
        </div>
        <Player/>
        <audio ref={audioRef} src={track.file} preload='auto'></audio>
    </div>
  )
}

export default Relaxation;