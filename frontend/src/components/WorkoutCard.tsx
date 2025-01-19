import { Link } from "react-router-dom";

interface WorkoutCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
}

export const WorkoutCard = ({
  id,
  title,
  description,
  duration,
  level,
  image,
}: WorkoutCardProps) => {
  return (
    <Link
      to={`/workout/${id}`}
      className="group bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Section */}
      <div className="aspect-video mb-4 overflow-hidden rounded-md border border-[#cbd4f4]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="space-y-2">
        {/* Duration and Level Tags */}
        <div className="flex gap-2">
          <span className="inline-flex items-center rounded-full bg-[#e0e6f8] px-2.5 py-0.5 text-xs font-medium text-[#5e5b99]">
            {duration}
          </span>
          <span className="inline-flex items-center rounded-full bg-[#e0e6f8] px-2.5 py-0.5 text-xs font-medium text-[#5e5b99]">
            {level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold tracking-tight text-[#5e5b99]">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#7b7ab8] line-clamp-2">{description}</p>
      </div>
    </Link>
  );
};
