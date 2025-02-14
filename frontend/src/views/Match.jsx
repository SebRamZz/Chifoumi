import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Card, { CardBody, CardFooter, CardHeader } from "../components/Card";
import FlipCard from "../components/FlipCard" ;
import MoveButton from "../components/MoveButton";
import useAuth from "../hooks/useAuth";
import useMatch from "../hooks/useMatch";
import rockImg from "../assets/rock.png";
import paperImg from "../assets/paper.png";
import scissorsImg from "../assets/scissors.png";


function getCurrentTurnId(match) {
  const turns = match.turns || [];
  if (turns.length === 0) return 1;
  const lastTurn = turns[turns.length - 1];
  const isLastTurnComplete =
    lastTurn.user1 && lastTurn.user2 && lastTurn.winner;
  return isLastTurnComplete ? turns.length + 1 : turns.length;
}

const Match = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { match, loading, error, playTurn } = useMatch(id);

  if (!user) {
    navigate("/");
    return null;
  }

  if (loading) return <p className="text-center">Loading match...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!match) return null;

  const isUser1 = user?.username === match.user1?.username;
  const isUser2 = user?.username === match.user2?.username;
  const currentTurnId = getCurrentTurnId(match);

  const turns = match.turns || [];
  let canPlay = false;
  let playMessage = "Your Move:";

  if (turns.length === 0) {
    canPlay = true;
  } else {
    const lastTurn = turns[turns.length - 1];
    const isLastTurnComplete =
      lastTurn.user1 && lastTurn.user2 && lastTurn.winner;
    if (isLastTurnComplete) {
      canPlay = true;
    } else {
      if (isUser1 && !lastTurn.user1) {
        canPlay = true;
      } else if (isUser2 && !lastTurn.user2) {
        canPlay = true;
      } else {
        canPlay = false;
        playMessage = "Waiting for opponent...";
      }
    }
  }

  const turnComplete =
    turns.length > 0 &&
    turns[turns.length - 1].user1 &&
    turns[turns.length - 1].user2;

  const handlePlay = (move) => {
    if (!canPlay) return;
    playTurn(currentTurnId, move);
  };

  return (
    <section className="flex justify-center items-center w-full min-h-screen bg-base-200 p-4">
      <Card className="container mx-auto p-6 shadow-xl bg-white dark:bg-gray-700 border border-amber-50 rounded-2xl">
        <CardHeader className="bg-base-300 text-center">
          <h2 className="text-2xl font-bold">Match</h2>
        </CardHeader>

        <CardBody>
          <div className="flex flex-col items-start">
            <p>
              <strong>Match ID:</strong> {match._id}
            </p>
            <p>
              <strong>Player 1:</strong> {match.user1?.username}{" "}
              {isUser1 && "(You)"}
            </p>
            <p>
              <strong>Player 2:</strong> {match.user2?.username || "Waiting"}{" "}
              {isUser2 && "(You)"}
            </p>
          </div>
          <hr className="my-4" />

          {turns.length > 0 && (
            <div className="flex items-center justify-evenly my-6">
              <div className="text-center">
                <p className="mb-2 font-semibold">{match.user1?.username}</p>
                <FlipCard
                  autoFlip={turnComplete}
                  frontContent={<span className="text-4xl text-black">?</span>}
                  backContent={
                    <img
                        src={paperImg}
                        alt={turns[turns.length - 1].user1}
                        className="w-24 h-24 object-contain"
                    />

                  }
                />
              </div>
              <p className="text-xl font-bold">VS</p>
              <div className="text-center">
              <p className="mb-2 font-semibold">{match.user2?.username}</p>
                <FlipCard
                  autoFlip={turnComplete}
                  frontContent={<span className="text-4xl text-black">?</span>}
                  backContent={
                    <img
                        src={`/assets/${turns[turns.length - 1].user2}.png`}
                        alt={turns[turns.length - 1].user2}
                        className="w-24 h-24 object-contain"
                    />
                  }
                />
              </div>
            </div>
          )}

          {match.user1 && match.user2 && turns.length < 3 && (
            <>
              <h3 className="text-lg font-bold mt-6">
                {playMessage} (Turn {currentTurnId})
              </h3>
              <div className="flex space-x-2 mt-2">
                <MoveButton
                  move="rock"
                  onSelect={handlePlay}
                  disabled={!canPlay}
                  className="w-24 h-24"
                />
                <MoveButton
                  move="paper"
                  onSelect={handlePlay}
                  disabled={!canPlay}
                  className="w-24 h-24"
                />
                <MoveButton
                  move="scissors"
                  onSelect={handlePlay}
                  disabled={!canPlay}
                  className="w-24 h-24"
                />
              </div>
            </>
          )}

          {match.user1 && match.user2 && turns.length === 3 && match.winner && (
            <div className="mt-6 p-4 bg-black rounded text-center">
              <h3 className="text-2xl font-bold">
                Winner: {match.winner.username}
              </h3>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-bold">Turns History</h3>
            {turns && turns.length > 0 ? (
              turns.map((turn, idx) => (
                <div key={idx} className="border-b py-2">
                  <p>
                    <strong>Turn {idx + 1}:</strong> {turn.user1} vs{" "}
                    {turn.user2} | Winner: {turn.winner || "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p>No turns yet.</p>
            )}
          </div>
        </CardBody>

        <CardFooter className="flex justify-end">
          <Button variant="secondary" onClick={() => navigate("/matches")}>
            Back to Matches
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Match;
