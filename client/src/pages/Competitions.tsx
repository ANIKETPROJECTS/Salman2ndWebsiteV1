import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CompetitionCard from "../components/CompetitionCard";
import { useCompetitions } from "../hooks/use-competitions";

export default function Competitions() {
  const { data: competitions, isLoading } = useCompetitions();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">Racing Series</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From F1 in Schools to 4x4 challenges, explore the diverse motorsport disciplines we compete in.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl h-96 animate-pulse" />
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

      <Footer />
    </div>
  );
}
