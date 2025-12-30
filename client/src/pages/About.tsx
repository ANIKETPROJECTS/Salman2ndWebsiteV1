import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Users, Target, Rocket, Trophy, Zap, Award } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import aboutBg from "@assets/generated_images/advanced_stem_laboratory_and_students.png";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={aboutBg} 
            alt="About Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight text-stroke">About The Club</h1>
            <p className="text-xl text-gray-200 leading-relaxed font-medium">
              A center of excellence where engineering dreams take flight and innovation thrives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Our Journey</h2>
              <p>
                The JSSIS F1 STEM Club was officially founded on January 10th, 2020, with just 6 enthusiastic students who shared a passion for engineering and motorsport. What began as a small after-school activity has blossomed into a thriving community of 140+ students representing one of the most competitive student motorsport organizations in the region.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Our Mission</h2>
              <p>
                To inspire the next generation of engineers and innovators by empowering students with practical skills in CAD/CAM design, aerodynamics, project management, and marketing through the competitive world of F1 in Schools and other technical challenges.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Our Vision</h2>
              <p>
                To become the world's leading student STEM initiative, recognized for excellence in engineering education, competitive success, and developing tomorrow's innovators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">Our Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Trophy, title: "3x National Champions", desc: "Nationwide F1 championships" },
              { icon: Award, title: "World Finals - 8th Place", desc: "Globally competitive performance" },
              { icon: Zap, title: "Asia's Best", desc: "1st place in Asian region" },
              { icon: Rocket, title: "140+ Students", desc: "From 6 to a thriving community" },
              { icon: Users, title: "15+ Alumni Mentors", desc: "Paying it forward to juniors" },
              { icon: Trophy, title: "World Record", desc: "Fastest reaction time globally" }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6">
                <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                Pushing technical boundaries with cutting-edge CAD/CAM technologies and innovative engineering solutions.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Teamwork</h3>
              <p className="text-gray-600 leading-relaxed">
                Collaborating across disciplines to build a winning organization where every member contributes their unique talents.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <Trophy className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Competition</h3>
              <p className="text-gray-600 leading-relaxed">
                Testing ourselves against the best teams worldwide to achieve excellence and break records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-orange-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-display font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-8 opacity-95">
            Whether you're passionate about engineering, racing, or STEM education, there's a place for you in our club.
          </p>
          <Link href="/contact" className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-full hover:shadow-lg transition-all">
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
