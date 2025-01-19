import React, { useEffect, useState } from "react";
import SelectNotes from "./components/selnotes";
import NotesSection from "./components/notes";
import "./App.css";
import Context from "./context/context";

function App() {
  // state to keep track of the modal state
  const [modal, setModal] = useState(false);
  // function to toggle the modal state visibility
  const SetModal = () => setModal((prev) => !prev);
  // state to keep track of the note headings
  const [noteHeadings, setNoteHeadings] = useState(
    localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : ""
  );

  // state to keep track of the hide state for both sidebar and notes
  const [hide, setHide] = useState(false);

  const [currentGroup, setCurrentGroup] = useState("");
  
  // manage mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Function to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth > 768) {
        setHide(false);
      }
    };

    // Function to handle escape key press
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setCurrentGroup(false);
      }
    };

    // Add event listeners for resize and keydown
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEscape);
    
    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        modal,
        SetModal,
        noteHeadings,
        setNoteHeadings,
        hide,
        setHide,
        isMobile,
        setIsMobile,
        currentGroup,
        setCurrentGroup,
      }}
    >
      <div className="App">
        <SelectNotes />
        <NotesSection />
      </div>
    </Context.Provider>
  );
}

export default App;