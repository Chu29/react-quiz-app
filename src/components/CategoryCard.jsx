import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../utils/constants";

export default function CategoryCard() {
  const navigate = useNavigate();
  const categories = CATEGORIES;
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {categories.map((category, index) => (
        <p
          key={index}
          onClick={() => navigate(`/quiz-page/${category.id}`)}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer text-center text-lg font-semibold text-gray-800 border border-gray-200"
        >
          {category.label}
        </p>
      ))}
    </div>
  );
}
