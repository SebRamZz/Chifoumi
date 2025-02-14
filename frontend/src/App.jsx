import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import Authentification from "./views/Authentification";
import Match from "./views/Match";
import Matches from "./views/Matches";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Authentification />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/matches/:id" element={<Match />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
