import create from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (token: string, userEmail: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,
      userEmail: null,
      login: (token: string, userEmail: string | null) =>
        set({ token, userEmail, isLoggedIn: true }),
      logout: () => set({ token: null, userEmail: null, isLoggedIn: false }),
    }),
    {
      name: "auth_store",
    }
  )
);
