import "./css/App.css";
import SearchBar from "./components/SearchBar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import React, { useEffect, useState } from "react";
// const { clipboard } = require("electron");
const { ipcRenderer } = window.require("electron");

export default function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    ipcRenderer.on("electron-is-calling", (e, data) => {
      console.log("Received event from Electron:", data);
    });
    ipcRenderer.send("react-is-calling", "Hello from React!");
    return () => {
      ipcRenderer.removeAllListeners("electron-is-calling");
    };
  }, []);

  useEffect(() => {
    const testCards = [];

    for (let i = 1; i <= 5; i++) {
      const title = `${i} Testing`;
      const text = `${i} - Text testing in loop`;
      const timestamp = new Date().toLocaleString();

      testCards.push(
        <div className="card" key={i}>
          <div className="card-timestamp">{timestamp}</div>
          <h2 className="card-title" aria-label={title}>
            {title}
          </h2>
          <div className="card-content" aria-label={text}>
            {text}
          </div>
        </div>
      );
    }
    setCards(testCards);
  }, []);

  return (
    <div className="App">
      <h1 className="app-header">Clipper</h1>
      <LanguageSwitcher />
      <SearchBar />
      <div className="card-container" role="list">
        {cards.map((card, index) => (
          <div key={index} role="listitem">
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}
