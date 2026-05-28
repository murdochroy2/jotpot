import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/Notes/NoteContext'
import AuthContext from '../context/AuthContext'
import Sidebar from './Sidebar'
import NoteListPanel from './NoteListPanel'
import NoteEditor from './NoteEditor'

const HomeLayout = ({ showAlert }) => {
  const { notes, getNotes, addNote, editNote, deleteNote } = useContext(noteContext)
  const { setLoggedIn, isGuest } = useContext(AuthContext)
  const navigate = useNavigate()

  const [selectedNote, setSelectedNote] = useState(null)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      localStorage.setItem('token', 'guest')
      setLoggedIn('guest')
    }
    getNotes().catch(() => {})
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
    navigate('/login')
  }

  const handleSelectNote = (note) => {
    setSelectedNote(note)
  }

  const handleNewNote = () => {
    setSelectedNote('new')
  }

  const handleAdd = async (title, description, tag) => {
    await addNote(title, description, tag)
    setSelectedNote(null)
    showAlert('success', 'Note added')
  }

  const handleSave = async (id, title, description, tag) => {
    await editNote(id, title, description, tag)
    showAlert('success', 'Note updated')
  }

  const handleDelete = (id) => {
    deleteNote(id)
    setSelectedNote(null)
    showAlert('success', 'Note deleted')
  }

  const allTags = [...new Set(notes.filter(n => n.tag).map(n => n.tag))]

  const filteredNotes = notes.filter(note => {
    const matchesSearch = !search ||
      note.name.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase())
    const matchesTag = !activeTag || note.tag === activeTag
    return matchesSearch && matchesTag
  })

  return (
    <div className="notes-app">
      <Sidebar
        noteCount={notes.length}
        tags={allTags}
        activeTag={activeTag}
        onTagSelect={setActiveTag}
        isGuest={isGuest()}
        onLogout={handleLogout}
      />
      <NoteListPanel
        notes={filteredNotes}
        selectedNote={selectedNote}
        search={search}
        onSearch={setSearch}
        onNewNote={handleNewNote}
        onSelectNote={handleSelectNote}
        activeTag={activeTag}
      />
      <NoteEditor
        selectedNote={selectedNote}
        onSave={handleSave}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onCancel={() => setSelectedNote(null)}
        isGuest={isGuest()}
      />
    </div>
  )
}

export default HomeLayout
