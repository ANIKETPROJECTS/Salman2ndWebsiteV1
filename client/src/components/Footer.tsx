import { Link } from "wouter";
import { Trophy, Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 rounded-t-[3rem] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Trophy className="text-white w-6 h-6" />
              </div>
              <span className="font-display text-2xl tracking-tighter font-bold">
                JSSIS<span className="text-primary">F1</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              JSS International School's premier STEM initiative. 
              Fostering innovation, engineering excellence, and competitive spirit 
              through motorsport technology.
            </p>
            <div className="flex gap-4 mt-8">
              {[Facebook, Instagram, Twitter, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Competitions', 'Activities', 'History', 'Gallery'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Jumeirah Village Circle</li>
              <li>Dubai, United Arab Emirates</li>
              <li>+971 4 123 4567</li>
              <li>stem@jssis.ae</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} JSSIS STEM Club. All rights reserved.</p>
          <p>Designed with speed & precision.</p>
        </div>
      </div>
    </footer>
  );
}
