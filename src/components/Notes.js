import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/Notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const { notes, getNotes, editNote } = useContext(noteContext)
    const [editedNote, setEditedNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes()
        } else {
            navigate("/login")
        }
    }, []
    )
    const ref = useRef(null)
    const modalCloseRef = useRef(null)
    const handleEditModalChanges = (currentNote) => {
        ref.current.click()
        setEditedNote({ id: currentNote._id, etitle: currentNote.name, edescription: currentNote.description, etag: currentNote.tag })
    }
    const handleEditNote = (e) => {
        e.preventDefault()
        editNote(editedNote.id, editedNote.etitle, editedNote.edescription, editedNote.etag)
        modalCloseRef.current.click()
        props.showAlert("success", "Note Edited Successfully")
    }
    const onChange = (e) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit a Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={editedNote.etitle} aria-describedby="titleHelp" onChange={onChange} minLength={5} />
                                        <div id="titleHelp" className="form-text">Give your note a title</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={editedNote.edescription} onChange={onChange} minLength={5} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={editedNote.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={modalCloseRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" onClick={handleEditNote} disabled={editedNote.etitle.length < 5 || editedNote.edescription.length < 5}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <h1>Your Notes    </h1>
                <div className="row row-cols-auto">
                    {notes.length === 0 && <div className='mx-1'>No notes to display</div>}
                    {
                        notes.map(
                            (note, index) => {
                                return <NoteItem note={note} key={index} openEditModal={() => { handleEditModalChanges(note) } } showAlert={props.showAlert}></NoteItem>
                            }
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Notes