import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useActivities } from "../hooks/use-activities";
import { Calendar, Zap, Users, BookOpen } from "lucide-react";
import { format } from "date-fns";
import aerodynamicsImage from "@assets/generated_images/aerodynamics_workshop.png";
import manufacturingImage from "@assets/generated_images/manufacturing_lab_setup.png";
import guestSpeakerImage from "@assets/generated_images/guest_speaker_session.png";
import teamCollaborationImage from "@assets/generated_images/team_collaboration.png";
import stemBg from "@assets/generated_images/stem_engineering_workshop_background.png";

export default function Activities() {
  const { data: activities, isLoading } = useActivities();

  const getImageForActivity = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('aerodynamic')) return aerodynamicsImage;
    if (lowerTitle.includes('manufactur') || lowerTitle.includes('lab')) return manufacturingImage;
    if (lowerTitle.includes('speaker') || lowerTitle.includes('guest') || lowerTitle.includes('f1 engineer')) return guestSpeakerImage;
    if (lowerTitle.includes('team') || lowerTitle.includes('coding') || lowerTitle.includes('design')) return teamCollaborationImage;
    return aerodynamicsImage;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={stemBg} 
            alt="STEM Background" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-gray-50" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-white backdrop-blur-md rounded-full font-bold text-sm mb-6 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              HANDS-ON LEARNING
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">Labs & Workshops</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium">
              Beyond the race track, our students engage in intensive STEM learning through workshops, labs, and expert-led sessions designed to build engineering excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Key Areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Zap, title: "Aerodynamics", desc: "Learn drag, lift, and airflow optimization" },
              { icon: Users, title: "Manufacturing", desc: "CAD design, 3D printing, and machining" },
              { icon: BookOpen, title: "Expert Sessions", desc: "Guest speakers and industry insights" },
              { icon: Zap, title: "Team Projects", desc: "Collaborative engineering challenges" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">Recent Activities</h2>

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1,2,3,4].map(i => <div key={i} className="h-80 bg-gray-100 rounded-3xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {activities?.map((activity) => (
                <div key={activity.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={getImageForActivity(activity.title)}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-primary text-white rounded-full text-xs font-bold uppercase">
                        {activity.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{activity.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                      <Calendar className="w-4 h-4 text-primary" />
                      {format(new Date(activity.date), "MMMM d, yyyy")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
