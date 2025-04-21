
// Skill types and data
export type SkillCategory = 'frontend' | 'backend' | 'design' | 'mobile' | 'devops' | 'ai' | 'blockchain' | 'other';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}

// User type
export interface User {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  skills: string[]; // Skill IDs
  location: {
    city: string;
    country: string;
    remote: boolean;
  };
  hackathons: string[]; // Hackathon IDs
  contactEmail?: string;
}

// Hackathon type
export interface Hackathon {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isOnline: boolean;
  url: string;
  image?: string;
}

// Message type
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// Filter types
export interface UserFilters {
  skills: string[];
  location: {
    city: string;
    country: string;
    remoteOnly: boolean;
  };
  hackathons: string[];
  search: string;
}
