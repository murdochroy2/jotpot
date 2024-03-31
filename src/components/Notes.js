import React, { useContext } from 'react'
import noteContext from '../context/Notes/NoteContext'
import NoteItem from './NoteItem'

const Notes = () => {
    const { notes } = useContext(noteContext)
    return (
        <div className="container my-3">
            <h1>Your Notes    </h1>
            <div className="row">
            {
                notes.map(
                    (note, index) => {
                        return <NoteItem note={note} key={index}></NoteItem>
                    }
                )
            }
            </div>
        </div>
    )
}

export default Notes