import { Navigation } from "@/components/Navigation";

const workoutImages = [
  { id: "1", title: "Fat Burn", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1000" },
  { id: "2", title: "Lean and Sweaty", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000" },
  { id: "3", title: "Strength Surge", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000" },
  { id: "4", title: "Core Crusher", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000" },
  { id: "5", title: "HIIT It Hard", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000" },
  { id: "6", title: "Strength and Stability", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1000" },
];

const exerciseImages = [
  { id: "1", title: "Rear Lunges", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1000" },
  { id: "2", title: "Butt Kickers", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1000" },
  { id: "3", title: "Criss Cross", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1000" },
  { id: "4", title: "Mountain Climbers", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1000" },
  { id: "5", title: "Pendulum Crosses", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1000" },
  { id: "6", title: "Plank", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1000" },
];

const songSelection = [
  {
    id: "1",
    artist: "NF",
    song: "Lie",
    image: "/images/brat.jpg",
  },
  {
    id: "2",
    artist: "Artist",
    song: "Song",
    image: "/images/post.jpg",
  },
  {
    id: "3",
    artist: "Artist",
    song: "Song",
    image: "/images/sabrina.jpg",
  },
  {
    id: "4",
    artist: "Artist",
    song: "Song",
    image: "/images/metro.jpg",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto pt-24 page-transition">
        <h1 className="text-5xl font-bold text-center mb-12">
          Discover Your Fitness Journey
        </h1>
        <div className="space-y-16">
          {/* Workout Selection */}
          <section>
            <h2 className="text-3xl font-semibold text-center mb-8">Workout Selection →</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {workoutImages.map((workout) => (
                <div key={workout.id} className="text-center">
                  <img
                    src={workout.image}
                    alt={workout.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="mt-4 text-lg font-medium">{workout.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Exercise Selection */}
          <section>
            <h2 className="text-3xl font-semibold text-center mb-8">Exercise Selection →</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {exerciseImages.map((exercise) => (
                <div key={exercise.id} className="text-center">
                  <img
                    src={exercise.image}
                    alt={exercise.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="mt-4 text-lg font-medium">{exercise.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Song Selection */}
          <section>
            <h2 className="text-3xl font-semibold text-center mb-8">Song Selection →</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {songSelection.map((song) => (
                <div key={song.id} className="text-center p-4 border rounded-lg">
                  <img
                    src={song.image}
                    alt={`${song.artist} - ${song.song}`}
                    className="w-full h-36 object-cover rounded-lg mb-4"
                  />
                  <p className="font-semibold text-lg">{song.artist}</p>
                  <p className="text-sm">{song.song}</p>
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
