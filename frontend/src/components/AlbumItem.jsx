import React from 'react'

const AlbumItem = ({image,name,desc,id}) => {
  return (
    <div className='min-w-[180px] p-2 px-2 rounded cursor-pointer hover:bg-accent hover:text-white'>
        <img className='rounded w-45 h-45' src={image}/>
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-neutral-400 text-sm'>{desc}</p>
    </div>
  )
}

export default AlbumItem;