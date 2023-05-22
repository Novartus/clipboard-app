import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import "../css/SearchBar.css";

export default function SearchBar() {
  const [sortClicked, setSortClicked] = useState("faSortAmountDown");

  const handleSortToggle = () => {
    if (sortClicked === "faSortAmountDown") {
      setSortClicked("faSortAmountUp");
    } else {
      setSortClicked("faSortAmountDown");
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for clips..."
          aria-label="Search for clips..."
        />
        <button type="button" aria-label="search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button
          className="sort-button"
          aria-label="sort"
          onClick={handleSortToggle}
        >
          <FontAwesomeIcon
            icon={
              sortClicked === "faSortAmountDown"
                ? faSortAmountDown
                : faSortAmountUp
            }
          />
        </button>
      </div>
    </div>
  );
}
