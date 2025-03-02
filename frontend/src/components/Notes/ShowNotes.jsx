import React, { useEffect, useState } from 'react';
import TopNav from './TopNav';
import NoteCard from './NoteCard';
import { Plus } from 'lucide-react';
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { axiosInstance } from "../../lib/axios";
import NoteToast from './noteToast';

function ShowNotes() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [isSearch, setIsSearch] = useState(false);
  const [allNotes, setAllNotes] = useState([]);

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    message: "",
  });

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    })
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: ""
    })
  };

  const closeModal = () => {
    console.log("Closing modal in parent component");
    setOpenAddEditModal((prev) => ({ ...prev, isShown: false })); // Ensure re-render
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  // Function to handle note edit
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

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

  // Function to delete note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete('/notes/delete-note/' + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        await getAllNotes();
      } else {
        console.log("No note data received");
      }
    } catch (error) {
      console.error("API call failed:", error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  //Function to Search Note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/notes/search-note", {
        params: { query },
      });

      if (response.data && !response.data.error) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      } else {
        console.log("No note data received");
      }
    } catch (error) {

    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

  // Optimistic UI update
  setAllNotes((prevNotes) =>
    prevNotes.map((note) =>
      note._id === noteId ? { ...note, isPinned: !note.isPinned } : note
    )
  );

  try {
    const response = await axiosInstance.put(`/notes/update-note-pinned/${noteId}`, {
      isPinned: !noteData.isPinned,
    });

    if (response.data && response.data.note) {
      showToastMessage("Note Updated Successfully", "update");
      await getAllNotes(); 
    } else {
      console.log("No note data received");
    }
  } catch (error) {
    console.error("Note Pin failed:", error);
    showToastMessage("Failed to update note", "error");

    // Rollback UI change if API call fails
    setAllNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === noteId ? { ...note, isPinned: noteData.isPinned } : note
      )
    );
  }
  }

  // Fetch notes on component mount & when modal closes
  useEffect(() => {
    getAllNotes();
  }, [openAddEditModal.isShown]); // Ensures data updates after modal closes

  return (
    <>
      <TopNav onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

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
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() =>updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <div>
            <p className="text-center text-gray-500 mt-8">No notes available. Click the + button to add one!</p>
          </div>
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
            showToastMessage={showToastMessage}
          />
        )}
      </Modal>

      <NoteToast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
}

export default ShowNotes;
