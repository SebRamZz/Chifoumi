import { useState } from "react";
import useAuth from "./useAuth";

const useAuthForm = () => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError("Failed to authenticate. Please try again.");
    }
  };

  return {
    isRegister,
    setIsRegister,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};

export default useAuthForm;
