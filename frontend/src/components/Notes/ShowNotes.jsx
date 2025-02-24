import React, { useState } from 'react'
import TopNav from './TopNav';
import NoteCard from './NoteCard';
import { Plus } from 'lucide-react';
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";

function ShowNotes() {

  const [openAddEditModal, setOpenAddEditModal]=useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
    <TopNav/>

    <div className='container mx-auto'>
      <div className='grid grid-cols-3 gap-4 mt-8  w-[85%]'>
      <NoteCard title='heloo bitch'
         date='1-2-3'
         content='Metting is at 302wneqgd6gejefbish'
         tags='Meeting'
         isPinned={true}
         onEdit={()=>{}}
         onDelete={()=>{}}
         onPinNote={()=>{}}
         />

      </div>
    </div>

    <button 
      onClick={() => {
        setOpenAddEditModal({ isShown : true, type: "add", data: null});
      }}
      className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-400 hover:bg-blue-600 absolute right-10 bottom-10'
    >
      <Plus className='text-[32px] text-white'/>
    </button>

    <Modal 
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=>{}}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
      }}
      contentLabel=""
      className=" w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-36 p-5 overflow-auto"
    >

    <AddEditNotes
      type={openAddEditModal.type}
      noteData={openAddEditModal.data}
      onClose={()=>{
        setOpenAddEditModal({isShown: false, type: 'add', data: null });
      }}
    />

    </Modal>    
    </>
  )
}

export default ShowNotes;