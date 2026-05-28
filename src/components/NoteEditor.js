import React, { useState, useEffect } from 'react'

const NoteEditor = ({ selectedNote, onSave, onAdd, onDelete, onCancel, isGuest }) => {
  const [form, setForm] = useState({ title: '', description: '', tag: '' })

  useEffect(() => {
    if (selectedNote === 'new') {
      setForm({ title: '', description: '', tag: '' })
    } else if (selectedNote) {
      setForm({
        title: selectedNote.name,
        description: selectedNote.description,
        tag: selectedNote.tag || '',
      })
    }
  }, [selectedNote])

  const onChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const isNew = selectedNote === 'new'
  const isValid = form.title.trim().length >= 5 && form.description.trim().length >= 5

  const handleSubmit = () => {
    if (isNew) {
      onAdd(form.title, form.description, form.tag)
    } else {
      onSave(selectedNote._id, form.title, form.description, form.tag)
    }
  }

  if (!selectedNote) {
    return (
      <div className="editor-panel">
        <div className="editor-empty">
          <div className="editor-empty-icon">✍</div>
          <div className="editor-empty-text">No note selected</div>
          <div className="editor-empty-subtext">Select a note from the list or create a new one</div>
        </div>
      </div>
    )
  }

  return (
    <div className="editor-panel">
      <div className="editor-content">
        <div className="editor-scrollable">
          <input
            className="editor-title-input"
            placeholder="Note title"
            value={form.title}
            onChange={e => onChange('title', e.target.value)}
          />
          <div className="editor-meta-row">
            <span className="editor-meta-label">🏷 Tag</span>
            <input
              className="editor-tag-input"
              placeholder="Add a tag..."
              value={form.tag}
              onChange={e => onChange('tag', e.target.value)}
            />
          </div>
          <textarea
            className="editor-body"
            placeholder="Start writing..."
            value={form.description}
            onChange={e => onChange('description', e.target.value)}
          />
        </div>

        <div className="editor-footer">
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!isValid}
          >
            {isNew ? 'Save Note' : 'Save Changes'}
          </button>
          {isNew && (
            <button className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
          {!isNew && (
            <button className="btn-delete-note" onClick={() => onDelete(selectedNote._id)}>
              Delete Note
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoteEditor
