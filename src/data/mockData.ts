
import { Hackathon, Skill, User, Message } from "@/types";

// Mock Skills
export const skillsData: Skill[] = [
  { id: "s1", name: "React", category: "frontend" },
  { id: "s2", name: "Vue.js", category: "frontend" },
  { id: "s3", name: "Angular", category: "frontend" },
  { id: "s4", name: "Node.js", category: "backend" },
  { id: "s5", name: "Django", category: "backend" },
  { id: "s6", name: "Flask", category: "backend" },
  { id: "s7", name: "UI Design", category: "design" },
  { id: "s8", name: "UX Design", category: "design" },
  { id: "s9", name: "Graphic Design", category: "design" },
  { id: "s10", name: "AWS", category: "devops" },
  { id: "s11", name: "Docker", category: "devops" },
  { id: "s12", name: "Kubernetes", category: "devops" },
  { id: "s13", name: "React Native", category: "mobile" },
  { id: "s14", name: "Flutter", category: "mobile" },
  { id: "s15", name: "Swift", category: "mobile" },
  { id: "s16", name: "PyTorch", category: "ai" },
  { id: "s17", name: "TensorFlow", category: "ai" },
  { id: "s18", name: "Solidity", category: "blockchain" },
  { id: "s19", name: "TypeScript", category: "frontend" },
  { id: "s20", name: "MongoDB", category: "backend" },
];

// Mock Hackathons
export const hackathonsData: Hackathon[] = [
  {
    id: "h1",
    name: "Global AI Hackathon",
    description: "Build innovative AI solutions to solve real-world problems.",
    startDate: "2025-05-15",
    endDate: "2025-05-17",
    location: "San Francisco, USA",
    isOnline: false,
    url: "https://example.com/ai-hackathon",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "h2",
    name: "Web3 Builders",
    description: "Create decentralized applications on blockchain technology.",
    startDate: "2025-06-10",
    endDate: "2025-06-12",
    location: "Berlin, Germany",
    isOnline: false,
    url: "https://example.com/web3-hackathon",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2068&auto=format&fit=crop"
  },
  {
    id: "h3",
    name: "Remote Hackfest",
    description: "Build any project you want, completely online.",
    startDate: "2025-07-01",
    endDate: "2025-07-03",
    location: "Online",
    isOnline: true,
    url: "https://example.com/remote-hackfest",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "h4",
    name: "Health Tech Challenge",
    description: "Develop innovative solutions for healthcare challenges.",
    startDate: "2025-08-05",
    endDate: "2025-08-07",
    location: "London, UK",
    isOnline: false,
    url: "https://example.com/health-hackathon",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "h5",
    name: "Climate Action Hackathon",
    description: "Create solutions to address climate change issues.",
    startDate: "2025-09-15",
    endDate: "2025-09-17",
    location: "Tokyo, Japan",
    isOnline: false,
    url: "https://example.com/climate-hackathon",
    image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "h6",
    name: "EdTech Innovation",
    description: "Develop tools and platforms to improve education.",
    startDate: "2025-10-10",
    endDate: "2025-10-12",
    location: "Online",
    isOnline: true,
    url: "https://example.com/edtech-hackathon",
    image: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=2076&auto=format&fit=crop"
  }
];

// Mock Users
export const usersData: User[] = [
  {
    id: "u1",
    name: "Alex Johnson",
    bio: "Full-stack developer with 5+ years of experience. Love building impactful products.",
    avatar: "https://i.pravatar.cc/150?img=1",
    skills: ["s1", "s4", "s19", "s20"],
    location: {
      city: "San Francisco",
      country: "USA",
      remote: true
    },
    hackathons: ["h1", "h3"],
    contactEmail: "alex@example.com"
  },
  {
    id: "u2",
    name: "Sophia Chen",
    bio: "UX/UI designer passionate about creating intuitive user experiences.",
    avatar: "https://i.pravatar.cc/150?img=5",
    skills: ["s7", "s8", "s9"],
    location: {
      city: "Berlin",
      country: "Germany",
      remote: true
    },
    hackathons: ["h2", "h6"],
    contactEmail: "sophia@example.com"
  },
  {
    id: "u3",
    name: "Marcus Williams",
    bio: "Backend engineer specializing in scalable systems. AWS certified.",
    avatar: "https://i.pravatar.cc/150?img=3",
    skills: ["s4", "s5", "s10", "s20"],
    location: {
      city: "London",
      country: "UK",
      remote: false
    },
    hackathons: ["h4", "h6"],
    contactEmail: "marcus@example.com"
  },
  {
    id: "u4",
    name: "Priya Sharma",
    bio: "AI researcher with focus on natural language processing and computer vision.",
    avatar: "https://i.pravatar.cc/150?img=10",
    skills: ["s16", "s17", "s19"],
    location: {
      city: "Bangalore",
      country: "India",
      remote: true
    },
    hackathons: ["h1", "h5"],
    contactEmail: "priya@example.com"
  },
  {
    id: "u5",
    name: "Hiroshi Tanaka",
    bio: "Mobile developer with experience in cross-platform frameworks.",
    avatar: "https://i.pravatar.cc/150?img=40",
    skills: ["s13", "s14", "s15"],
    location: {
      city: "Tokyo",
      country: "Japan",
      remote: false
    },
    hackathons: ["h5", "h6"],
    contactEmail: "hiroshi@example.com"
  },
  {
    id: "u6",
    name: "Emma Davis",
    bio: "Blockchain developer and smart contract specialist.",
    avatar: "https://i.pravatar.cc/150?img=9",
    skills: ["s18", "s1", "s4"],
    location: {
      city: "New York",
      country: "USA",
      remote: true
    },
    hackathons: ["h2", "h3"],
    contactEmail: "emma@example.com"
  },
  {
    id: "u7",
    name: "Carlos Mendez",
    bio: "DevOps engineer focused on cloud infrastructure and automation.",
    avatar: "https://i.pravatar.cc/150?img=13",
    skills: ["s10", "s11", "s12"],
    location: {
      city: "Madrid",
      country: "Spain",
      remote: false
    },
    hackathons: ["h3", "h6"],
    contactEmail: "carlos@example.com"
  },
  {
    id: "u8",
    name: "Zara Ali",
    bio: "Frontend developer specializing in responsive and accessible web applications.",
    avatar: "https://i.pravatar.cc/150?img=25",
    skills: ["s1", "s2", "s19"],
    location: {
      city: "Dubai",
      country: "UAE",
      remote: true
    },
    hackathons: ["h3", "h6"],
    contactEmail: "zara@example.com"
  }
];

// Mock Messages
export const messagesData: Message[] = [
  {
    id: "m1",
    senderId: "u1",
    receiverId: "u2",
    content: "Hi Sophia, I saw your profile and I'm interested in teaming up for the EdTech hackathon. Are you still looking for team members?",
    timestamp: "2025-04-15T14:30:00Z",
    read: true
  },
  {
    id: "m2",
    senderId: "u2",
    receiverId: "u1",
    content: "Hey Alex! Yes, I'm still looking for teammates. I'd love to hear more about your ideas for the hackathon.",
    timestamp: "2025-04-15T15:45:00Z",
    read: true
  },
  {
    id: "m3",
    senderId: "u3",
    receiverId: "u5",
    content: "Hello Hiroshi, I'm interested in the Climate Action Hackathon. Would you like to form a team?",
    timestamp: "2025-04-16T09:20:00Z",
    read: false
  },
  {
    id: "m4",
    senderId: "u4",
    receiverId: "u1",
    content: "Hi Alex, I see you're interested in the Global AI Hackathon. I have some ideas about using NLP for climate data analysis. Would you like to discuss?",
    timestamp: "2025-04-17T11:15:00Z",
    read: false
  }
];

// Helper functions to get data
export const getSkillById = (skillId: string): Skill | undefined => {
  return skillsData.find(skill => skill.id === skillId);
};

export const getHackathonById = (hackathonId: string): Hackathon | undefined => {
  return hackathonsData.find(hackathon => hackathon.id === hackathonId);
};

export const getUserById = (userId: string): User | undefined => {
  return usersData.find(user => user.id === userId);
};

export const getSkillsByIds = (skillIds: string[]): Skill[] => {
  return skillIds.map(id => getSkillById(id)).filter((skill): skill is Skill => skill !== undefined);
};

export const getHackathonsByIds = (hackathonIds: string[]): Hackathon[] => {
  return hackathonIds.map(id => getHackathonById(id)).filter((hackathon): hackathon is Hackathon => hackathon !== undefined);
};

export const getUsersBySkill = (skillId: string): User[] => {
  return usersData.filter(user => user.skills.includes(skillId));
};

export const getUsersByHackathon = (hackathonId: string): User[] => {
  return usersData.filter(user => user.hackathons.includes(hackathonId));
};
