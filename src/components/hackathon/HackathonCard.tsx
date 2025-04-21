
import { Hackathon } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Globe, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface HackathonCardProps {
  hackathon: Hackathon;
  interestedCount?: number;
}

export function HackathonCard({ hackathon, interestedCount = 0 }: HackathonCardProps) {
  const startDate = new Date(hackathon.startDate);
  const endDate = new Date(hackathon.endDate);
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-video w-full bg-muted overflow-hidden">
        {hackathon.image ? (
          <img 
            src={hackathon.image} 
            alt={hackathon.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-codeblue-500 flex items-center justify-center">
            <span className="text-white text-lg font-bold">{hackathon.name.substring(0, 2)}</span>
          </div>
        )}
        
        {hackathon.isOnline && (
          <Badge className="absolute top-3 right-3">
            <Globe className="h-3 w-3 mr-1" />
            Online
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{hackathon.name}</h3>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">
            {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
          </span>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{hackathon.location}</span>
        </div>
        
        {interestedCount > 0 && (
          <div className="flex items-center text-muted-foreground mb-4">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">{interestedCount} interested</span>
          </div>
        )}
        
        <p className="line-clamp-3">{hackathon.description}</p>
      </CardContent>
      
      <CardFooter className="bg-muted/20 px-6 py-4 flex justify-between">
        <Link to={`/hackathons/${hackathon.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        <a href={hackathon.url} target="_blank" rel="noopener noreferrer">
          <Button>Official Site</Button>
        </a>
      </CardFooter>
    </Card>
  );
}
