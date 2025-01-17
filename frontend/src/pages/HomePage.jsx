import React from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';
import Sidebar from '../components/Sidebar';

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-full mx-auto my-5 overflow-x-hidden w-full">
      <Sidebar />
      <div className="flex-1">
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};

export default HomePage;
