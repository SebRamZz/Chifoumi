import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card, { CardBody, CardHeader } from "../components/Card";
import MatchItem from "../components/MatchItem";
import useAuth from "../hooks/useAuth";
import useMatches from "../hooks/useMatches";

function Matches() {
  const { matches, loading, error, createMatch } = useMatches();
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) {
    navigate("/");
    return null;
  }
  return (
    <section className="flex items-start justify-center min-h-screen p-8">
      <Card className="container mx-auto p-6 shadow-lg bg-white dark:bg-gray-700 border border-b-amber-50 rounded-2xl">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Matches
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            View ongoing games or create a new match
          </p>
        </CardHeader>

        <CardBody>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="flex justify-between items-center mb-6">
            <Button onClick={createMatch} variant="primary">
              Create New Match
            </Button>
          </div>

          {loading ? (
            <p>Loading matches...</p>
          ) : matches.length > 0 ? (
            <ul className="space-y-4">
              {matches.map((match) => (
                <MatchItem key={match._id} match={match} />
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No matches available.
            </p>
          )}
        </CardBody>
      </Card>
    </section>
  );
}

export default Matches;
