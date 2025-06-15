import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { Question, TestSession } from "./stuff";

export type OmittedQuestion = Omit<Question, "correctIndex">;

interface UseQuestionState {
  session: TestSession | null;
  setSession: (session: TestSession | null) => void;

  question: OmittedQuestion | null;
  setQuestion: (question: OmittedQuestion) => void;
  getQuestion: () => OmittedQuestion | null;
  reset: () => void;
}

// Custom encrypted storage implementation
const createEncryptedStorage = (baseStorage: Storage): StateStorage => {
  return {
    getItem: (name: string): string | null => {
      const encryptedValue = baseStorage.getItem(name);
      if (!encryptedValue) return null;

      try {
        // Decrypt the stored value
        const decryptedValue = atob(encryptedValue);
        return decryptedValue;
      } catch (error) {
        console.error("Failed to decrypt stored value:", error);
        return null;
      }
    },
    setItem: (name: string, value: string): void => {
      try {
        // Encrypt the value before storing
        const encryptedValue = btoa(value);
        baseStorage.setItem(name, encryptedValue);
      } catch (error) {
        console.error("Failed to encrypt value for storage:", error);
      }
    },
    removeItem: (name: string): void => {
      baseStorage.removeItem(name);
    },
  };
};

export const useQuestion = create<UseQuestionState>()(
  persist(
    (set, get) => ({
      session: null,
      setSession(session) {
        set({ session });
      },

      question: null,
      setQuestion(question) {
        set({ question });
      },

      getQuestion() {
        return get().question;
      },

      reset() {
        const currentSession = get().session;

        if (!currentSession) {
          return;
        }

        set((prev) => ({
          ...prev,
          session: {
            ...currentSession,
            currentSection: "brainrot",
            completed: false,
            questionIndex: 0,
            correctAnswers: 0,
            currentCorrectIndex: null,
            answers: [],
          },
        }));
      },
    }),
    {
      name: "iq-test",
      storage: createJSONStorage(() => createEncryptedStorage(sessionStorage)),
      partialize: (state) => ({
        session: state.session,
      }),
    },
  ),
);
