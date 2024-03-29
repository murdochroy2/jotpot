import React, { useContext, useEffect } from "react"
import NoteState from "../context/Notes/NoteState"
import noteContext from "../context/Notes/NoteContext"

const About = () => {
  const a = useContext(noteContext)
  useEffect(
    () => {
      // Not used anymore. Used earlier to update state in NoteState.js
      // a.update()
    },
    []
  )

  return (
    <div><h1>This is About {a.state.name} of class {a.state.class}</h1></div>
  )
}

export default About
