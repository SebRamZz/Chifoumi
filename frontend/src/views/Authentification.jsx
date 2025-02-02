import React from "react";
import useAuthForm from "../hooks/useAuthForm";
import AuthForm from "../components/AuthForm";
import Card, { CardHeader, CardBody, CardFooter } from "../components/Card";

function Authentification() {
  const { isRegister, setIsRegister, email, setEmail, password, setPassword, error, handleSubmit, loading } =
    useAuthForm();

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-xl bg-white dark:bg-gray-800">
        <CardHeader className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isRegister ? "Create an account" : "Sign in to your account"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {isRegister ? "Join us today!" : "Enter your credentials to continue"}
          </p>
        </CardHeader>

        <CardBody>
          <AuthForm
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </CardBody>

        <CardFooter className="mt-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegister(false)}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don’t have an account yet?{" "}
                <button
                  onClick={() => setIsRegister(true)}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}

export default Authentification;
