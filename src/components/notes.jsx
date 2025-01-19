import React, { useContext, useState, useEffect, useCallback } from "react";
import styles from "./notes.module.css";
import AppContext from "../context/context";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiSolidSend } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { nanoid } from "nanoid";
import HomePage from "./home";

function Notes() {
  const {
    currentGroup,
    hide,
    setHide,
    isMobile,
    noteHeadings,
    setNoteHeadings,
  } = useContext(AppContext);
  const { name, color, letters } = currentGroup;

  // State to manage the note text input
  const [noteText, setNoteText] = useState("");

  // State to manage the notes of the current group
  const [notes, setNotes] = useState(currentGroup.notes);

  // To determine if the send button should be disabled
  const isDisabled = noteText ? false : true;

  // Function to add a new note
  const addNote = useCallback(() => {
    // Get the current date and time
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // Format the date to show
    const currentShowDate = currentDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    // Create a new note object
    const newNote = {
      time: currentTime,
      date: currentShowDate,
      note: noteText,
    };
    // Update the notes of the current group
    setNotes((prevNotes) => [...prevNotes, newNote]);

    // Update the notes of the note headings
    const updatedNoteHeadings = noteHeadings.map((noteHeading) =>
      noteHeading.name === name
        ? { ...noteHeading, notes: [...noteHeading.notes, newNote] }
        : noteHeading
    );
    // Update the notes in the context
    setNoteHeadings(updatedNoteHeadings);
    setNoteText("");
  }, [name, noteHeadings, noteText, setNoteHeadings]);


  // Update the notes when the current group changes
  useEffect(() => {
    setNotes(currentGroup.notes);
  }, [currentGroup.notes]);


  // Update the notes in the local storage when the note headings change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(noteHeadings));
  }, [noteHeadings]);


  // Handle the enter key press
  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key === "Enter") {
        if(noteText.trim()!==""){
          addNote();
        }
      }
    }
    window.addEventListener("keydown", handleKeyPress);

    // cleanup function to remove the event listener
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [addNote, noteText]);
  

  // If there is no current group and the screen is not mobile, show the home page
  if (!currentGroup && !isMobile) {
    return <HomePage />;
  }

  return (
    <div
      className={`${styles.container} ${!hide && isMobile && styles.hidden}`}
    >
      <div className={styles.header}>
        {isMobile && (
          <div onClick={() => setHide(isMobile && false)}>
            <IoMdArrowRoundBack size="1.25rem" />
          </div>
        )}
        <div>
          <div className={styles.icon} style={{ backgroundColor: color }}>
            {letters}
          </div>

          <div>{name}</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.notes}>
          {notes &&
            notes.map((note) => {
              return (
                <div className={styles.note} key={nanoid()}>
                  <div className={styles.noteContent}>{note.note}</div>
                  <p className={styles.dateTime}>{note.date} <GoDotFill size={10}/> {note.time}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.input}>
        <textarea
          cols="10"
          rows="10"
          placeholder="Enter your text here..........."
          value={noteText}
          onChange={(e) => {
              setNoteText(e.target.value);
          }}
        ></textarea>
        <div onClick={isDisabled ? null : addNote}>
          <BiSolidSend style={{ color: isDisabled ? "#ABABAB" : "#001F8B", cursor: isDisabled ? 'auto' : 'pointer'}}size="1.25rem" />
        </div>
      </div>
    </div>
  );
}

export default Notes;