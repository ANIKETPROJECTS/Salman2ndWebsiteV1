import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Send, Users, Briefcase, Heart } from "lucide-react";
import contactBg from "@assets/generated_images/modern_support_and_communication_center.png";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={contactBg} 
            alt="Contact Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight text-stroke">Get in Touch</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium subtext-shadow">
              Interested in joining our club, becoming a mentor, sponsoring us, or collaborating? We'd love to hear from you. Reach out to us through any channel below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">Contact Information</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Drop us a message anytime</p>
              <p className="font-bold text-gray-900">stem@jssis.ae</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8">
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Reach us directly during school hours</p>
              <p className="font-bold text-gray-900">+971 4 123 4567</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8">
              <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-4">Tour our F1 room and track</p>
              <p className="font-bold text-gray-900">JSS International School<br className="hidden md:block" />Jumeirah Village Circle, Dubai</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Connect */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">How You Can Help</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Join as Member</h3>
              <p className="text-gray-600 mb-4">
                Looking to be part of our growing community? We welcome students of all skill levels passionate about STEM and motorsport.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Student members (age 12+)</li>
                <li>✓ Alumni mentors</li>
                <li>✓ Internship programs</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Become a Sponsor</h3>
              <p className="text-gray-600 mb-4">
                Support world-class STEM education and competitive motorsport. Partner with us to reach 140+ talented students.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Sponsorship packages</li>
                <li>✓ Brand visibility</li>
                <li>✓ Event partnerships</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Partner & Collaborate</h3>
              <p className="text-gray-600 mb-4">
                Schools, organizations, and experts interested in collaboration and knowledge sharing.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ School partnerships</li>
                <li>✓ Expert mentorship</li>
                <li>✓ Joint competitions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">Send us a Message</h2>
          <div className="bg-gray-50 p-8 rounded-3xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none">
                  <option>Select a subject...</option>
                  <option>I want to join the club</option>
                  <option>Sponsorship inquiry</option>
                  <option>School partnership</option>
                  <option>Expert mentorship</option>
                  <option>General inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="Tell us more about your inquiry..." />
              </div>
              <button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
