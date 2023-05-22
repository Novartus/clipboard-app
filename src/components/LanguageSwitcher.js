import React, { useState } from "react";
import "../css/LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div className="language-toggle">
      <label htmlFor="toggle-switch">Switch Language:</label>
      <div
        className={`toggle-switch ${checked ? "checked" : ""}`}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleToggle();
          }
        }}
        tabIndex={0}
        role="switch"
        aria-checked={checked}
        aria-labelledby="toggle-switch"
      ></div>
    </div>
  );
};

export default LanguageSwitcher;
