
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="border-b border-border bg-background py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-codeblue-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">&lt;/&gt;</span>
          </div>
          <span className="font-bold text-xl text-foreground hidden sm:inline-block">Code Tribe</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/browse" className="text-foreground hover:text-primary transition-colors">Browse</Link>
          <Link to="/hackathons" className="text-foreground hover:text-primary transition-colors">Hackathons</Link>
          <Link to="/messages" className="text-foreground hover:text-primary transition-colors">Messages</Link>
          <Link to="/profile">
            <Button variant="default">My Profile</Button>
          </Link>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 md:hidden flex flex-col space-y-4 animate-fade-in">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/browse" 
              className="text-foreground hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse
            </Link>
            <Link 
              to="/hackathons" 
              className="text-foreground hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Hackathons
            </Link>
            <Link 
              to="/messages" 
              className="text-foreground hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Messages
            </Link>
            <Link 
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button variant="default" className="w-full">My Profile</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
