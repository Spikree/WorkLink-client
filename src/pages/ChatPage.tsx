import React, { useState } from 'react'
import { Send, Menu, Phone, Video, MoreVertical } from 'lucide-react'

const ChatPage = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey there! 👋', sender: 'them', time: '09:41' },
    { id: 2, text: 'Hi! How are you?', sender: 'me', time: '09:42' },
    { id: 3, text: 'I\'m doing great! Just working on some new projects.', sender: 'them', time: '09:45' },
    { id: 4, text: 'That sounds exciting! What kind of projects?', sender: 'me', time: '09:47' },
  ])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      }])
      setMessage('')
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 sm:mt-0 mt-0">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Menu className="w-6 h-6 text-gray-600 cursor-pointer md:hidden" />
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">Sarah Parker</h2>
                  <p className="text-sm text-green-500">Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-gray-600 cursor-pointer" />
              <Video className="w-5 h-5 text-gray-600 cursor-pointer" />
              <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  msg.sender === 'me'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                }`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t">
        <div className="max-w-4xl mx-auto p-4">
          <form onSubmit={handleSend} className="flex items-center gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatPage