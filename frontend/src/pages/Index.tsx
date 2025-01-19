import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";

const workoutImages = [
  {
    id: "1",
    title: "Fat Burn",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000",
  },
  {
    id: "2",
    title: "Lean and Sweaty",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000",
  },
  {
    id: "3",
    title: "Strength Surge",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000",
  },
  {
    id: "4",
    title: "Core Crusher",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000",
  },
  {
    id: "5",
    title: "HIIT It Hard",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000",
  },
  {
    id: "6",
    title: "Strength and Stability",
    image:
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1000",
  },
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
    <div className="min-h-screen bg-gradient-to-r from-[#e0e6f8] to-[#cbd4f4]">
      <Navigation />

      {/* Hero Section */}
      <header className="relative bg-[#f5f7fb] py-20 shadow-md">
        <div className="container mx-auto flex flex-col lg:flex-row items-center text-center lg:text-left">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="public/hip2.jpg"
              alt="Hip Logo"
              className="rounded-lg shadow-lg max-w-full lg:max-w-lg"
            />
          </div>
          {/* Text Section */}
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0 lg:pl-12">
            <h1 className="text-5xl font-extrabold text-[#5e5b99] leading-tight mb-6">
              Say Hi to PT
            </h1>
            <p className="text-xl text-[#7b7ab8] leading-relaxed mb-8">
              Come try <strong>HIPT</strong>. A fusion of Just Dance and
              physical therapy, bringing energy and fun to your recovery
              journey.
            </p>
            <Link
              to="/pose-detector"
              className="bg-[#8d8bd3] text-white px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:bg-[#7c7ac1] transition-transform transform hover:scale-105 inline-block"
            >
              Try NOW
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto pt-12">
        {/* Title Section */}
        <h1 className="text-5xl font-extrabold text-center mb-12 text-[#5e5b99]">
          <span className="font-bold text-[#8d8bd3]">H</span>ip{" "}
          <span className="font-bold text-[#8d8bd3]">I</span>nteractive{" "}
          <span className="font-bold text-[#8d8bd3]">P</span>hysical{" "}
          <span className="font-bold text-[#8d8bd3]">T</span>herapy
        </h1>

        <div className="space-y-16">
          {/* Workout Selection */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-[#5e5b99]">
              Workout Selection
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
                    className="w-full h-48 object-cover rounded-xl border border-[#cbd4f4]"
                  />
                  <p className="mt-4 text-lg font-semibold text-[#5e5b99]">
                    {workout.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Exercise Selection */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-[#5e5b99]">
              Exercise Selection
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
                    className="w-full h-48 object-cover rounded-xl border border-[#cbd4f4]"
                  />
                  <p className="mt-4 text-lg font-semibold text-[#5e5b99]">
                    {exercise.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Song Selection */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-[#5e5b99]">
              Song Selection
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
                  <p className="font-bold text-lg text-[#5e5b99]">
                    {song.artist}
                  </p>
                  <p className="text-sm text-[#7b7ab8]">{song.song}</p>
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
