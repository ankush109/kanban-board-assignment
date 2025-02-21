"use client";
import { useTheme } from "./provider/ThemeProvider";
import Kanban from "./kanban";
import "./styles/toggle.css"
export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#13111C",
        width: "100vw",
        height: "100vh",
      }}
    >

       <Kanban/>
  
    </div>
  );
}
