import React from "react";

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const baseClass = `btn btn-${variant} ${className}`;
  return (
    <button className={baseClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
