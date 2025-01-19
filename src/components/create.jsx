import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./selnotes.module.css";
import { FaPlus } from "react-icons/fa";
import AppContext from "../context/context";

function CreateNote() {
  //Destucturing the context
  const { modal, SetModal, setNoteHeadings } = useContext(AppContext);

  //generate letters for the group
  function randomLetters(s) {
    if (!s) {
      return "NA"; //return NA the string is empty or undefined
    }

    const words = s.split(" "); //split the string into words

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase(); //return the first two letters of the word
    } else {

      //return the first letter of the first word and the second word
      const firstIndex = Math.floor(Math.random() * words.length);
      const secondIndex =
        (firstIndex + 1 + Math.floor(Math.random() * (words.length - 1))) %
        words.length;

      const firstLetter = words[firstIndex][0] || "";
      const secondLetter = words[secondIndex][0] || "";

      //return the first letter of the first word and the second word as capitalized
      return firstLetter.toUpperCase() + secondLetter.toUpperCase();
    }
  }

  // State to manage the group name
  const [grpName, setGrpName] = useState("");

  // State to manage the selected color
  const [selectedColor, setSelectedColor] = useState("");

  // State to manage the error
  const [error, setError] = useState(false);
  
  // Ref to manage the temporary color
  const tempColor = useRef();


// Array of colors for the group
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  
  // Function to add a note
  const addNote = () => {
    const letters = randomLetters(grpName); //generate the letters for the group
    if (grpName && selectedColor) {
      setNoteHeadings((prevNoteHeadings) => [ //add the group to the list of groups
        ...prevNoteHeadings, //spread the previous groups
        //new group
        {
          name: grpName,
          color: selectedColor,
          letters: letters,
          notes: [],
        },
      ]);
      SetModal();
      setGrpName(""); 
      setSelectedColor("");
      setError(false);
    } else {
      setError(true); //set error if the group name or color is empty
    }
  };

  // Function to handle the escape key
  useEffect(() => {
    if (modal) {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          setGrpName("");
          setSelectedColor("");
          setError(false);
          SetModal();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [modal, SetModal]);


// Function to handle the click outside the modal
  const handleClickOutside = (event) => {
    if (event.target.classList.contains(styles.modal)) {
      SetModal();
      setGrpName("");
      setSelectedColor("");
      setError(false);
    }
  };

  return (
    <>
      {/* Button to create a new group */}
      <button className={styles.button} onClick={SetModal}>
        {" "}
        <FaPlus size="1em" />
      </button>
      {/* Modal for creating a new group */}
      {modal && (
        <div className={styles.modal} onClick={handleClickOutside}>
          <div className={styles.modalContent}>
            <h3>Create New group</h3>
            <div>
              <label>Group Name</label>
              <input
                type="text"
                
                onChange={(e) => setGrpName(e.target.value)}
               
                placeholder="Enter your group name"
              />
            </div>
            <div className={styles.colorComp}>
              <label>Choose color</label>
              <div>
                {colors.map((color) => {
                  const colorId = color.replace("#", "");
                  return (
                    <div
                      id={`${colorId}`}
                      key={colorId}
                      onClick={() => {
                        setSelectedColor(color);
                        tempColor.current = color;
                      }}
                      className={`${styles.color}  ${
                        selectedColor && styles.selectedColor
                      } ${tempColor.current === color && styles.selected}`}
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div>
            <button onClick={addNote}>Create</button></div>
            {error && (
              <label id="error" className="hidden" style={{ marginTop: "-.5rem" }}>
                Please fill out the required fields
              </label>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CreateNote;