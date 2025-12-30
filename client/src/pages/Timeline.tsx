import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Trophy, Star, Award } from "lucide-react";

export default function Timeline() {
  const milestones = [
    {
      year: "2023",
      title: "Team V3 Victory",
      desc: "Crowned 4x4 National Champions, securing a spot in the World Finals.",
      icon: Trophy,
      color: "bg-yellow-500"
    },
    {
      year: "2022",
      title: "Team AEOLIAN",
      desc: "National Champions. Represented UAE at the World Finals in UK.",
      icon: Star,
      color: "bg-primary"
    },
    {
      year: "2021",
      title: "Team ACCELERATORS",
      desc: "First international debut. Placed 8th Worldwide and 1st in Asia.",
      icon: Award,
      color: "bg-blue-500"
    },
    {
      year: "2020",
      title: "Club Founded",
      desc: "JSSIS F1 STEM Club was established to foster engineering talent.",
      icon: Star,
      color: "bg-gray-800"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display italic font-bold text-gray-900 mb-6">Our Legacy</h1>
          <p className="text-xl text-gray-600">
            A history of speed, innovation, and breaking records.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2" />

          <div className="space-y-16">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 items-start ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md transform -translate-x-2 md:-translate-x-1/2 mt-6 ${item.color} z-10`} />

                {/* Content */}
                <div className="ml-20 md:ml-0 md:w-1/2 md:px-12">
                  <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-3 ${item.color}`}>
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
                
                {/* Empty side for layout balance */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
