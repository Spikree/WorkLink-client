import { useEffect, useState, useRef } from "react";
import {
  Send,
  Loader2,
  MessageCircle,
  ArrowLeft,
  Camera,
  X,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { socket } from "../socket/socket";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const {
    messages,
    isFetchingMessages,
    sendMessage,
    getMessages,
    setMessages,
  } = useChatStore();
  const { getUserDetails, chatuserDetails, authUser } = useAuthStore();
  const { id: chatId } = useParams<{ id: string }>();
  const [message, setMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingUser, setTypingUser] = useState(null);
  const [isUserActive, setIsUserActive] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("user_role");

  const goToChatPage = () => {
    if (role === "freelancer") {
      navigate("/chat");
    } else if (role === "employer") {
      navigate("/chatEmp");
    }
  };

  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const userId = authUser?._id;
  const actualChatId =
    userId && chatId ? [userId, chatId].sort().join("_") : "";

  const handleTyping = () => {
    if (!isTyping && actualChatId) {
      socket.emit("typing", {
        senderId: userId,
        receiverId: chatId,
        chatId: actualChatId,
      });
      setIsTyping(true);
    }

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    typingTimerRef.current = setTimeout(() => {
      if (actualChatId) {
        socket.emit("stopTyping", {
          senderId: userId,
          receiverId: chatId,
          chatId: actualChatId,
        });
        setIsTyping(false);
      }
    }, 200);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    if (userId) {
      socket.auth = { userId };
      socket.emit("join", userId);

      if (actualChatId) {
        socket.emit("joinChat", actualChatId);
      }

      socket.emit("setActiveStatus", { userId });
    }

    socket.off("newMessage");
    socket.off("userActiveStatus");
    socket.off("userTyping");

    socket.on("newMessage", (newMsg) => {
      if (
        (newMsg.senderId === userId && newMsg.receiverId === chatId) ||
        (newMsg.senderId === chatId && newMsg.receiverId === userId)
      ) {
        setMessages(newMsg);
      }
    });

    socket.on("userActiveStatus", (data) => {
      if (data.userId === chatId) {
        setIsUserActive(data.isActive);
      }
    });

    socket.on("userTyping", (data) => {
      if (data.chatId === actualChatId && data.senderId !== userId) {
        setTypingUser(data.isTyping ? data.senderId : null);
      }
    });

    return () => {
      socket.off("newMessage");
      socket.off("userActiveStatus");
      socket.off("userTyping");

      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, [actualChatId, userId, chatId, setMessages]);

  const sendText = (e: React.FormEvent) => {
    e.preventDefault();

    if ((!message.trim() && !selectedImage) || !chatId) return;
    
    sendMessage(chatId, message, selectedImage as File);
    
    setMessage("");
    removeSelectedImage();
  };

  useEffect(() => {
    if (chatId) {
      getMessages(chatId);
      getUserDetails(chatId);
    }
  }, [getMessages, chatId, getUserDetails]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col sm:h-[94vh] h-[90vh] bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="md:hidden">
                <ArrowLeft
                  onClick={goToChatPage}
                  className="w-5 h-5 text-gray-600 cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-3">
                <div onClick={() => navigate(`/userProfile/${chatuserDetails?._id}`)} className="relative">
                  <img
                    src={
                      chatuserDetails?.profile?.profilePicture ||
                      `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  {isUserActive && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {chatuserDetails?.profile?.name || "User"}
                  </h2>
                  <p
                    className={`text-xs ${
                      isUserActive ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    {isUserActive ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth"
        ref={chatContainerRef}
        style={{
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {isFetchingMessages ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Loading messages
                </h3>
                <p className="text-sm text-gray-500">
                  Please wait while we fetch your conversation...
                </p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <MessageCircle className="w-14 h-14 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No messages yet
                </h3>
                <p className="text-gray-500 mb-4 text-sm">
                  Start the conversation by sending your first message!
                </p>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full" />
              </div>
            </div>
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

              // Check if messages are from the same sender and within 2 minutes
              const isContinuousMessage =
                index > 0 &&
                prevMessage &&
                prevMessage.senderId === msg.senderId &&
                new Date(msg.createdAt).getTime() -
                  new Date(prevMessage.createdAt).getTime() <
                  2 * 60 * 1000;

              return (
                <div key={msg._id || index} className="animate-fadeIn">
                  {showDateSeparator && (
                    <div className="text-center my-3">
                      <span className="inline-block bg-white bg-opacity-80 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">
                        {messageDate}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex ${
                      isSentToChatId ? "justify-end" : "justify-start"
                    } ${!isContinuousMessage ? "mt-2" : "mt-1"}`}
                  >
                    <div
                      className={`p-3 rounded-2xl ${
                        isSentToChatId
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white text-gray-800 shadow-sm rounded-bl-none"
                      } ${
                        isContinuousMessage
                          ? isSentToChatId
                            ? "rounded-tr-none"
                            : "rounded-tl-none"
                          : ""
                      }`}
                    >
                      {msg.imageUrl && (
                        <div className="mb-2">
                          <img
                            src={msg.imageUrl}
                            alt="Shared image"
                            className="max-w-xs max-h-64 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => window.open(msg.imageUrl, '_blank')}
                          />
                        </div>
                      )}
                      {msg.text && <p className="text-sm">{msg.text}</p>}
                      <p
                        className={`text-xs mt-1 ${
                          isSentToChatId ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {formatTime(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Typing Indicator */}
      {typingUser && (
        <div className="flex px-4 mb-2">
          <div className="flex items-center space-x-1 p-2 bg-white rounded-full shadow-sm w-fit">
            <motion.div
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, -3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, -3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.div
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, -3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </div>
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div className="bg-white border-t px-4 py-3">
          <div className="max-w-2xl mx-auto">
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-32 max-h-32 rounded-lg object-cover"
              />
              <button
                onClick={removeSelectedImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-white border-t sticky bottom-0">
        <div className="max-w-2xl mx-auto p-3">
          <form className="flex items-center gap-2" onSubmit={sendText}>
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
              }}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <Camera className="w-4 h-4" />
            </button>
            <button
              type="submit"
              disabled={!message.trim() && !selectedImage}
              className={`${
                message.trim() || selectedImage ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400"
              } text-white rounded-full p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;