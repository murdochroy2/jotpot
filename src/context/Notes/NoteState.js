import { useContext, useState } from "react"
import NoteContext from "./NoteContext"
import AuthContext from "../AuthContext"
const NoteState = (props) => {
  const host = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_HOST_PORT}`
  const defaultState = {
    name: "JotPot",
    class: "What class?"
  }
  const [state, setState] = useState(defaultState)
  const [notes, setNotes] = useState([])
  const { isGuest } = useContext(AuthContext)
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchall`
    const method = "GET"
    const token = isGuest() ? "guest" : localStorage.getItem("token")
    console.log("Inside getNotes ", token)
    const requestInit = {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      }
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
    const response = await fetch(url, requestInit)
    const json = await response.json()
    setNotes(json)
  }
  const update = () => {
    setTimeout(() => {
      setState({ name: "Modak", "class": 2 })
    }, 1000);
  }
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/add`
    const method = "POST"
    const requestInit = {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ name: title, description: description, tag: tag }) // body data type must match "Content-Type" header
    }
    const response = await fetch(url, requestInit)
    const json = await response.json()
    console.log("Note added")
    console.log(json)
    const addedNote = json
    setNotes(notes.concat(addedNote))
  }
  const deleteNote = async (id) => {
    const newNotes = notes.filter(note => note._id !== id)
    const url = `${host}/api/notes/delete/${id}`
    const method = "DELETE"
    const requestInit = {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    }
    const response = await fetch(url, requestInit)
    const json = await response.json()
    console.log("Note deleted", json)
    setNotes(newNotes)
  }
  const editNote = async (id, title, description, tag) => {
    const editedNotes = notes.map(
      note => {
        if (note._id === id) {
          note.name = title
          note.description = description
          note.tag = tag
        }
        return note
      }
    )
    const url = `${host}/api/notes/update/${id}`
    const method = "PUT"
    const data = { name: title, description: description, tag: tag }
    const requestInit = {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
    const response = await fetch(url, requestInit)
    const status = response.status
    status === 200 && setNotes(editedNotes)
  }

  // Example POST method implementation:
  const makeRequest = async (url = "", data = {}, method = "PUT") => {
    // Default options are marked with *
    const requestInit = {
      method: method, // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
    if (data !== {}) { requestInit.body = JSON.stringify(data) }
    const response = await fetch(url, requestInit)
    const json = await response.json()
    return json; // parses JSON response into native JavaScript objects
  }

  return (<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, state, update, getNotes }}>
    {props.children}
  </NoteContext.Provider>)
}

export default NoteState
