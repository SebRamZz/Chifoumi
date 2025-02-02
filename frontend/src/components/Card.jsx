import React from "react";

const Card = ({ children, className = "" }) => {
  const baseClass = `card bg-base-100 ${className}`;
  return <div className={baseClass}>{children}</div>;
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`card-header ${className}`}>{children}</div>
);

export const CardBody = ({ children, className = "" }) => (
  <div className={`card-body ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div className={`card-footer ${className}`}>{children}</div>
);

export default Card;
