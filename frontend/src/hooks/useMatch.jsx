import { useState, useEffect } from "react";
import useAuth from "./useAuth";

const API_URL = "https://chifoumi.kmarques.dev";

const useMatch = (matchId) => {
  const { token } = useAuth();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/matches/${matchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Error fetching match data");
      }
      const data = await response.json();
      setMatch(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatch();
    const interval = setInterval(() => {
      fetchMatch();
    }, 3000);
    return () => clearInterval(interval);
  }, [matchId, token]);

  const playTurn = async (turnId, move) => {
    try {
      const response = await fetch(`${API_URL}/matches/${matchId}/turns/${turnId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ move }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.match || errData.turn || "Error playing turn");
      }

      await fetchMatch();
    } catch (err) {
      setError(err.message);
    }
  };

  return { match, loading, error, playTurn };
};

export default useMatch;