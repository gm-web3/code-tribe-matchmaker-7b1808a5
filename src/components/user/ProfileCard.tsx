
import { User, Skill, Hackathon } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileCardProps {
  user: User;
  skills: Skill[];
  hackathons: Hackathon[];
  showActions?: boolean;
}

export function ProfileCard({ user, skills, hackathons, showActions = true }: ProfileCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[3/1] w-full bg-gradient-to-r from-purple-400 to-codeblue-400 opacity-80"></div>
      <CardContent className="p-6 relative">
        <div className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-background overflow-hidden bg-muted">
          <img 
            src={user.avatar}
            alt={user.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
          <p className="text-muted-foreground mb-4">{user.location.city}, {user.location.country} {user.location.remote ? '· Remote' : ''}</p>
          
          <p className="mb-4">{user.bio}</p>
          
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill.id} variant="secondary" className="capitalize">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
          
          {hackathons.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Interested in Hackathons</h4>
              <div className="flex flex-wrap gap-2">
                {hackathons.map((hackathon) => (
                  <Badge key={hackathon.id} variant="outline" className="bg-accent/50">
                    {hackathon.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="bg-muted/20 px-6 py-4 flex justify-between">
          <Link to={`/profile/${user.id}`}>
            <Button variant="outline">View Profile</Button>
          </Link>
          <Link to={`/messages/new/${user.id}`}>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
