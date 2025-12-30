import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CompetitionCard from "../components/CompetitionCard";
import { useCompetitions } from "../hooks/use-competitions";
import { Zap, Users, Trophy, Target, Rocket } from "lucide-react";
import racingBg from "@assets/generated_images/motorsport_racing_series_background.png";

export default function Competitions() {
  const { data: competitions, isLoading } = useCompetitions();

  const categories = [
    {
      title: "F1 in Schools",
      desc: "Formula 1 in Schools is the ultimate student motorsport STEM competition. Design, build, and race miniature Formula 1 cars with cutting-edge engineering.",
      stats: "Professional & Rookie Categories"
    },
    {
      title: "4x4 RC Challenge",
      desc: "Off-road remote control car competition testing precision, control, and engineering in challenging terrains. Development and advanced categories.",
      stats: "Terrain & Speed Challenges"
    },
    {
      title: "Drift Racing",
      desc: "Precision-based drifting competition where technical skill and car control are paramount. Master the art of controlled slides and sharp turns.",
      stats: "Reaction Time Based"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={racingBg} 
            alt="Racing Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-white backdrop-blur-md rounded-full font-bold text-sm mb-6 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              MOTORSPORT DISCIPLINES
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight text-stroke">Racing Series</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium subtext-shadow">
              From classroom concepts to world championship stages. We compete in diverse motorsport disciplines, pushing engineering excellence and innovation to the highest levels.
            </p>
          </div>
        </div>
      </section>

      {/* Competition Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-12 text-center">Our Competitions</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{cat.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{cat.desc}</p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-bold text-primary">{cat.stats}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Competitions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-12 text-center">Current Series</h2>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-3xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {competitions?.map((comp) => (
                <CompetitionCard key={comp.id} competition={comp} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Compete */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-12 text-center">Why Compete With Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Rocket, title: "Innovation", desc: "Latest technologies" },
              { icon: Trophy, title: "Excellence", desc: "World-class standards" },
              { icon: Users, title: "Community", desc: "140+ members strong" },
              { icon: Target, title: "Mentorship", desc: "Expert guidance" },
              { icon: Zap, title: "Global", desc: "International exposure" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-md">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
