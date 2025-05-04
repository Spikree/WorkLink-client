import { useEffect, useState, useRef } from "react";
import { Send, Menu, Phone, Video, MoreVertical } from "lucide-react";
import { useParams } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
// import { socket } from '../socket/socket'

const ChatPage = () => {
  const { messages, isFetchingMessages, sendMessage, getMessages } =
    useChatStore();
  const { id: chatId } = useParams<{ id: string }>();
  const [message, setMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendText = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !chatId) return;
    sendMessage(chatId, message);
    setMessage("");
  };

  useEffect(() => {
    if (chatId) {
      getMessages(chatId);
    }
  }, [getMessages, chatId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col sm:h-[94vh] h-[90vh] bg-gray-100">
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
      <div className="h-[75vh] overflow-y-auto p-4" ref={chatContainerRef}>
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {isFetchingMessages ? (
            <div className="text-center text-gray-500">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500">No messages yet</div>
          ) : (
            messages.map((msg, index) => {
              const isSentToChatId = msg.receiverId === chatId;

              const messageDate = new Date(msg.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              );

              const prevMessage = index > 0 ? messages[index - 1] : null;
              const prevMessageDate = prevMessage
                ? new Date(prevMessage.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : null;

              const showDateSeparator =
                index === 0 || messageDate !== prevMessageDate;

              return (
                <div key={msg._id}>
                  {showDateSeparator && (
                    <div className="text-center my-2">
                      <span className="inline-block bg-gray-200 text-gray-600 text-sm px-4 py-1 rounded-full">
                        {messageDate}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex ${
                      isSentToChatId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                        isSentToChatId
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t">
        <div className="max-w-4xl mx-auto p-4">
          <form className="flex items-center gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={(e) => {
                sendText(e);
              }}
              className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
