"use client";
import { useState } from "react";
import axios from "../../lib/axiosConfig";
import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
const styles :{[key:string]:React.CSSProperties} = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '10px',
  },
  input: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.3s',
  },
  inputFocus: {
    border: '1px solid #4a90e2',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    padding: '12px',
    backgroundColor: '#cccccc',
    color: '#666666',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'not-allowed',
  },
  error: {
    color: '#e74c3c',
    margin: '-10px 0 0 0',
    fontSize: '14px',
  }
};



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]= useState<{email:string,password:string}>({email:'',password:''})
  const login = useAuthStore((s) => s.login);

  const [isLoading,setIsLoading] = useState<boolean>(false)
  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Reset previous errors
  setError({email:'',password:''});

  // Manual validations
  let errors: { email?: string; password?: string } = {};

  // Email validation
  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  // Password validation
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  // If there are validation errors, set them and return
  if (Object.keys(errors).length > 0) {
    setError(errors as { email: string; password: string });
    
    return;
  }

  setIsLoading(true)
  try {

    const res = await axios.post("/auth/login", { email, password });
    console.log(res)
    login(res.data.token);
    router.push("/");
  } catch (err: any) {
    console.log(" from catch", err);
    
    // Handle server errors
    if (err.response && err.response.data && err.response.data.message) {
      setError({
        email: err.response.data.message,
        password: err.response.data.message
      });
    } else {
      setError({
        email: "An error occurred",
        password: "An error occurred"
      });
    }
  }finally{
    setIsLoading(false)
  }
};

return (
  <div style={styles.container}>
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.title}>Giriş Yap</h2>
      
      <input
        style={styles.input}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      {error.email && <p style={styles.error}> {error.email}</p>}
      
      <input
        style={styles.input}
        type="password"
        placeholder="Şifre"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error.password && <p style={styles.error}> {error.password}</p>}
      
      <button
        style={isLoading ? styles.buttonDisabled : styles.button}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Yükleniyor...' : 'Giriş Yap'}
      </button>
    </form>
  </div>
);



}
