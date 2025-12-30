import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Trophy, Users, Flag, Zap } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CompetitionCard from "../components/CompetitionCard";
import { useCompetitions } from "../hooks/use-competitions";

export default function Home() {
  const { data: competitions, isLoading } = useCompetitions();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gray-50 skew-x-12 translate-x-32 -z-10" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-bold text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                JSSIS F1 STEM CLUB
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-gray-900 mb-6">
                ENGINEERING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">
                  EXCELLENCE
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
                From classroom concepts to podium finishes. We design, build, and race 
                miniature F1 cars, mastering aerodynamics and engineering along the way.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/competitions" className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
                  Explore Competitions
                </Link>
                <Link href="/about" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 rounded-full font-bold hover:border-gray-200 hover:bg-gray-50 transition-all duration-300">
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
                <div>
                  <h3 className="text-3xl font-display font-bold text-gray-900">#1</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">in Asia</p>
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-gray-900">Top 8</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">Worldwide</p>
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-gray-900">20+</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">Awards Won</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Racing Car Image */}
              {/* Unsplash image of a futuristic race car or F1 model */}
              <img 
                src="https://images.unsplash.com/photo-1511527844068-006b95d162c2?auto=format&fit=crop&q=80"
                alt="F1 Car Model"
                className="w-full h-auto rounded-3xl shadow-2xl shadow-primary/20 transform rotate-1 hover:rotate-0 transition-transform duration-500"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce duration-[3000ms]">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-900" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Latest Win</p>
                  <p className="font-bold text-gray-900">National Champs '23</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Competitions */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Current Series</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our students compete in multiple disciplines, pushing the boundaries of what's possible in student motorsport.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {competitions?.slice(0, 3).map((comp) => (
                <CompetitionCard key={comp.id} competition={comp} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/competitions" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors">
              View All Series <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Zap, title: "Innovation", desc: "Pushing technical boundaries with cutting-edge CAD/CAM technologies." },
              { icon: Users, title: "Teamwork", desc: "Collaborating across disciplines to build a winning organization." },
              { icon: Flag, title: "Competition", desc: "Testing our mettle against the best student teams in the world." }
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-8 h-8 text-gray-900 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
