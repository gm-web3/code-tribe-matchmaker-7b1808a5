
import { Layout } from "@/components/layout/Layout";
import { ProfileCard } from "@/components/user/ProfileCard";
import { UserFilters } from "@/components/filters/UserFilters";
import { usersData, getSkillsByIds, getHackathonsByIds } from "@/data/mockData";
import { useState, useMemo } from "react";
import { UserFilters as UserFiltersType } from "@/types";

const Browse = () => {
  // Initial filter state
  const [filters, setFilters] = useState<UserFiltersType>({
    search: "",
    skills: [],
    location: {
      city: "",
      country: "",
      remoteOnly: false,
    },
    hackathons: [],
  });

  // Filter users based on current filters
  const filteredUsers = useMemo(() => {
    return usersData.filter(user => {
      // Search filter
      if (filters.search && !user.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !user.bio.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Skills filter
      if (filters.skills.length > 0 && !filters.skills.some(skillId => user.skills.includes(skillId))) {
        return false;
      }

      // Location filters
      if (filters.location.city && 
          !user.location.city.toLowerCase().includes(filters.location.city.toLowerCase())) {
        return false;
      }

      if (filters.location.country && 
          !user.location.country.toLowerCase().includes(filters.location.country.toLowerCase())) {
        return false;
      }

      if (filters.location.remoteOnly && !user.location.remote) {
        return false;
      }

      // Hackathons filter
      if (filters.hackathons.length > 0 && 
          !filters.hackathons.some(hackathonId => user.hackathons.includes(hackathonId))) {
        return false;
      }

      // User passed all filters
      return true;
    });
  }, [filters]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Find Your Perfect Teammates</h1>
          <p className="text-muted-foreground">
            Browse through potential teammates and find the perfect match for your next hackathon.
          </p>
        </div>

        {/* Filters */}
        <UserFilters filters={filters} onChange={setFilters} />

        {/* Results */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <ProfileCard
                key={user.id}
                user={user}
                skills={getSkillsByIds(user.skills)}
                hackathons={getHackathonsByIds(user.hackathons)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters to find more teammates.
            </p>
            <button 
              className="text-primary hover:underline" 
              onClick={() => setFilters({
                search: "",
                skills: [],
                location: { city: "", country: "", remoteOnly: false },
                hackathons: []
              })}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Browse;
