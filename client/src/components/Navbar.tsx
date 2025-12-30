import { Link, useLocation } from "wouter";
import { Menu, X, Trophy, Calendar, Home, Phone, Info, Timer } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/competitions", label: "Competitions", icon: Trophy },
    { href: "/activities", label: "Activities", icon: Calendar },
    { href: "/timeline", label: "History", icon: Timer },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/30">
                <Trophy className="text-white w-6 h-6" />
              </div>
              <span className="font-display text-2xl tracking-tighter font-bold text-gray-900 group-hover:text-primary transition-colors">
                SEAL<span className="text-primary"> CLUB</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav - Centered */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={`
                relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300
                ${isActive(link.href) 
                  ? "text-primary bg-primary/10" 
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"}
              `}>
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full border-2 border-primary/20 pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>
          
          {/* Dashboard Button */}
          <div className="hidden md:block ml-4 pl-4 border-l border-gray-200 flex-shrink-0">
            <Link href="/login" className="px-6 py-2.5 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors
                    ${isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-50"}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-100">
                <Link 
                  href="/login"
                  className="flex items-center justify-center w-full px-4 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25"
                  onClick={() => setIsOpen(false)}
                >
                  Access Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
