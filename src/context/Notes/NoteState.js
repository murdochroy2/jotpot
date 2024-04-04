import { useState } from "react"
import NoteContext from "./NoteContext"
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const defaultState = {
    name: "Rohi",
    class: 1
  }
  // let initialNotes = [
  //   {
  //     "_id": "660034d258a478ce4e4caff5",
  //     "user": "65fe7ed934c5d2b37544b032",
  //     "name": "My first note",
  //     "description": "The description of my first note",
  //     "tag": "General",
  //     "date": "2024-03-24T14:12:34.760Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "66003ca1196e2b4418fd9cc1",
  //     "user": "65fe7ed934c5d2b37544b032",
  //     "name": "My second note, modified",
  //     "description": "The description of my note",
  //     "tag": "Others",
  //     "date": "2024-03-24T14:45:53.830Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "660034d258a478ce4e4caff5",
  //     "user": "65fe7ed934c5d2b37544b032",
  //     "name": "My first note",
  //     "description": "The description of my first note",
  //     "tag": "General",
  //     "date": "2024-03-24T14:12:34.760Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "66003ca1196e2b4418fd9cc1",
  //     "user": "65fe7ed934c5d2b37544b032",
  //     "name": "My second note, modified",
  //     "description": "The description of my note",
  //     "tag": "Others",
  //     "date": "2024-03-24T14:45:53.830Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "660034d258a478ce4e4caff5",
  //     "user": "65fe7ed934c5d2b37544b032",
  //     "name": "My first note",
  //     "description": "The description of my first note",
  //     "tag": "General",
  //     "date": "2024-03-24T14:12:34.760Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "66003ca1196e2b4418fd9cc1",
  //     "user": "65fe7ed934c5d2b37544b032",
  //     "name": "My second note, modified",
  //     "description": "The description of my note",
  //     "tag": "Others",
  //     "date": "2024-03-24T14:45:53.830Z",
  //     "__v": 0
  //   }
  // ]
  const [state, setState] = useState(defaultState)
  const [notes, setNotes] = useState([])
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchall`
    const method = "GET"
    const requestInit = {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmZTdlZDkzNGM1ZDJiMzc1NDRiMDMyIn0sImlhdCI6MTcxMTE5MDc2N30.kzkbMDOJbYmqVMGeIPgsGiYL9SUxHQu-zWTYDxHwK_s"
      },
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmZTdlZDkzNGM1ZDJiMzc1NDRiMDMyIn0sImlhdCI6MTcxMTE5MDc2N30.kzkbMDOJbYmqVMGeIPgsGiYL9SUxHQu-zWTYDxHwK_s"
      },
      body: JSON.stringify({ name: title, description: description, tag: tag}) // body data type must match "Content-Type" header
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmZTdlZDkzNGM1ZDJiMzc1NDRiMDMyIn0sImlhdCI6MTcxMTE5MDc2N30.kzkbMDOJbYmqVMGeIPgsGiYL9SUxHQu-zWTYDxHwK_s"
      },
    }
    const response = await fetch(url, requestInit)
    const json = await response.json()
    console.log("Note deleted", json)
    setNotes(newNotes)
  }
  const editNote = async (id, title, description, tag) => {
    notes.map(
      note => {
        if (note._id === id) {
          note.name = title
          note.description = description
          note.tag = tag
        }
        return note
      }
    )
    setNotes(notes)
    const url = `${host}/api/notes/update/${id}`
    await makeRequest(url, { name: title, description: description, tag: tag })
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmZTdlZDkzNGM1ZDJiMzc1NDRiMDMyIn0sImlhdCI6MTcxMTE5MDc2N30.kzkbMDOJbYmqVMGeIPgsGiYL9SUxHQu-zWTYDxHwK_s"
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