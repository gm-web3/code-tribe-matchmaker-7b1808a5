
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UserFilters as UserFiltersType } from "@/types";
import { skillsData, hackathonsData } from "@/data/mockData";
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface UserFiltersProps {
  filters: UserFiltersType;
  onChange: (filters: UserFiltersType) => void;
}

export function UserFilters({ filters, onChange }: UserFiltersProps) {
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<UserFiltersType>(filters);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(filters.skills);
  const [selectedHackathons, setSelectedHackathons] = useState<string[]>(filters.hackathons);
  
  // Group skills by category
  const skillsByCategory = skillsData.reduce<Record<string, typeof skillsData>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const handleSearchChange = (value: string) => {
    onChange({
      ...filters,
      search: value,
    });
  };

  const handleFilterChange = (key: keyof UserFiltersType['location'], value: string | boolean) => {
    if (key === 'remoteOnly') {
      setTempFilters({
        ...tempFilters,
        location: {
          ...tempFilters.location,
          [key]: value as boolean,
        },
      });
    } else {
      setTempFilters({
        ...tempFilters,
        location: {
          ...tempFilters.location,
          [key]: value as string,
        },
      });
    }
  };

  const handleSkillToggle = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleHackathonToggle = (hackathonId: string) => {
    setSelectedHackathons(prev => 
      prev.includes(hackathonId)
        ? prev.filter(id => id !== hackathonId)
        : [...prev, hackathonId]
    );
  };

  const applyFilters = () => {
    const newFilters: UserFiltersType = {
      ...tempFilters,
      skills: selectedSkills,
      hackathons: selectedHackathons,
    };
    onChange(newFilters);
    setIsFiltersDialogOpen(false);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="w-full">
          <Label htmlFor="search" className="mb-2 block">Search</Label>
          <Input 
            id="search"
            placeholder="Search by name, skills or bio..." 
            value={filters.search} 
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Dialog open={isFiltersDialogOpen} onOpenChange={setIsFiltersDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2 whitespace-nowrap">
              <Filter size={16} />
              Filters
              {(filters.skills.length > 0 || filters.hackathons.length > 0 || 
                filters.location.city || filters.location.country || filters.location.remoteOnly) && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {[
                    filters.skills.length > 0 ? 1 : 0,
                    filters.hackathons.length > 0 ? 1 : 0,
                    filters.location.city || filters.location.country || filters.location.remoteOnly ? 1 : 0
                  ].filter(Boolean).length}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Filter Teammates</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div>
                <h3 className="font-medium mb-3">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city"
                      placeholder="Any city" 
                      value={tempFilters.location.city}
                      onChange={(e) => handleFilterChange('city', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country"
                      placeholder="Any country" 
                      value={tempFilters.location.country}
                      onChange={(e) => handleFilterChange('country', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <Switch 
                    id="remote-only"
                    checked={tempFilters.location.remoteOnly}
                    onCheckedChange={(checked) => handleFilterChange('remoteOnly', checked)}
                  />
                  <Label htmlFor="remote-only">Remote Only</Label>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Skills</h3>
                <div className="space-y-4">
                  {Object.entries(skillsByCategory).map(([category, skills]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground capitalize">{category}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {skills.map((skill) => (
                          <div key={skill.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`skill-${skill.id}`}
                              checked={selectedSkills.includes(skill.id)}
                              onCheckedChange={() => handleSkillToggle(skill.id)}
                            />
                            <Label 
                              htmlFor={`skill-${skill.id}`}
                              className="text-sm cursor-pointer"
                            >
                              {skill.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Hackathons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {hackathonsData.map((hackathon) => (
                    <div key={hackathon.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`hackathon-${hackathon.id}`}
                        checked={selectedHackathons.includes(hackathon.id)}
                        onCheckedChange={() => handleHackathonToggle(hackathon.id)}
                      />
                      <Label 
                        htmlFor={`hackathon-${hackathon.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {hackathon.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => {
                  setTempFilters({
                    search: "",
                    skills: [],
                    hackathons: [],
                    location: {
                      city: "",
                      country: "",
                      remoteOnly: false,
                    },
                  });
                  setSelectedSkills([]);
                  setSelectedHackathons([]);
                }}
              >
                Reset Filters
              </Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filter pills */}
      {(filters.skills.length > 0 || filters.hackathons.length > 0 || 
       filters.location.city || filters.location.country || filters.location.remoteOnly) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.location.city && (
            <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1">
              City: {filters.location.city}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                onClick={() => onChange({
                  ...filters,
                  location: {
                    ...filters.location,
                    city: "",
                  },
                })}
              >
                <span className="sr-only">Remove</span>
                ✕
              </Button>
            </Badge>
          )}
          
          {filters.location.country && (
            <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1">
              Country: {filters.location.country}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                onClick={() => onChange({
                  ...filters,
                  location: {
                    ...filters.location,
                    country: "",
                  },
                })}
              >
                <span className="sr-only">Remove</span>
                ✕
              </Button>
            </Badge>
          )}
          
          {filters.location.remoteOnly && (
            <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1">
              Remote Only
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                onClick={() => onChange({
                  ...filters,
                  location: {
                    ...filters.location,
                    remoteOnly: false,
                  },
                })}
              >
                <span className="sr-only">Remove</span>
                ✕
              </Button>
            </Badge>
          )}
          
          {filters.skills.map(skillId => {
            const skill = skillsData.find(s => s.id === skillId);
            if (!skill) return null;
            
            return (
              <Badge key={skillId} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                {skill.name}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                  onClick={() => onChange({
                    ...filters,
                    skills: filters.skills.filter(id => id !== skillId),
                  })}
                >
                  <span className="sr-only">Remove</span>
                  ✕
                </Button>
              </Badge>
            );
          })}
          
          {filters.hackathons.map(hackathonId => {
            const hackathon = hackathonsData.find(h => h.id === hackathonId);
            if (!hackathon) return null;
            
            return (
              <Badge key={hackathonId} className="pl-2 pr-1 py-1 flex items-center gap-1 bg-accent/50 hover:bg-accent/70">
                {hackathon.name}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                  onClick={() => onChange({
                    ...filters,
                    hackathons: filters.hackathons.filter(id => id !== hackathonId),
                  })}
                >
                  <span className="sr-only">Remove</span>
                  ✕
                </Button>
              </Badge>
            );
          })}
          
          {(filters.skills.length > 0 || filters.hackathons.length > 0 || 
            filters.location.city || filters.location.country || filters.location.remoteOnly) && (
            <Button 
              variant="link" 
              className="text-sm h-7 px-2"
              onClick={() => onChange({
                search: filters.search,
                skills: [],
                hackathons: [],
                location: {
                  city: "",
                  country: "",
                  remoteOnly: false,
                },
              })}
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
