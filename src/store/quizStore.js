import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getQuestionsByCategory } from "../services/questions.service";

export const initialState = {
  category: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  isLoading: false,
  timer: 10,
  error: null,
};

export const quizStore = create(
  persist(
    immer((set, get) => ({
      ...initialState,

      resetQuiz: () => {
        set((state) => Object.assign(state, initialState));
      },

      startQuiz: async (category) => {
        set((state) => {
          state.isLoading = true;
          state.category = category;

          state.answers = [];
          state.currentIndex = 0;
          state.timer = 10;
          state.error = null;
        });
        try {
          const data = await getQuestionsByCategory(category);

          const questions = data.map((item) => {
            return {
              id: item.id,
              question: item.question.text,
              options: [...item.incorrectAnswers, item.correctAnswer].sort(
                () => Math.random() - 0.5
              ),
              correctAnswer: item.correctAnswer,
            };
          });

          set((state) => {
            state.questions = questions;
            state.isLoading = false;

            state.currentIndex = 0;
            state.timer = 10;
          });
        } catch (error) {
          console.error("Error fetching questions:", error);
          set((state) => {
            state.isLoading = false;
            state.error = "Failed to load questions. Please try again.";
          });
        }
      },

      selectAnswer: (selected) => {
        set((state) => {
          const { questions, currentIndex, answers } = state;

          const updatedAnswers = [
            ...answers,
            {
              questionId: questions[currentIndex].id,
              answer: selected,
            },
          ];
          const nextIndex = currentIndex + 1;

          return {
            answers: updatedAnswers,
            currentIndex: nextIndex,
            timer: initialState.timer,
          };
        });
      },

      countDownTimer: () => {
        const { timer } = get();
        if (timer <= 0) {
          get().selectAnswer(null);
        } else {
          set((state) => {
            state.timer = timer - 1;
          });
        }
      },
    })),
    {
      name: "quiz-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useQuizStore = () => quizStore();
