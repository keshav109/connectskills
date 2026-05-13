import React, { useState } from 'react';
import { Search, Send, Paperclip, Phone, Video, MoreVertical, User } from 'lucide-react';

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Customer',
      lastMessage: 'Thanks for the quick repair! Everything works perfectly now.',
      timestamp: '2 hours ago',
      unread: 0,
      avatar: 'SJ',
      online: true,
      jobTitle: 'Kitchen Sink Repair'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Customer',
      lastMessage: 'When can you start the bathroom installation?',
      timestamp: '1 day ago',
      unread: 2,
      avatar: 'MC',
      online: false,
      jobTitle: 'Bathroom Pipe Installation'
    },
    {
      id: '3',
      name: 'Emma Davis',
      role: 'Customer',
      lastMessage: 'Perfect! The toilet is working great now.',
      timestamp: '3 days ago',
      unread: 0,
      avatar: 'ED',
      online: true,
      jobTitle: 'Toilet Repair'
    },
    {
      id: '4',
      name: 'David Wilson',
      role: 'Customer',
      lastMessage: 'Could you send me a quote for the faucet replacement?',
      timestamp: '1 week ago',
      unread: 1,
      avatar: 'DW',
      online: false,
      jobTitle: 'Faucet Replacement'
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: '1',
      senderName: 'Sarah Johnson',
      content: 'Hi Mike! I have a kitchen sink that\'s been leaking for a few days. Could you take a look?',
      timestamp: '2024-02-10T09:30:00Z',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'You',
      content: 'Hi Sarah! I\'d be happy to help. Can you describe the leak? Is it from the faucet or under the sink?',
      timestamp: '2024-02-10T09:45:00Z',
      isOwn: true
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Sarah Johnson',
      content: 'It\'s dripping from the faucet handle. It\'s gotten worse over the past few days.',
      timestamp: '2024-02-10T10:00:00Z',
      isOwn: false
    },
    {
      id: '4',
      senderId: 'me',
      senderName: 'You',
      content: 'That sounds like a worn gasket or O-ring. I can fix that for you. When would be a good time to come by?',
      timestamp: '2024-02-10T10:15:00Z',
      isOwn: true
    },
    {
      id: '5',
      senderId: '1',
      senderName: 'Sarah Johnson',
      content: 'How about tomorrow afternoon? I\'ll be home after 2 PM.',
      timestamp: '2024-02-10T10:30:00Z',
      isOwn: false
    },
    {
      id: '6',
      senderId: 'me',
      senderName: 'You',
      content: 'Perfect! I\'ll be there around 2:30 PM. The repair should take about an hour and cost around $175.',
      timestamp: '2024-02-10T10:45:00Z',
      isOwn: true
    },
    {
      id: '7',
      senderId: '1',
      senderName: 'Sarah Johnson',
      content: 'Thanks for the quick repair! Everything works perfectly now.',
      timestamp: '2024-02-12T16:30:00Z',
      isOwn: false
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Mock sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm border border-gray-100 flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedChat(conversation.id)}
              className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                selectedChat === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">{conversation.avatar}</span>
                  </div>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{conversation.jobTitle}</p>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {conversation.unread}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">{selectedConversation.avatar}</span>
                  </div>
                  {selectedConversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedConversation.name}</h3>
                  <p className="text-sm text-gray-600">{selectedConversation.jobTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Phone size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Video size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {!message.isOwn && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 order-0">
                      <User size={16} className="text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <Paperclip size={18} />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;