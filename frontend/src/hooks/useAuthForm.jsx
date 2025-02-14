import { useState } from "react";
import useAuth from "./useAuth";

const useAuthForm = () => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await register(username, password);
      } else {
        await login(username, password);
      }
    } catch (err) {
      setError("Failed to authenticate. Please try again.");
    }
  };

  return {
    isRegister,
    setIsRegister,
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};

export default useAuthForm;
