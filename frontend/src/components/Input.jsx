import React from "react";

const Input = ({ type = "text", placeholder = "", className = "", ...props }) => {
  const baseClass = `input input-bordered w-full ${className}`;
  return <input type={type} placeholder={placeholder} className={baseClass} {...props} />;
};

export default Input;
