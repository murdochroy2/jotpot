import React, { useContext, useState } from 'react'
import noteContext from '../context/Notes/NoteContext'

const AddNote = () => {
    const { addNote } = useContext(noteContext)
    const [addedNote, setAddedNote] = useState({ title: "", description: "", tag: "general" })
    const handleAddNote = (e) => {
        e.preventDefault()
        addNote(addedNote.title, addedNote.description, addedNote.tag)
    }
    const onChange = (e) => {
        setAddedNote({ ...addedNote, [e.target.name]: e.target.value })
    }
    return (
        <div className="container">
            <h1>Add a Note    </h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="titleHelp" onChange={onChange} />
                    <div id="titleHelp" className="form-text">Give your note a title</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote