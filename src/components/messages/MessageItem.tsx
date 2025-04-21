
import { Message } from "@/types";
import { getUserById } from "@/data/mockData";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface MessageItemProps {
  message: Message;
  currentUserId: string;
}

export function MessageItem({ message, currentUserId }: MessageItemProps) {
  const isCurrentUser = message.senderId === currentUserId;
  const otherUser = getUserById(isCurrentUser ? message.receiverId : message.senderId);
  
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isCurrentUser ? "flex-row-reverse" : "flex-row"
    )}>
      <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
        {isCurrentUser ? (
          <div className="h-full w-full bg-primary flex items-center justify-center text-white text-xs font-medium">
            You
          </div>
        ) : (
          <img 
            src={otherUser?.avatar} 
            alt={otherUser?.name || "User"} 
            className="h-full w-full object-cover"
          />
        )}
      </div>
      
      <div className={cn(
        "px-4 py-2 rounded-lg max-w-[80%]",
        isCurrentUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted text-muted-foreground"
      )}>
        <div className="flex justify-between items-center gap-4 mb-1">
          <span className={cn(
            "font-medium text-sm",
            isCurrentUser ? "text-primary-foreground" : "text-foreground"
          )}>
            {isCurrentUser ? 'You' : otherUser?.name || 'Unknown User'}
          </span>
          <span className="text-xs opacity-70">
            {format(new Date(message.timestamp), "HH:mm")}
          </span>
        </div>
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}
