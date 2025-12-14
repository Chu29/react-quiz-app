import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../utils/constants";

const categoryIcons = {
  arts: "🎨",
  food_and_drink: "🍔",
  general_knowledge: "🧠",
  science: "🔬",
  history: "🏛️",
  society_and_culture: "👥",
  sport_and_leisure: "⚽",
  geography: "🌍",
  music: "🎵",
  movies: "🍿",
};

const gradientColors = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-red-500 to-rose-500",
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-amber-500",
  "from-cyan-500 to-blue-500",
  "from-teal-500 to-green-500",
];

export default function CategoryCard() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-4">
      {CATEGORIES.map((category, index) => {
        const gradient = gradientColors[index % gradientColors.length];
        const icon = categoryIcons[category.id] || "";
        console.log(category.id);

        return (
          <div
            key={category.id}
            onClick={() => navigate(`/quiz-page/${category.id}`)}
            className={`
              relative group cursor-pointer overflow-hidden rounded-2xl
              backdrop-blur-xl bg-white/10 dark:bg-black/20
              border border-white/20 dark:border-white/10
              shadow-xl hover:shadow-2xl
              transition-all duration-500 ease-out
              hover:scale-105 hover:bg-white/20 dark:hover:bg-black/40
              flex flex-col items-center justify-center
              p-10 text-center
            `}
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}
            />

            <div className="relative z-10">
              <span className="text-3xl mb-6 block drop-shadow-lg">{icon}</span>
              <h3 className="text-2xl md:text-[18px] font-bold text-white drop-shadow-md">
                {category.label}
              </h3>
            </div>

            <div className="absolute inset-0 translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:-translate-x-full transition-transform duration-1000 skew-x-12" />
          </div>
        );
      })}
    </div>
  );
}
