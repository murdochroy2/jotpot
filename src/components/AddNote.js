import React, { useContext, useState } from 'react';
import noteContext from '../context/Notes/NoteContext';
import AuthContext from '../context/AuthContext';

const AddNote = (props) => {
    const { addNote } = useContext(noteContext);
    const { isGuest } = useContext(AuthContext);
    const initialNote = { title: "", description: "", tag: "" };
    const [addedNote, setAddedNote] = useState(initialNote);

    const handleAddNote = (e) => {
        e.preventDefault();
        if (isGuest()) {
            props.showAlert('warning', 'Please Sign In/Sign Up to create notes');
            return;
        }
        addNote(addedNote.title, addedNote.description, addedNote.tag);
        setAddedNote(initialNote);
        props.showAlert("success", "Note Added Successfully");
    };

    const onChange = (e) => {
        setAddedNote({ ...addedNote, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="titleHelp" onChange={onChange} minLength={5} required value={addedNote.title}/>
                    <div id="titleHelp" className="form-text">Give your note a title</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    {/* <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={addedNote.description}/> */}
                    <textarea className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={addedNote.description}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={addedNote.tag} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleAddNote} disabled={addedNote.title.length < 5 || addedNote.description.length < 5}>Submit</button>
            </form>
        </div>
    );
};

export default AddNote;