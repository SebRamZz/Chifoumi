import { useState, useEffect } from "react";
import useAuth from "./useAuth";

const useMatches = () => {
    const { token } = useAuth();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchMatches = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://chifoumi.kmarques.dev/matches", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                setMatches(await response.json());
            } else {
                setError("Failed to fetch matches");
            }
        } catch {
            setError("An error occurred while fetching matches");
        } finally {
            setLoading(false);
        }
    };

    const createMatch = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("https://chifoumi.kmarques.dev/matches", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const newMatch = await response.json();
                setMatches((prevMatches) => [...prevMatches, newMatch]);
            } else if (response.status === 400) {
                setError("You already have a match in progress!");
            } else {
                setError("Failed to create a new match");
            }
        } catch {
            setError("An error occurred while creating a match");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    return { matches, loading, error, createMatch };
};

export default useMatches;