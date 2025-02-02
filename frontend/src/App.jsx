import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authentification from "./views/Authentification";
import Matches from "./views/Matches";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Authentification />} />
          <Route path="/matches" element={<Matches />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
