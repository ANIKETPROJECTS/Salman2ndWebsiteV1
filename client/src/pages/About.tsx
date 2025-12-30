import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Users, Target, Rocket } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl font-display italic font-bold text-gray-900 mb-8 text-center">About The Club</h1>
        
        <div className="prose prose-lg mx-auto text-gray-600 mb-16">
          <p>
            The JSSIS F1 STEM Club is more than just an after-school activity; it is a center of excellence 
            where engineering dreams take flight. Founded in 2020, we have rapidly grown into one of the 
            most competitive student motorsport organizations in the region.
          </p>
          <p>
            Our mission is to empower students with practical skills in CAD/CAM design, aerodynamics, 
            project management, and marketing through the thrill of F1 in Schools and other technical challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
           <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Rocket className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Our Mission</h3>
              <p className="text-sm text-gray-500">To inspire the next generation of engineers and innovators.</p>
           </div>
           <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Target className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Our Vision</h3>
              <p className="text-sm text-gray-500">To become the world's leading student STEM initiative.</p>
           </div>
           <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Users className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Our Team</h3>
              <p className="text-sm text-gray-500">A diverse group of passionate students, mentors, and alumni.</p>
           </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
