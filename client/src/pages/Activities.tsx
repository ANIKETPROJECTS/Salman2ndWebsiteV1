import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useActivities } from "../hooks/use-activities";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function Activities() {
  const { data: activities, isLoading } = useActivities();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display italic font-bold text-gray-900 mb-6">Labs & Workshops</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hands-on STEM learning experiences beyond the race track.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
             {[1,2,3].map(i => <div key={i} className="h-48 bg-white rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {activities?.map((activity) => (
              <div key={activity.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all flex gap-6 items-start">
                <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                   {/* Unsplash image for STEM workshop */}
                   <img 
                      src={activity.imageUrl || "https://images.unsplash.com/photo-1581092921461-eab62e97a782?auto=format&fit=crop&q=80"} 
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase">
                      {activity.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{activity.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(activity.date), "MMM d, yyyy")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
