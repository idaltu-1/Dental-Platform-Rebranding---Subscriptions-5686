import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSend, FiPaperclip, FiPhone, FiVideo, FiMoreVertical, FiSearch, FiUser } = FiIcons;

function ChatScreen() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const chats = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      role: 'Endodontist',
      avatar: 'SW',
      lastMessage: 'The patient is ready for the root canal procedure',
      timestamp: '2:30 PM',
      unread: 2,
      online: true,
      messages: [
        {
          id: 1,
          sender: 'Dr. Sarah Wilson',
          content: 'Hi! I wanted to discuss the referral for John Smith.',
          timestamp: '2:25 PM',
          isOwn: false
        },
        {
          id: 2,
          sender: 'You',
          content: 'Yes, I reviewed the X-rays. The patient needs immediate attention.',
          timestamp: '2:27 PM',
          isOwn: true
        },
        {
          id: 3,
          sender: 'Dr. Sarah Wilson',
          content: 'The patient is ready for the root canal procedure',
          timestamp: '2:30 PM',
          isOwn: false
        }
      ]
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      role: 'Oral Surgeon',
      avatar: 'MC',
      lastMessage: 'Surgery scheduled for tomorrow at 9 AM',
      timestamp: '1:45 PM',
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          sender: 'Dr. Michael Chen',
          content: 'The wisdom tooth extraction went well.',
          timestamp: '1:40 PM',
          isOwn: false
        },
        {
          id: 2,
          sender: 'You',
          content: 'Great! What about the follow-up?',
          timestamp: '1:42 PM',
          isOwn: true
        },
        {
          id: 3,
          sender: 'Dr. Michael Chen',
          content: 'Surgery scheduled for tomorrow at 9 AM',
          timestamp: '1:45 PM',
          isOwn: false
        }
      ]
    },
    {
      id: 3,
      name: 'Admin Team',
      role: 'Administration',
      avatar: 'AT',
      lastMessage: 'Insurance verification completed',
      timestamp: '12:15 PM',
      unread: 1,
      online: true,
      messages: [
        {
          id: 1,
          sender: 'Admin Team',
          content: 'Insurance verification completed',
          timestamp: '12:15 PM',
          isOwn: false
        }
      ]
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedChat && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: selectedChat.messages.length + 1,
      sender: 'You',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    // Update the selected chat with the new message
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastMessage: message,
      timestamp: newMessage.timestamp
    };

    setSelectedChat(updatedChat);
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex"
      >
        {/* Chat List Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{chat.role}</p>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                  
                  {chat.unread > 0 && (
                    <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {selectedChat.avatar}
                      </div>
                      {selectedChat.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-600">{selectedChat.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <SafeIcon icon={FiPhone} />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <SafeIcon icon={FiVideo} />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <SafeIcon icon={FiMoreVertical} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedChat.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.isOwn
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.isOwn ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiPaperclip} />
                  </button>
                  
                  <div className="flex-1">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SafeIcon icon={FiSend} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <SafeIcon icon={FiUser} className="text-gray-300 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a contact to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ChatScreen;