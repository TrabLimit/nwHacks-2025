import { Navigation } from "@/components/Navigation";

const workoutImages = [
  { id: "1", title: "Fat Burn", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000" },
  { id: "2", title: "Lean and Sweaty", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000" },
  { id: "3", title: "Strength Surge", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000" },
  { id: "4", title: "Core Crusher", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000" },
  { id: "5", title: "HIIT It Hard", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000" },
  { id: "6", title: "Strength and Stability", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1000" },
];

const exerciseImages = [
  { id: "1", title: "Rear Lunges", image: "public/lunge.jpg" },
  { id: "2", title: "Butt Kickers", image: "public/butt.jpg" },
  { id: "3", title: "Criss Cross", image: "public/cross.jpg" },
  { id: "4", title: "Mountain Climbers", image: "public/mountain.jpg" },
  { id: "5", title: "Pendulum Crosses", image: "public/pendulum.webp" },
  { id: "6", title: "Plank", image: "public/plank.jpg" },
];

const songSelection = [
  {
    id: "1",
    artist: "Charli XCX",
    song: "Brat",
    image: "/public/brat.jpg",
  },
  {
    id: "2",
    artist: "Post Malone",
    song: "Beerbongs and Bentleys",
    image: "/public/post.jpg",
  },
  {
    id: "3",
    artist: "Sabrina Carpenter",
    song: "Short and Sweet",
    image: "/public/sabrina.jpg",
  },
  {
    id: "4",
    artist: "Metro Boomin",
    song: "Without Warning",
    image: "/public/metro.jpg",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f0e2d0] to-[#dbc1a6]">
      <Navigation />
      <main className="container mx-auto pt-24 page-transition">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-[#5a3d31]">
  <span className="font-bold text-[#ff5722]">H</span>ip 
  <span className="font-bold text-[#ff5722]"> I</span>nteractive 
  <span className="font-bold text-[#ff5722]"> P</span>hysical 
  <span className="font-bold text-[#ff5722]"> T</span>herapy
</h1>


        <div className="space-y-16">
          {/* Workout Selection */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-[#5a3d31] flex items-center justify-center gap-2">
              <span>Workout Selection</span> <span className="text-2xl text-[#5a3d31]"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {workoutImages.map((workout) => (
                <div
                  key={workout.id}
                  className="text-center bg-white p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
                >
                  <img
                    src={workout.image}
                    alt={workout.title}
                    className="w-full h-48 object-cover rounded-xl border border-gray-300"
                  />
                  <p className="mt-4 text-lg font-semibold text-gray-700">
                    {workout.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Exercise Selection */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-[#5a3d31] flex items-center justify-center gap-2">
              <span>Exercise Selection</span> <span className="text-2xl"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {exerciseImages.map((exercise) => (
                <div
                  key={exercise.id}
                  className="text-center bg-white p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
                >
                  <img
                    src={exercise.image}
                    alt={exercise.title}
                    className="w-full h-48 object-cover rounded-xl border border-gray-300"
                  />
                  <p className="mt-4 text-lg font-semibold text-gray-700">
                    {exercise.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Song Selection */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-[#5a3d31] flex items-center justify-center gap-2">
              <span>Song Selection</span> <span className="text-2xl"></span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {songSelection.map((song) => (
                <div
                  key={song.id}
                  className="text-center bg-white p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
                >
                  <img
                    src={song.image}
                    alt={`${song.artist} - ${song.song}`}
                    className="w-full h-36 object-cover rounded-lg mb-4"
                  />
                  <p className="font-bold text-lg text-gray-800">{song.artist}</p>
                  <p className="text-sm text-gray-600">{song.song}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
