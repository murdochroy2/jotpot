import React, { useContext } from 'react'
import noteContext from '../context/Notes/NoteContext'

const NoteItem = (props) => {
    const { note, openEditModal } = props
    const { deleteNote, editNote } = useContext(noteContext)
    const {showAlert} = props
    const handleDelete = () => {
        console.log(`Deleting Note with id: ${note._id}`)
        deleteNote(note._id)
        showAlert("success", "Note Deleted Successfully")
    }
    const handleEdit = () => {
        // editNote(note._id, "New Name", "New Description", "general")
        openEditModal()
    }
    return (
        <div className='col'>
            <div className="card my-3" style={{ "width": "18rem", "minHeight":"25vh"}}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.name}</h5>
                        <i className="fa-regular fa-trash-can mx-2" onClick={handleDelete}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={handleEdit}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>

    )
}

export default NoteItem