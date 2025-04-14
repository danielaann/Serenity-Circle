import React, { useContext } from 'react'
import { PlayerContext } from './PlayerContext';

const SongItem = ({name,image,desc,id, category}) => {

  const {playWithId} = useContext(PlayerContext);

  const handleClick = () => {
    playWithId(id, category); // pass both
  };


  return (
    <div onClick={handleClick} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-secondary-content'>
        <img src={image} className='w-64 h-44'/>
        <p className='font-bold mt-2 mb-1 text-slate-400 hover:text-white'>{name}</p>
        <p className='text-neutral-600 text-sm'>{desc}</p>
    </div>
  )
}

export default SongItem;