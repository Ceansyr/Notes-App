import React, { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./selnotes.module.css";
import AppContext from "../context/context";


function NoteHeading({ noteHeading }) {
  const { isMobile, setHide, setCurrentGroup } = useContext(AppContext);
  const { letters } = noteHeading;
 
  //function to handle the click on the group
  const handleClick = () => {
    setCurrentGroup(noteHeading); //set the current group to the selected group
    if (isMobile) {
      setHide(true); // hide the group list if on mobile
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.groupName} `}
      key={noteHeading?.name}
    >
      {/* Icon with background color and letters */}
      <div
        className={styles.icon}
        style={{ backgroundColor: noteHeading?.color }}
      >
        {noteHeading.name && letters}
      </div>
      
      {/* Note heading name */}
      <div>{noteHeading.name}</div>
    </div>
  );
}

// Prop types for the NoteHeading component
NoteHeading.propTypes = {
  noteHeading: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    letters: PropTypes.string.isRequired,
  }).isRequired,
};


export default NoteHeading;