import { useContext, useState } from "react"
import NoteContext from "./NoteContext"
import AuthContext from "../AuthContext"
import sampleNotes from "../../sampleNotes"

const GUEST_NOTES_KEY = 'jotpot_guest_notes'

const loadGuestNotes = () => {
  try {
    const stored = localStorage.getItem(GUEST_NOTES_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return null
}

const saveGuestNotes = (notes) => {
  localStorage.setItem(GUEST_NOTES_KEY, JSON.stringify(notes))
}

const NoteState = (props) => {
  const port = process.env.REACT_APP_HOST_PORT
  const protocol = process.env.REACT_APP_HOST_PROTOCOL
  const host = `${protocol}://${process.env.REACT_APP_HOST}${port ? `:${port}` : ""}`
  const defaultState = {
    name: "JotPot",
    class: "What class?"
  }
  const [state, setState] = useState(defaultState)
  const [notes, setNotes] = useState([])
  const { isGuest } = useContext(AuthContext)

  const getNotes = async () => {
    if (isGuest()) {
      setNotes(loadGuestNotes() ?? sampleNotes)
      return
    }
    const url = `${host}/api/notes/fetchall`
    const requestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
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
    if (isGuest()) {
      const newNote = {
        _id: `guest-${Date.now()}`,
        name: title,
        description,
        tag: tag || 'General',
        date: new Date().toISOString()
      }
      const newNotes = notes.concat(newNote)
      setNotes(newNotes)
      saveGuestNotes(newNotes)
      return
    }
    const url = `${host}/api/notes/add`
    const requestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ name: title, description: description, tag: tag })
    }
    const response = await fetch(url, requestInit)
    const json = await response.json()
    setNotes(notes.concat(json))
  }

  const deleteNote = async (id) => {
    const newNotes = notes.filter(note => note._id !== id)
    if (isGuest()) {
      setNotes(newNotes)
      saveGuestNotes(newNotes)
      return
    }
    const requestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    }
    await fetch(`${host}/api/notes/delete/${id}`, requestInit)
    setNotes(newNotes)
  }

  const editNote = async (id, title, description, tag) => {
    const editedNotes = notes.map(note =>
      note._id === id ? { ...note, name: title, description, tag } : note
    )
    if (isGuest()) {
      setNotes(editedNotes)
      saveGuestNotes(editedNotes)
      return
    }
    const requestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ name: title, description, tag })
    }
    const response = await fetch(`${host}/api/notes/update/${id}`, requestInit)
    response.status === 200 && setNotes(editedNotes)
  }

  return (<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, state, update, getNotes }}>
    {props.children}
  </NoteContext.Provider>)
}

export default NoteState
