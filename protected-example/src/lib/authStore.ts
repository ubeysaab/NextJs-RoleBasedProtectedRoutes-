import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode';


type User = {
  id:string , 
  role:string
}

type AuthStore = {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  load: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,
  login: (token) => {
    const decoded = jwtDecode<User>(token);
    set({ token, user: decoded });
    localStorage.setItem("token", token);
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
  load: () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<User>(token);
      set({ token, user: decoded });
    }
  },
}));