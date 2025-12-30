import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Trophy, Star, Award, Zap, Users, Target } from "lucide-react";
import trophiesImage from "@assets/generated_images/championship_trophies_display.png";
import worldFinalsImage from "@assets/generated_images/world_finals_singapore.png";
import historyBg from "@assets/generated_images/stem_club_heritage_and_history_showcase.png";

export default function Timeline() {
  const milestones = [
    {
      period: "January - March 2020",
      title: "The Beginning",
      highlights: [
        "6 enthusiastic students founded the JSSIS F1 STEM Club on January 10th, 2020",
        "First meetings held in computer lab every Wednesday during stayback time",
        "Fusion software training, PowerPoint skills, and car design fundamentals",
        "March: Abrupt halt due to COVID-19 pandemic closure"
      ],
      icon: Star,
      color: "from-blue-400 to-blue-600"
    },
    {
      period: "June 2021",
      title: "Revival & Historic Achievement",
      highlights: [
        "F1 in School restarted in hybrid mode with 4x4 segment introduction",
        "YAS in School selected JSSIS auditorium as national final venue",
        "22 teams participated in 4x4 National Championship",
        "ACCELERATORS (girls team) won Terrain Challenge",
        "JSSIS successfully hosted entire national final event"
      ],
      icon: Trophy,
      color: "from-green-400 to-green-600"
    },
    {
      period: "September - December 2021",
      title: "Team Evolution & Ambitions",
      highlights: [
        "Enrollment reached 18 students",
        "ACCELERATORS & SPECTRUM merged to form TEAM NAUTILUS",
        "Set ambitious goal: F1 in School Professional Category World Champions",
        "Stay-back sessions began in physics lab for design and coding",
        "F1 Ambassadors appointed: Mukesh, Sai Suhas, Rutish, Swedha, and others"
      ],
      icon: Users,
      color: "from-purple-400 to-purple-600"
    },
    {
      period: "May - June 2022",
      title: "UAE National Championship Victory",
      highlights: [
        "Team Nautilus conducted first testing session successfully",
        "Final car model completed on submission day after intense effort",
        "26th June 2022: RACE DAY in Abu Dhabi",
        "Incredible time of 1.074 seconds - FASTEST in competition",
        "TEAM NAUTILUS WON UAE NATIONAL CHAMPIONSHIP 2022"
      ],
      icon: Trophy,
      color: "from-yellow-400 to-yellow-600"
    },
    {
      period: "September 2022 - February 2023",
      title: "Infrastructure & Expansion",
      highlights: [
        "Club became fully operational in face-to-face mode",
        "KHDA 2022 Inspection: Presented F1 School program to inspectors",
        "January 2023: F1 track inaugurated by CEO Mr. Govindrao Naik",
        "Inter-school competitions with prizes for reaction time and presentations",
        "Collaboration with other Dubai schools on track facility usage"
      ],
      icon: Zap,
      color: "from-red-400 to-red-600"
    },
    {
      period: "March 2023",
      title: "Major Milestone - Official F1 Room",
      highlights: [
        "Received first official F1 room with full equipment setup",
        "Acquired first resin printer and UV cleaner",
        "Two parallel journeys started: Nautilus (World Finals), Mercurial (National Finals)",
        "Nautilus Junior Programme launched for primary students",
        "Strategic focus on sponsorship, marketing, and world finals profile building"
      ],
      icon: Award,
      color: "from-pink-400 to-pink-600"
    },
    {
      period: "April - May 2023",
      title: "Explosive Growth & Expert Sessions",
      highlights: [
        "F1 IN SCHOOL JUNIORS launched - over 100 primary students joined",
        "Total F1 club membership reached 140+ students with 15 alumni mentors",
        "13 teams participated in intra-school competition (3 rounds)",
        "Distinguished visitors: ISRO Scientist Aluru Seelin Kiran Kumar shared aerodynamics insights",
        "Four teams working simultaneously: Nautilus, Mercurial, Aeolian, and V3"
      ],
      icon: Star,
      color: "from-cyan-400 to-cyan-600"
    },
    {
      period: "June 2023",
      title: "National Finals & Double Victory",
      highlights: [
        "15th June: RACE DAY - F1 IN SCHOOL NATIONAL FINALS",
        "Team Aeolian: Best Track Time after others disqualified",
        "Team Mercurial: Jumped from 8th to 3rd position in final race",
        "21st June RESULT DAY: TEAM AEOLIAN - NATIONAL CHAMPIONS",
        "TEAM V3 (4x4) - DEVELOPMENT CHAMPIONS"
      ],
      icon: Trophy,
      color: "from-orange-400 to-orange-600"
    },
    {
      period: "September 2023",
      title: "World Finals - Global Recognition",
      highlights: [
        "Team Nautilus departed for Singapore World Finals on September 5th",
        "Competed against 1.2 million participants worldwide",
        "8th place overall globally - EXTRAORDINARY ACHIEVEMENT",
        "1st place in ASIA - Champions of entire Asian continent",
        "1st place in GCC region - Regional dominance"
      ],
      icon: Award,
      color: "from-indigo-400 to-indigo-600"
    },
    {
      period: "World Records Set",
      title: "Engineering Excellence Recognized",
      highlights: [
        "4th fastest track time in the world",
        "Fastest race time in the entire world - WORLD RECORD",
        "Most consistent reaction time in the world - WORLD RECORD",
        "Set high standard for future generations",
        "Received global recognition at 2023 F1 in Schools World Championship"
      ],
      icon: Zap,
      color: "from-red-500 to-rose-600"
    }
  ];

  const stats = [
    { label: "Starting Students (2020)", value: "6" },
    { label: "Current Members (2023)", value: "140+" },
    { label: "Active Alumni Mentors", value: "15+" },
    { label: "National Championships", value: "3" },
    { label: "World Finals Position", value: "8th" },
    { label: "World Records", value: "2" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={historyBg} 
            alt="History Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">Our Journey</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
              From 6 students with a dream to 140+ members competing at the world stage. A story of persistence, innovation, and breaking records.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-3xl font-display font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden shadow-xl h-96">
            <img 
              src={trophiesImage}
              alt="Championship Trophies"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl h-96">
            <img 
              src={worldFinalsImage}
              alt="World Finals Singapore"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-16 text-center">Year by Year</h2>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <div className={`bg-gradient-to-r ${milestone.color} rounded-2xl p-0.5`}>
                  <div className="bg-white rounded-2xl p-8 group-hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${milestone.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <milestone.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="mb-2">
                          <span className={`inline-block px-4 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${milestone.color}`}>
                            {milestone.period}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{milestone.title}</h3>
                        <ul className="space-y-2">
                          {milestone.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-3 text-gray-600">
                              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${milestone.color} mt-2 flex-shrink-0`} />
                              <span className="leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-12 text-center">Major Milestones</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h3 className="text-xl font-bold text-gray-900">Championship Victories</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Team Nautilus - UAE National Champions 2022</li>
                <li>✓ Team Aeolian - National Champions 2023</li>
                <li>✓ Team V3 - 4x4 Development Champions 2023</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <Star className="w-8 h-8 text-purple-500" />
                <h3 className="text-xl font-bold text-gray-900">Global Recognition</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>✓ 8th Place Globally at World Finals</li>
                <li>✓ 1st in Asia - Continental Champions</li>
                <li>✓ 1st in GCC Region - Regional Leaders</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <Zap className="w-8 h-8 text-red-500" />
                <h3 className="text-xl font-bold text-gray-900">World Records</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>✓ 4th Fastest Track Time in World</li>
                <li>✓ Fastest Race Time Globally</li>
                <li>✓ Most Consistent Reaction Time Worldwide</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <Users className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900">Community Growth</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>✓ From 6 to 140+ Members</li>
                <li>✓ 15+ Active Alumni Mentors</li>
                <li>✓ 6 Major Teams Formed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
