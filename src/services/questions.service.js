import { api } from "./api";

export const getQuestionsByCategory = async (category, limit = 10) => {
  const res = await api.get("v2/questions", {
    searchParams: {
      categories: category,
      limit: limit,
    },
  });
  return res.json();
};
