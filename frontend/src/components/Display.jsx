import React from 'react';
import {albumsData} from '../assets/assets';
import { songsData } from '../assets/assets';
import { assets } from '../assets/assets';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
  
  function Display() {
    return (<>
      <div className='w-full m-2 px-6 py-3 rounded text-secondary overflow-auto lg:w-[99%] lg:my-1.5'>
        <div className='w-full flex justify-between items-center font-semibold'>
            <div className='flex items-center gap-2'>
                <img className='w-8 bg-primary p-2 rounded-2xl cursor-pointer' src={assets.arrow_left}/>
                <img className='w-8 bg-primary p-2 rounded-2xl cursor-pointer' src={assets.arrow_right}/>
                <h1 className='font-bold text-2xl'>Soundscapes</h1>
            </div>
        </div>
        <div className='flex items-center gap-2 mt-3'>
            <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
            <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Breathing</p>
            <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Meditate</p>
        </div>
      </div>
      <div className='mb-4'>
        <h1 className=' ml-2 my-5 font-bold text-xl'>Choose your comfort zone</h1>
        <div className='flex overflow-auto'>
        {albumsData.map((item,index)=>(
            <AlbumItem key={index} 
                        name={item.name} 
                        desc={item.desc} 
                        id={item.id}
                        image={item.image}
            />))}
        </div>
      </div>

      <div className='mb-4'>
        <h1 className=' ml-2 my-5 font-bold text-xl'>Choose your comfort zone</h1>
        <div className='flex overflow-auto'>
        {songsData.map((item,index)=>(
          <SongItem key={index}
                    name={item.name}
                    desc={item.desc}
                    id={item.id}
                    image={item.image}
          />))}
        </div>
      </div>
      </>
    )
  }
  
  export default Display;