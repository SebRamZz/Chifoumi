import React from "react";
import Button from "./Button";
import Card, { CardBody } from "./Card";

const MatchItem = ({ match }) => {
    return (
        <Card className="shadow-md">
            <CardBody>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-900 dark:text-white">
                            <strong>Match ID:</strong> {match._id}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Player 1:</strong> {match.user1.username}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Player 2:</strong> {match.user2 ? match.user2.username : "Waiting for player"}
                        </p>
                    </div>
                    <Button variant="outline" onClick={() => console.log(`View match ${match._id}`)}>
                        View Match
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default MatchItem;