import { useState } from "react"
import NoteContext from "./NoteContext"
const NoteState = (props) => {
  const defaultState = {
    name: "Rohi",
    class: 1
  }
  const initialNotes = [
    {
      "_id": "660034d258a478ce4e4caff5",
      "user": "65fe7ed934c5d2b37544b032",
      "name": "My first note",
      "description": "The description of my first note",
      "tag": "General",
      "date": "2024-03-24T14:12:34.760Z",
      "__v": 0
    },
    {
      "_id": "66003ca1196e2b4418fd9cc1",
      "user": "65fe7ed934c5d2b37544b032",
      "name": "My second note, modified",
      "description": "The description of my note",
      "tag": "Others",
      "date": "2024-03-24T14:45:53.830Z",
      "__v": 0
    },
    {
      "_id": "660034d258a478ce4e4caff5",
      "user": "65fe7ed934c5d2b37544b032",
      "name": "My first note",
      "description": "The description of my first note",
      "tag": "General",
      "date": "2024-03-24T14:12:34.760Z",
      "__v": 0
    },
    {
      "_id": "66003ca1196e2b4418fd9cc1",
      "user": "65fe7ed934c5d2b37544b032",
      "name": "My second note, modified",
      "description": "The description of my note",
      "tag": "Others",
      "date": "2024-03-24T14:45:53.830Z",
      "__v": 0
    },
    {
      "_id": "660034d258a478ce4e4caff5",
      "user": "65fe7ed934c5d2b37544b032",
      "name": "My first note",
      "description": "The description of my first note",
      "tag": "General",
      "date": "2024-03-24T14:12:34.760Z",
      "__v": 0
    },
    {
      "_id": "66003ca1196e2b4418fd9cc1",
      "user": "65fe7ed934c5d2b37544b032",
      "name": "My second note, modified",
      "description": "The description of my note",
      "tag": "Others",
      "date": "2024-03-24T14:45:53.830Z",
      "__v": 0
    }
  ]
  const [state, setState] = useState(defaultState)
  const [notes, setNotes] = useState(initialNotes)
  const update = () => {
    setTimeout(() => {
      setState({ name: "Modak", "class": 2 })
    }, 1000);
  }
  const addNote = (title, description, tag) => {
    const addedNote = {
      "_id": "66003ca1196e2b4418fd9cc1",
      "user": "65fe7ed934c5d2b37544b032",
      "name": title,
      "description": description,
      "tag": tag,
      "date": "2024-03-24T14:45:53.830Z",
      "__v": 0
    }
    setNotes(notes.concat(addedNote))
  }
  const deleteNote = () => {

  }
  const editNote = () => {

  }
  return (<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, state, update }}>
    {props.children}
  </NoteContext.Provider>)
}

export default NoteState