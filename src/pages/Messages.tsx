
import { Layout } from "@/components/layout/Layout";
import { useState, useRef, useEffect } from "react";
import { messagesData, usersData, getUserById } from "@/data/mockData";
import { MessageItem } from "@/components/messages/MessageItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

// Mock current user
const CURRENT_USER_ID = "u1";

const Messages = () => {
  // Group messages by conversation
  const [conversations, setConversations] = useState<Record<string, typeof messagesData>>({});
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversations
  useEffect(() => {
    const convos: Record<string, typeof messagesData> = {};
    
    messagesData.forEach(message => {
      const otherUserId = message.senderId === CURRENT_USER_ID 
        ? message.receiverId 
        : message.senderId;
        
      if (!convos[otherUserId]) {
        convos[otherUserId] = [];
      }
      
      convos[otherUserId].push(message);
    });
    
    // Sort messages by timestamp
    Object.keys(convos).forEach(userId => {
      convos[userId].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    });
    
    setConversations(convos);
    
    // Set active conversation to the first one if any
    if (Object.keys(convos).length > 0) {
      setActiveConversation(Object.keys(convos)[0]);
    }
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation, conversations]);
  
  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return;
    
    const newMessage = {
      id: `m${Date.now()}`,
      senderId: CURRENT_USER_ID,
      receiverId: activeConversation,
      content: messageText,
      timestamp: new Date().toISOString(),
      read: true
    };
    
    // Update conversations
    setConversations(prev => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] || []), newMessage]
    }));
    
    // Clear input
    setMessageText("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        
        {Object.keys(conversations).length > 0 ? (
          <div className="bg-background border rounded-lg grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-hidden min-h-[70vh]">
            {/* Conversation list */}
            <div className="border-r">
              <div className="p-4 font-medium border-b">Conversations</div>
              <div className="overflow-y-auto max-h-[70vh]">
                {Object.keys(conversations).map(userId => {
                  const user = getUserById(userId);
                  if (!user) return null;
                  
                  return (
                    <button
                      key={userId}
                      className={`w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${activeConversation === userId ? 'bg-accent/50' : ''}`}
                      onClick={() => setActiveConversation(userId)}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[150px]">
                          {conversations[userId][conversations[userId].length - 1]?.content}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Messages */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col">
              {activeConversation ? (
                <>
                  {/* Header */}
                  <div className="p-4 font-medium border-b flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img 
                        src={getUserById(activeConversation)?.avatar} 
                        alt={getUserById(activeConversation)?.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{getUserById(activeConversation)?.name}</span>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {conversations[activeConversation]?.map(message => (
                      <MessageItem 
                        key={message.id} 
                        message={message} 
                        currentUserId={CURRENT_USER_ID} 
                      />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Input */}
                  <div className="p-4 border-t">
                    <form 
                      className="flex gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                    >
                      <Input 
                        placeholder="Type your message..." 
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-grow"
                      />
                      <Button type="submit" disabled={!messageText.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <h3 className="text-xl font-semibold mb-2">No conversation selected</h3>
                  <p className="text-muted-foreground">
                    Select a conversation from the list to start messaging.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground mb-6">
              Start connecting with potential teammates to begin messaging.
            </p>
            <Button asChild>
              <a href="/browse">Find Teammates</a>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Messages;
