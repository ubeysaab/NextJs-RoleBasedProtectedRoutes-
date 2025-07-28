import axios from "axios";
import { useAuthStore } from "./authStore";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

instance.interceptors.request.use((config) => {
    // const bears = useStore((state) =>  state.bears) this used inside Components

  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
