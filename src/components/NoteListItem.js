import React from 'react'

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d)) return ''
  const now = new Date()
  const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const NoteListItem = ({ note, selected, onClick }) => {
  return (
    <div
      className={`note-list-item ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="note-item-title">{note.name}</div>
      <div className="note-item-preview">{note.description}</div>
      <div className="note-item-meta">
        {note.date && <span>{formatDate(note.date)}</span>}
        {note.tag && <span className="note-item-tag">{note.tag}</span>}
      </div>
    </div>
  )
}

export default NoteListItem
