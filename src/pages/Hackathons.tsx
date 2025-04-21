
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { hackathonsData, getUsersByHackathon } from "@/data/mockData";
import { HackathonCard } from "@/components/hackathon/HackathonCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Hackathons = () => {
  const [search, setSearch] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);

  // Filter hackathons
  const filteredHackathons = hackathonsData.filter(hackathon => {
    // Search filter
    const matchesSearch = !search || 
      hackathon.name.toLowerCase().includes(search.toLowerCase()) ||
      hackathon.description.toLowerCase().includes(search.toLowerCase()) ||
      hackathon.location.toLowerCase().includes(search.toLowerCase());
    
    // Online only filter
    const matchesOnline = !onlineOnly || hackathon.isOnline;
    
    return matchesSearch && matchesOnline;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Upcoming Hackathons</h1>
          <p className="text-muted-foreground">
            Find hackathons that interest you and connect with potential teammates.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="w-full">
              <Label htmlFor="search" className="mb-2 block">Search</Label>
              <Input 
                id="search"
                placeholder="Search hackathons..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="online-only"
                checked={onlineOnly}
                onCheckedChange={setOnlineOnly}
              />
              <Label htmlFor="online-only">Online Only</Label>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredHackathons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.map(hackathon => (
              <HackathonCard
                key={hackathon.id}
                hackathon={hackathon}
                interestedCount={getUsersByHackathon(hackathon.id).length}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No hackathons found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters.
            </p>
            <button 
              className="text-primary hover:underline" 
              onClick={() => {
                setSearch("");
                setOnlineOnly(false);
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Hackathons;
