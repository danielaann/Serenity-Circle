import React, { useState } from 'react'
import Searchbar from './Searchbar';

function TopNav ({onSearchNote, handleClearSearch}){
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch=()=>{
        if(searchQuery){
            onSearchNote(searchQuery);
        }
    }

    const onClearSearch =() =>{
        setSearchQuery("");
        handleClearSearch();
    }

  return (
    <div className='bg-secondary flex items-center justify-between px-6 py-2 drop-shadow w-[85%] mt-1'>
        <h2 className='text-xl font-medium text-black py-2'>Notes</h2>

        <Searchbar value={searchQuery}
            onChange={({target})=>{
                setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
        />
    </div>
  )
}

export default TopNav;