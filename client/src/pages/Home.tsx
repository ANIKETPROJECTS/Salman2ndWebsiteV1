import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Trophy, Users, Flag, Zap } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CompetitionCard from "../components/CompetitionCard";
import { useCompetitions } from "../hooks/use-competitions";
import f1RacerImage from "@assets/generated_images/f1_mini_race_car.png";
import driftImage from "@assets/generated_images/drift_racing_at_night.png";

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
              <img 
                src={f1RacerImage}
                alt="F1 Car Model"
                className="w-full h-auto rounded-3xl shadow-2xl shadow-primary/20 transform rotate-1 hover:rotate-0 transition-transform duration-500"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce duration-[3000ms]">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
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

      {/* Drift Racing Banner Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden h-96">
            <img 
              src={driftImage}
              alt="Drift Racing Competition"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center pl-8 sm:pl-12">
              <div className="text-white max-w-md">
                <h2 className="text-4xl font-display font-bold mb-4">Drift Racing Series</h2>
                <p className="text-lg text-gray-100 mb-6">Experience the precision and control of competitive drifting. Push limits, master technique.</p>
                <Link href="/competitions" className="inline-block px-8 py-3 bg-primary text-white rounded-full font-bold hover:shadow-lg hover:shadow-primary/50 transition-all">
                  Explore Series
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Competitions */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Current Series</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our students compete in multiple disciplines, pushing the boundaries of what's possible in student motorsport.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {competitions?.slice(0, 3).map((comp) => (
                <CompetitionCard key={comp.id} competition={comp} />
              ))}
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/competitions" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors">
              View All Series <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Why We Excel</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Core values that drive our culture and define our success</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Zap, title: "Innovation", desc: "Pushing technical boundaries with cutting-edge CAD/CAM technologies and engineering excellence." },
              { icon: Users, title: "Teamwork", desc: "Collaborating across disciplines to build a winning organization where diversity thrives." },
              { icon: Flag, title: "Competition", desc: "Testing ourselves against the best student teams worldwide to achieve podium finishes." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center group bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Our Track Record</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Proven excellence across competitions and recognition globally</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "National Championships", value: "3", color: "from-yellow-400 to-yellow-600" },
              { label: "World Ranking", value: "8th", color: "from-blue-400 to-blue-600" },
              { label: "Team Members", value: "140+", color: "from-green-400 to-green-600" },
              { label: "Global Records", value: "2", color: "from-red-400 to-red-600" }
            ].map((stat, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-3xl p-8 text-white text-center`}>
                <div className="text-4xl font-display font-bold mb-2">{stat.value}</div>
                <p className="text-sm font-medium opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-orange-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-display font-bold mb-4">Ready to Join the Team?</h2>
            <p className="text-lg mb-8 opacity-95">
              Whether you're a designer, engineer, or passionate about motorsport, there's a role for you in our growing club.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/competitions" className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-full hover:shadow-lg transition-all">
                Explore Competitions
              </Link>
              <Link href="/contact" className="inline-block px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
