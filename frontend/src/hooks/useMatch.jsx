import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export default function useMatch(matchId) {
  const { token } = useAuth();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMatch = async () => {
    try {
      if (!matchId) return;
      setLoading(true);
      setError("");
      const response = await fetch(`http://localhost:3002/matches/${matchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setMatch(await response.json());
      } else {
        setError("Failed to fetch match");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const playTurn = async (turnId, move) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:3002/matches/${matchId}/turns/${turnId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ move }),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(
          err.match || err.turn || err.user || "Error playing move"
        );
      }
      await fetchMatch();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMatch();
  }, [matchId]);

  return { match, loading, error, fetchMatch, playTurn };
}
