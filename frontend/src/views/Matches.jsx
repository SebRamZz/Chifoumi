import React from "react";
import Button from "../components/Button";
import MatchItem from "../components/MatchItem";
import useMatches from "../hooks/useMatches";
import Card, { CardHeader, CardBody } from "../components/Card";

function Matches() {
    const { matches, loading, error, createMatch } = useMatches();

    return (
        <section className="flex items-center justify-center min-h-screen p-8">
            <Card className="container mx-auto p-6 shadow-lg bg-white dark:bg-gray-800">
                <CardHeader className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Matches</h1>
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
                        <p className="text-center text-gray-500 dark:text-gray-400">No matches available.</p>
                    )}
                </CardBody>
            </Card>
        </section>
    );
}

export default Matches;