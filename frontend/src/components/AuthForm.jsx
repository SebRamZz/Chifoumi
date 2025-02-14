import React from "react";
import Button from "./Button";
import Input from "./Input";

const AuthForm = ({
  isRegister,
  username,
  setUsername,
  password,
  setPassword,
  error,
  handleSubmit,
  loading,
}) => {
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="relative">
        <label htmlFor="password" className="text-sm">
          Username
        </label>
        <Input
          type="text"
          id="username"
          placeholder="username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="p-2 border rounded-md"
        />
      </div>

      <div className="relative">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <Input
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded-md"
        />
      </div>

      <Button
        type="submit"
        className="w-full flex justify-center items-center"
        variant="primary"
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V1l3 3-3 3V4a6 6 0 00-6 6H4z"
            ></path>
          </svg>
        ) : isRegister ? (
          "Sign up"
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
};

export default AuthForm;
