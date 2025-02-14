import React from "react";
import paperImg from "../assets/paper.png";
import rockImg from "../assets/rock.png";
import scissorsImg from "../assets/scissors.png";
import Button from "./Button";

const images = {
  rock: rockImg,
  paper: paperImg,
  scissors: scissorsImg,
};

export default function MoveButton({ move, onSelect, disabled }) {
  return (
    <Button
      variant="primary"
      className="flex flex-col items-center justify-center m-2"
      onClick={() => onSelect(move)}
      disabled={disabled}
    >
      <img src={images[move]} alt={move} style={{ width: 32, height: 32 }} />
      <span style={{ marginTop: 4 }}>{move}</span>
    </Button>
  );
}
