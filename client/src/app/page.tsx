"use client";
import { useTheme } from "./provider/ThemeProvider";
import Kanban from "./kanban";
import "./styles/toggle.css";
import "./styles/kanban.css"; // Import the new CSS file

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={`home-container ${theme === "light" ? "light" : "dark"}`}>
      <Kanban />
    </div>
  );
}
