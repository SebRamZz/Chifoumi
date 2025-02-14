import React, { useEffect, useState } from "react";

export default function FlipCard({
  frontContent,
  backContent,
  autoFlip = false,
}) {
  const [isFlipped, setIsFlipped] = useState(autoFlip);

  useEffect(() => {
    setIsFlipped(autoFlip);
  }, [autoFlip]);

  return (
    <div
      className="flip-card"
      style={{
        perspective: "1000px",
        width: "150px",
        height: "150px",
      }}
    >
      <div
        className="flip-card-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="flip-card-front"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0",
          }}
        >
          {frontContent}
        </div>
        <div
          className="flip-card-back"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
            transform: "rotateY(180deg)",
          }}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
}
