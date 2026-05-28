import React from 'react'
import NoteListItem from './NoteListItem'

const NoteListPanel = ({ notes, selectedNote, search, onSearch, onNewNote, onSelectNote, activeTag }) => {
  const panelTitle = activeTag ? `# ${activeTag}` : 'All Notes'

  return (
    <div className="note-list-panel">
      <div className="note-list-header">
        <div className="note-list-title-row">
          <span className="note-list-panel-title">{panelTitle}</span>
          <span className="note-count-label">{notes.length}</span>
        </div>
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search notes..."
            value={search}
            onChange={e => onSearch(e.target.value)}
          />
        </div>
        <button className="btn-new-note" onClick={onNewNote}>
          + New Note
        </button>
      </div>

      <div
        className="note-list"
        onClick={e => { if (e.target === e.currentTarget) onSelectNote(null) }}
      >
        {notes.length === 0 ? (
          <div className="note-list-empty">
            {search ? 'No notes match your search.' : 'No notes yet.\nClick "+ New Note" to get started.'}
          </div>
        ) : (
          notes.map(note => (
            <NoteListItem
              key={note._id}
              note={note}
              selected={selectedNote && selectedNote !== 'new' && selectedNote._id === note._id}
              onClick={() => onSelectNote(note)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default NoteListPanel
