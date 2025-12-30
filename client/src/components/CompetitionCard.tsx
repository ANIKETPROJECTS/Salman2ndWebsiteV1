import { Link } from "wouter";
import { ArrowRight, Trophy, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import type { Competition } from "@shared/schema";

interface CompetitionCardProps {
  competition: Competition;
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  // Placeholder logic since images might be null in DB for now
  const bgImage = competition.imageUrl || "https://images.unsplash.com/photo-1532906619279-a76e10eb4b76?auto=format&fit=crop&q=80";

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img 
          src={bgImage} 
          alt={competition.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="absolute top-4 right-4 z-20">
          <span className={`
            px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
            ${competition.status === 'active' ? 'bg-green-500 text-white' : 'bg-white/20 backdrop-blur-md text-white'}
          `}>
            {competition.status}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 z-20 text-white">
          <h3 className="text-2xl font-display italic font-bold mb-1">{competition.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-200">
            <Trophy className="w-4 h-4 text-primary" />
            <span>{competition.type} Series</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-6 line-clamp-2">{competition.description}</p>
        
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{format(new Date(competition.date), "MMMM d, yyyy")}</span>
          </div>
          {competition.location && (
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{competition.location}</span>
            </div>
          )}
        </div>

        <Link href={`/competitions/${competition.id}`} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-300">
          View Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
