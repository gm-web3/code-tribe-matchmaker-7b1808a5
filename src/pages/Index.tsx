
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { usersData, hackathonsData, getSkillsByIds, getHackathonsByIds } from "@/data/mockData";
import { ProfileCard } from "@/components/user/ProfileCard";
import { HackathonCard } from "@/components/hackathon/HackathonCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { getUsersByHackathon } from "@/data/mockData";

const Index = () => {
  // Get featured profiles (first 4 users)
  const featuredProfiles = usersData.slice(0, 4);
  
  // Get upcoming hackathons (first 3 hackathons)
  const upcomingHackathons = hackathonsData.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-500 to-codeblue-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Hackathon Team</h1>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Connect with developers, designers, and innovators who share your passion for building amazing projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/browse">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-opacity-90 hover:text-purple-700 w-full sm:w-auto">
                  Find Teammates
                </Button>
              </Link>
              <Link to="/hackathons">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 w-full sm:w-auto">
                  Explore Hackathons
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Finding the perfect hackathon teammates has never been easier with Code Tribe Matchmaker.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Highlight your skills, experience, and the hackathons you're interested in attending.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Teammates</h3>
              <p className="text-muted-foreground">
                Search for teammates with complementary skills and shared hackathon interests.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Collaborate</h3>
              <p className="text-muted-foreground">
                Reach out through our messaging system and start building your dream team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Profiles Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Teammates</h2>
            <Link to="/browse" className="text-primary flex items-center hover:underline">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProfiles.map(user => (
              <ProfileCard
                key={user.id}
                user={user}
                skills={getSkillsByIds(user.skills)}
                hackathons={getHackathonsByIds(user.hackathons)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Hackathons Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Hackathons</h2>
            <Link to="/hackathons" className="text-primary flex items-center hover:underline">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingHackathons.map(hackathon => (
              <HackathonCard
                key={hackathon.id}
                hackathon={hackathon}
                interestedCount={getUsersByHackathon(hackathon.id).length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-codeblue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Hackathon Dream Team?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Start browsing potential teammates or create your profile to showcase your skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-opacity-90 hover:text-purple-700 w-full sm:w-auto">
                Browse Teammates
              </Button>
            </Link>
            <Link to="/profile">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 w-full sm:w-auto">
                Create Your Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
