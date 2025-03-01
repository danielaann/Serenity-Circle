import React, { useEffect, useState } from 'react';
import TopNav from './TopNav';
import NoteCard from './NoteCard';
import { Plus } from 'lucide-react';
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { axiosInstance } from "../../lib/axios";

function ShowNotes() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const closeModal = () => {
    console.log("Closing modal in parent component");
    setOpenAddEditModal((prev) => ({ ...prev, isShown: false })); // Ensure re-render
  };

  const [allNotes, setAllNotes] = useState([]);

  // Function to fetch all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes/get-all-notes");
      if (response.data) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error.response?.data || error.message);
    }
  };

  // Fetch notes on component mount & when modal closes
  useEffect(() => {
    getAllNotes();
  }, [openAddEditModal.isShown]); // Ensures data updates after modal closes

  return (
    <>
      <TopNav />

      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8 w-[85%]">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => console.log(`Editing note ${item._id}`)}
                onDelete={() => console.log(`Deleting note ${item._id}`)}
                onPinNote={() => console.log(`Toggling pin for ${item._id}`)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">No notes available. Click the + button to add one!</p>
        )}
      </div>

      <button
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-400 hover:bg-blue-600 absolute right-10 bottom-10"
      >
        <Plus className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add/Edit Note"
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-36 p-5 overflow-auto"
      >
        {openAddEditModal.isShown && (
          <AddEditNotes
              type={openAddEditModal.type}
              noteData={openAddEditModal.data}
              onClose={closeModal} 
              getAllNotes={getAllNotes}
          />
        )}
      </Modal>
    </>
  );
}

export default ShowNotes;
