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
    setOpenAddEditModal((prev) => ({ ...prev, isShown: false }));
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

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
    }
  };

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
      console.error("Search failed:", error);
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

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

      setAllNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId ? { ...note, isPinned: noteData.isPinned } : note
        )
      );
    }
  };

  useEffect(() => {
    getAllNotes();
  }, [openAddEditModal.isShown]);

  // Guided Journal Prompts
  const guidedPrompts = {
    morning: {
      title: "Morning Reflection",
      prompts: [
        "What are you looking forward to today?",
        "How do you want to feel by the end of the day?",
        "What is one intention you want to set for yourself today?"
      ]
    },
    night: {
      title: "Evening Reflection",
      prompts: [
        "What went well today?",
        "What challenged you today?",
        "What is something you're grateful for?"
      ]
    }
  };

  const startGuidedJournal = (timeOfDay) => {
    const selected = guidedPrompts[timeOfDay];
    const combinedContent = selected.prompts.map((q, i) => `${i + 1}. ${q}\n\n`).join("");

    setOpenAddEditModal({
      isShown: true,
      type: "add",
      data: {
        title: selected.title,
        content: combinedContent,
        tags: ["guided", timeOfDay]
      }
    });
  };

  return (
    <>
      <TopNav onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className="container mx-auto w-[85%]">
      <div className="flex justify-between items-center w-[85%] mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Notes:</h2>

        <div className="flex items-center gap-4">
          <button
            onClick={() => startGuidedJournal("morning")}
            className="px-4 py-2 bg-yellow-200 hover:bg-yellow-400 rounded-lg text-sm font-semibold"
          >
            ☀️ Morning Journal
          </button>
          <button
            onClick={() => startGuidedJournal("night")}
            className="px-4 py-2 bg-blue-300 hover:bg-blue-500 rounded-lg text-sm font-semibold"
          >
            🌙 Night Journal
          </button>
        </div>
      </div>

        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-4 w-[85%]">
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
                onPinNote={() => updateIsPinned(item)}
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
