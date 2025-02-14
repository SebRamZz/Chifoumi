import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Card, { CardBody } from "./Card";

const MatchItem = ({ match }) => {
  const navigate = useNavigate();
  return (
    <Card className="shadow-md shadow:grey-200 border border-white p-3 rounded-xl text-xl">
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
              <strong>Player 2:</strong>{" "}
              {match.user2 ? match.user2.username : "Waiting for player"}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(`/matches/${match._id}`)}
          >
            View Match
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default MatchItem;
